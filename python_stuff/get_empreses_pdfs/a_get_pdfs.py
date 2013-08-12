import httplib
import time
from bs4 import BeautifulSoup


def getPageFromInet(prefix, sufix):
	"retorna una pagina d'Internet"
	conn = httplib.HTTPConnection(prefix)
	conn.request("GET", sufix)
	r1 = conn.getresponse()
	print r1.status, r1.reason
	data1 = r1.read()
	conn.close()
	return data1
	
def getLinks(htmlData):
	"retorna els links que hi ha en un html"
	soup = BeautifulSoup(htmlData)
	llista = []
	for link in soup.find_all('a'):
		tmp = link.get('href')
		llista.append(tmp)				
	return llista
	 
def getStringsWithSubstring(strList, subStr):
	"retorna llista de strings que si inclouen un substring"
	retList = []
	for curStr in strList:
		if curStr.find(subStr) == -1:
			pass
		else:
			retList.append(curStr)
	return retList
	
def getStringsWithoutSubstring(strList, subStr):
	"retorna llista de strings que no inclouen un substring"
	retList = []
	for curStr in strList:
		if curStr.find(subStr) == -1:
			retList.append(curStr)
		else:
			pass
	return retList
	
def printList(scopeList):
	for item in scopeList:
		print item
	return			
	

#MAIN STARTS HERE !!!!!!!!!!!!!!!!!!!!!	
	
prefix = "www.boletinfinanciero.es"
sufix = "/listado"
data = getPageFromInet(prefix, sufix)

links = getLinks(data)

links = getStringsWithSubstring(links, "/empresa/")

#Here there should be a loop


#Get company name


#Get page
data = getPageFromInet(prefix, links[0])
links = getLinks(data)
links = getStringsWithSubstring(links, "/empresa/");
links = getStringsWithoutSubstring(links, "/rss");

#Get page
curPageLink = links[0]
data = getPageFromInet(prefix, curPageLink)
links = getLinks(data)
links = getStringsWithSubstring(links, "/empresa/")
links = getStringsWithoutSubstring(links, "/rss");
links = getStringsWithoutSubstring(links, curPageLink)


#Get page
data = getPageFromInet(prefix, links[0])
links = getLinks(data)
links = getStringsWithSubstring(links, ".pdf")

#Loop over the pdf links here!


    
    
