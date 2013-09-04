/*!
	@file		m3u8_lock.h

	@brief		This file has a pthread_rwlock_t used to allow many
				concurrent readers to the M3U8 file but only one
				exclusive writer

	@author		Robert Lluís 2013
*/
#ifndef __M3U8_LOCK_H__
#define __M3U8_LOCK_H__

#include "pthread.h"



int init_m3u8_lock();

pthread_rwlock_t* get_m3u8_lock();

#endif
