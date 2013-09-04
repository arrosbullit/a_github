/*!
	@file		multi_threaded_http_server.cpp

	@brief		Server used to serve Apple video streaming. This server
				servers M3U8 files and TS segments.
				The files are located in the WEB_ROOT_DIR directory.
				To test using a browser serve a jpeg file.
				TODO: a stop function to stop serving files. This involves
				using not blocking sockets, select() etc

	@note		Based on server found in Internet with name BK Turley 2011.

	@author		Robert Lluís 2013
*/

#include <stdio.h>          // for printf()
#include <stdlib.h>         // for exit()
#include <string.h>         // for strcpy(),strerror() and strlen()
#include <fcntl.h>          // for file i/o constants
#include <sys/stat.h>       // for file i/o constants
#include <errno.h>
#include <ctype.h>
 
// FOR BSD UNIX/LINUX 
#include <sys/types.h>      //  
#include <netinet/in.h>     //  
#include <sys/socket.h>     // for socket system calls 
#include <arpa/inet.h>      // for socket system calls (bind)
#include <sched.h>  
#include <pthread.h>        // P-thread implementation        
#include <signal.h>         // for signal                     
#include <semaphore.h>      // for p-thread semaphores        
#include <unistd.h> 		// robert: read()

#include "m3u8_lock.h"		//g_m3u8_lock

#include "multi_thread_http_server.h"

 
// HTTP response messages 

#define HEADER_ERROR_404   "HTTP/1.0 404 Not Found\nContent-Type:text/html\n\n"
#define MESSAGE_ERROR_404    "<html><body><h1>FILE NOT FOUND</h1></body></html>"
 
#define PORT_NUM            	9981     
#define PEND_CONNECTIONS     	100     //for the accept() function
 
#define CHUNK_SIZE_IN_BYTES 	1024
#define WEB_ROOT_DIR			"web"

static void *talk_to_client_thread_function(void *);
static void *accept_client_thread_function(void *);

static int 			debugCounter = 0;
static pthread_t	serverThread;
static bool			stopServerThreadFlag = false;	


#ifdef ROBERT_UNIT_TEST

int main()
{
	int ret;
	ret = startServerInItsOwnThread();
	if(ret != 0){
		printf("Error starting server\n");
		return -1;
	}
	while(1){
		sleep(1000);
	}
	return 0;
}

#endif

//returns 0 on success
int startServerInItsOwnThread()
{
	int ret;
	
	ret = init_m3u8_lock();
	
	if(ret){
		printf("Error by init_m3u8_lock()");
	}
	
	ret = pthread_create (                 
		&serverThread,                  
		NULL,                   
		accept_client_thread_function,                          
		NULL);                      
	return ret;
}

//TODO: this function does not work because I use
//blocking sockets an the accept function blocks forever.
void stopServerThread()
{
	stopServerThreadFlag = true;
	pthread_join(serverThread, NULL);
	//TODO:  Fer un join a la resta de threads
	//que hi pot haver corrent
}
 
void* accept_client_thread_function(void*)
{
	int 					server_s;               
	int           			client_s;           
	struct sockaddr_in   	server_addr;            // Server Internet address
	struct sockaddr_in    	client_addr;            // Client Internet address
	struct in_addr       	client_ip_addr;         // Client IP address
	socklen_t				addr_len;

	server_s = socket(AF_INET, SOCK_STREAM, 0);

	server_addr.sin_family = AF_INET;
	server_addr.sin_port = htons(PORT_NUM);
	server_addr.sin_addr.s_addr = htonl(INADDR_ANY);

	bind(server_s, (struct sockaddr *)&server_addr, sizeof(server_addr));

	listen(server_s, PEND_CONNECTIONS);

	while(stopServerThreadFlag == false)
	{
		printf("Listening at port %d\n", PORT_NUM); 

		// wait for the next client to arrive 
		addr_len = sizeof(client_addr);
		
		client_s = accept(server_s, (struct sockaddr *)&client_addr, &addr_len);

		printf("New client\n"); 

		if (client_s == -1){
			printf("ERROR - Unable to create socket \n");
		}
		else{
			// Create a child thread 
			pthread_create (                
				&serverThread,                  
				NULL,                   
				talk_to_client_thread_function,               
				(void *) client_s);    
			//This will free thread resources when it finishes
			pthread_detach(serverThread);               

		}
	}

	close (server_s);  // close the primary socket
	return (0);        // return code from "main"
}

