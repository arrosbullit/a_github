
import os

myPath = 'prova3'

if os.path.exists(myPath):
	print myPath, " already exists"
else:
	os.makedirs(myPath)
	print myPath, " created"




