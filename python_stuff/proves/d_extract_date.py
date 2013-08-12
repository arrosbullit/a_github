import re

str = "Descargar PDF                (31-07-2012)"

match = re.search('\((\d+-\d+-\d+)\)', str)
if match:
	print match.group()   
	print match.group(1)
    
    
