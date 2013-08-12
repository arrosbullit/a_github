#!/usr/bin/python
import re

str = "http://www.boletinfinanciero.es/empresa/138-tecnocom-telecomunicacionesy-energiasa-0-informacion-0-noticias.html"

match = re.search('^([^-]+)-(.+)-\d-informacion-(.+)$', str)
if match:
	print match.group()   
	print match.group(1) #el primer parentesi es tot exceptuant guions  
	print match.group(2) #nom de l empresa
	print match.group(3) #la resta de brossa 
    
    
