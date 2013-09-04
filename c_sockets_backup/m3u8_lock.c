/*!
	@file		m3u8_lock.h

	@brief		This file initializes the pthread_rwlock_t used to allow many
				concurrent readers to the M3U8 file but only one
				exclusive writer

	@author		Robert Lluís 2013
*/
#include "m3u8_lock.h"

static pthread_rwlock_t	m3u8_lock;

static bool				m3u8_initialized_flag = false;

pthread_rwlock_t*   get_m3u8_lock()
{
	return &m3u8_lock;
}

int init_m3u8_lock()
{
	if(m3u8_initialized_flag){
		return 0;
	}
	int ret = pthread_rwlock_init(&m3u8_lock, NULL);
	if(!ret){
		m3u8_initialized_flag = true;	
	}
	return ret;
}