//gets pointer to first char of the extension of a filename
static char *getPointerToExtension(char *filename)
{

	if(filename == NULL){
		return NULL;
	}
	
	char *extensionPtr = NULL;
	
	//Find last point position
	int lastCharIdx;
	lastCharIdx = strlen(filename);
	lastCharIdx = lastCharIdx - 1;
	
	if(lastCharIdx < 0){
		extensionPtr = NULL;
	}
	else{
		int i = lastCharIdx;
		bool pointFound = false;
		while(i >= 0){
			if(filename[i] == '.'){
				pointFound = true;
				break;
			}
			i--;
		}
		if(pointFound){
			if(i != lastCharIdx){
				extensionPtr = &(filename[i + 1]);
			}
		}
	}
	
	return extensionPtr;

}

//converts string to upper case
static void toUpperString(char *str)
{
	if(str == NULL){
		return;
	}
	int i = 0;
	while(str[i]){
		str[i] = toupper(str[i]);
		i++;
	}
}

void *talk_to_client_thread_function(void * arg)
{
    char mesg[CHUNK_SIZE_IN_BYTES]; 
    char *reqline[3];
    char data_to_send[CHUNK_SIZE_IN_BYTES];
    char path[100];
    int rcvd, bytesFromFile;
	bool keepAlive = true;
	bool m3u8File;
	bool m3u8FileLocked = false;
	
	int client = (int) arg;
	
	debugCounter++;

	//if(1){
	while(keepAlive){
	
		memset( (void*)mesg, 0, CHUNK_SIZE_IN_BYTES );

		//If a message is to long to fit, excess bytes may be discarded
		rcvd = recv(client, mesg, CHUNK_SIZE_IN_BYTES, 0);
		
		if (rcvd < 0){    // receive error 
			fprintf(stderr,("recv() error\n"));
			break;
		}
		else if (rcvd == 0){    // receive socket closed
			fprintf(stderr,"%d Client disconnected upexpectedly.\n",
				debugCounter);
			break;
		}
		
		// message received
		printf("%s", mesg);
		
		//I do these searches before tokenixing with strtok
		//because strtok modifies the input string
		//Search for keep-alive
		keepAlive = false;	
		//Suppor any case Keep-Alive VS keep-alive eep- 
		//ho tenen igual :D
		if(strstr(mesg, "eep-")){
			keepAlive = true;
			printf("%d Poso keep-alive a true\n", debugCounter);
		}
		//Busca si es un m3u8
		m3u8File = false;
		if(strstr(mesg, "m3u8")){
			m3u8File = true;
			printf("%d Serve an m3u8 file\n", debugCounter);
		}
		
		
		//Primera linea
		//GET /hola.txt HTTP/1.1
		//reqline[0] sera GET
		//reqline[1] sera /hola.txt
		//reqline[2] sera HTTP/1.1

		reqline[0] = strtok (mesg, " \t\n");
		reqline[1] = strtok (NULL, " \t");
		reqline[2] = strtok (NULL, " \t\n");
		
		if(strcmp(reqline[0], "GET") != 0){
			printf("Error: missing GET\n");
			write(client, HEADER_ERROR_404, strlen(HEADER_ERROR_404));
			write(client, MESSAGE_ERROR_404, strlen(MESSAGE_ERROR_404));
			break;
		}

		if ( strncmp( reqline[2], "HTTP/1.0", 8) !=0 && 
			 strncmp( reqline[2], "HTTP/1.1", 8)  !=0 ){
			printf("Error: HTTP version not supported\n");
			write(client, HEADER_ERROR_404, strlen(HEADER_ERROR_404));
			write(client, MESSAGE_ERROR_404, strlen(MESSAGE_ERROR_404));
			break;
		}

		if ( strncmp(reqline[1], "/", 2)==0 ){
			write(client, HEADER_ERROR_404, strlen(HEADER_ERROR_404));
			write(client, MESSAGE_ERROR_404, strlen(MESSAGE_ERROR_404));
			printf("%d Error: missing filename\n", debugCounter);
			break;
		}

		strcpy(path, WEB_ROOT_DIR);
		strcpy(&path[strlen(WEB_ROOT_DIR)], reqline[1]);
		printf("%d file: %s\n", debugCounter, path);
		
		FILE *file2;
		
		if(m3u8File){
			pthread_rwlock_rdlock(get_m3u8_lock());
			m3u8FileLocked = true;
		}
		
		file2 = fopen(path, "rb");
		
		if( file2 == NULL){    
			write(client, HEADER_ERROR_404, strlen(HEADER_ERROR_404));
			write(client, MESSAGE_ERROR_404, strlen(MESSAGE_ERROR_404));
			printf("%d Error: cannot open requested file\n", debugCounter);
			if(m3u8File){
				pthread_rwlock_unlock(get_m3u8_lock());
				m3u8FileLocked = false;
			}
			break;
		}

		printf("%d fopen(%s) ok\n", debugCounter, path);
		//Get file size
		int fileSize; 
		fseek(file2, 0, SEEK_END);
		fileSize = ftell(file2);
		fseek(file2, 0,  SEEK_SET);
		//Fes content length header
		char aux[128];
		printf("%d Send HTTP header\n", debugCounter);
		send(client, "HTTP/1.0 200 OK\n", 16, 0);
		sprintf(aux, "Content-Length: %d\n", fileSize);
		printf("%d Send content length %d\n", debugCounter, fileSize);
		send(client, aux, strlen(aux), 0);
		
		printf("%d reqline[1] %s\n", debugCounter, reqline[1]);
		char *pointerToExtension = getPointerToExtension(reqline[1]);
		
		if(pointerToExtension){
			toUpperString(pointerToExtension);
			
			if(strcmp(pointerToExtension, "M3U8") == 0){
				printf("%d Send M3U8\n", debugCounter);
				send(client, 
				"Content-Type: application/vnd.apple.mpegurl\n", 
				44, 0);
			}
			else if(strcmp(pointerToExtension, "TS") == 0){
				printf("%d Send video TS\n", debugCounter);
				send(client, "Content-Type: video/mpeg\n", 25, 0);
			}
			else if(strcmp(pointerToExtension, "JPG") == 0 ||
					strcmp(pointerToExtension, "JPEG") == 0){
				printf("%d Send image\n", debugCounter);
				send(client, "Content-Type: image/jpeg\n", 25, 0);
			}
			else{
				printf("%d Send binary\n", debugCounter);
				send(client, "Content-Type: appliation/octet-stream\n", 38, 0);
			}
		} else {
			printf("%d Send binary\n", debugCounter);
			send(client, "Content-Type: appliation/octet-stream\n", 38, 0);
		}
		send(client, "\n", 1, 0); //this separates header and data
		int bytesSent = 0;
		bytesFromFile = fread(data_to_send, 1, CHUNK_SIZE_IN_BYTES, file2);
		while(bytesFromFile){
			bytesSent = write(client, data_to_send, bytesFromFile);
			if(bytesSent != bytesFromFile){
				printf("Stop sending data\n");
				perror("bytesSent != bytesFromFile");
				break;
			}
			bytesFromFile = fread(data_to_send, 1, CHUNK_SIZE_IN_BYTES, file2);
		}
		fclose(file2);
		if(m3u8File){
			pthread_rwlock_unlock(get_m3u8_lock());
			m3u8FileLocked = false;
		}
		printf("%d Finished sending data\n", debugCounter);
	}//while
	if(m3u8File && m3u8FileLocked){
		pthread_rwlock_unlock(get_m3u8_lock());
	}
	printf("%d Closing socket\n\n", debugCounter);
	//shutdown (client, SHUT_RDWR);         
	close(client);
	pthread_exit(NULL);
}

