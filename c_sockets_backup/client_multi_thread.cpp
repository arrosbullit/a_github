/*!
	@file		client_multi_thread.cpp

	@brief		This program is used to test the multi_thread_http_server.
				This program creates N threads. Every thread requests files
				from a server an debug prints the progress it makes.

	@note		

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
#include <pthread.h>        // P-thread implementation        
#include <unistd.h> 		// robert: read()

#define SERVER_ADDRESS 			"127.0.0.1"
#define SERVER_PORT				9981


#define HTTP_GET_REQUEST   \
"GET /file.m3u8 HTTP/1.1\n\
Connection: keep-alive\n\n"

/*
	Some documentation
	
	In AF_INET family, Internet,
	I have to use sockaddr_in when the 
	function prototypes require sockaddr
	
	struct sockaddr_in { 
		uint8_t sin_len; 
		sa_family_t sin_family; 
		in_port_t sin_port; 
		struct in_addr sin_addr; 
		char sin_zero[8]; 
	};
	
	where:
	
	typedef uint32_t in_addr_t;
	
	struct in_addr{
		in_addr_t s_addr;
	};
	
*/

const int NUM_THREADS = 20;
static unsigned char finishedThreadFlag[NUM_THREADS];
static int threadIds[NUM_THREADS];

static void*  client_thread_function(void*);

int main()
{
	int ret;
	pthread_t myThread;
	
	for(int i = 0; i < NUM_THREADS; i++){
		finishedThreadFlag[i] = 0;
	}
	
	for(int i = 0; i < NUM_THREADS; i++){
		threadIds[i] = i;
		ret = pthread_create(
			&myThread,
			NULL,
			client_thread_function,
			&(threadIds[i]));
		//Free thread resources without need of join
		pthread_detach(myThread);
		if(ret){
			printf("Error by pthread\n");
		}
	}
	
	//Sleep until all threads are done
	while(1){
		sleep(1);
		int i = 0;
		for(i = 0; i < NUM_THREADS; i++){
			if(finishedThreadFlag[i] == 0){
				break;
			}
		}
		if(i == NUM_THREADS){
			break;
		}
	}
	printf("Finished\n");
	return 0;
}



void* client_thread_function(void* param)
{
	int mySocket;
	int ret;
	struct sockaddr_in myAddr;
	int i;
	int *id = (int *) param;
	
	//Do plenty of requests
	for(i = 0; i < 200; i++){
		
		//Create the struct that holds the server address
		memset(&myAddr, 0, sizeof(myAddr));
		//AF_INET means Internet protocol
		myAddr.sin_family = AF_INET;
		//Fill the address part using from array to network format function
		ret = inet_aton(SERVER_ADDRESS, &(myAddr.sin_addr));
		if(ret == 0){
			printf("Error by inet_aton()\n");
		}
		//Fill the  port part using the host to network format function
		myAddr.sin_port = htons(SERVER_PORT);
		
		mySocket = socket(AF_INET, SOCK_STREAM, 0);
	
		ret = connect(mySocket, (const sockaddr *)&myAddr, sizeof(myAddr));
		if(ret){
			printf("Error by connect()");
		}
	
		write(mySocket, HTTP_GET_REQUEST, strlen(HTTP_GET_REQUEST));
	
		//Read only one HTTP response which must contain the 
		//content-length header and then close the connection.
		//After the HTTP headers (whose end is marked by two
		//carry returns), it reads content-length bytes 
		//and then it closes the connection.
		unsigned char aByte;
		ret = 1;
		char str[] = "CONTENT-LENGTH:";
		int contentLength = 0;
		int idx = 0;
		char numberStr[100];

		//kind of enum
		int	match_str 							= 0; 
		int	store_number						= 1;
		int	read_up_to_two_carry_returns		= 2;
		int	read_content_length					= 3;
	
		int status = match_str;

		while(ret > 0){
			ret = read(mySocket, &aByte, 1);
		
			if(status == match_str){
				aByte = toupper(aByte);
				if(aByte == str[idx]){
					idx++;
					if(idx == strlen(str)){
						status = store_number;
						idx = 0;
						continue;
					}
				} else {
					idx = 0;
				}
			}
			else if(status == store_number){
				if(aByte == '\n'){
					numberStr[idx] = 0;
					status = read_up_to_two_carry_returns;
					contentLength = atoi(numberStr);
					idx = 0;
					continue;
				}
				numberStr[idx] = aByte;
				idx++;
			}
			else if(status == read_up_to_two_carry_returns){
				if(aByte == '\n'){
					idx++;
				}else{
					idx = 0;
				}
				if(idx == 2){
					status = read_content_length;
					idx = 0;
					continue;
				}
			
			}
			else if(status == read_content_length){
				idx++;
				if(idx == contentLength){
					//printf("%d Client\n", *id);
					//I am done!!
					break;
				}
			}
		}
	
		close(mySocket);
		
		if(i % 50 == 0){
			printf("%d client is working\n", *id);
		}
	}
	printf("%d client completed %d requests\n", *id, i);
	finishedThreadFlag[*id] = 1;
	return NULL;
}
