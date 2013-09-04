/*!
	@file		multi_threaded_http_server.h

	@brief		Server used to serve Apple video streaming. This server
				servers M3U8 files and TS segments.
				The files are located in the WEB_ROOT_DIR directory.
				To test using a browser serve a jpeg file.
				TODO: a stop function to stop serving files. This involves
				using not blocking sockets, select() etc

	@note		Based on server found in Internet with name BK Turley 2011.

	@author		Robert Lluís 2013
*/
#ifndef __MULTI_THREAD_HTTP_SERVER_H__
#define __MULTI_THREAD_HTTP_SERVER_H__

int  startServerInItsOwnThread();

#endif
