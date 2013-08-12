import httplib
import time
from bs4 import BeautifulSoup
import re
import os
from subprocess import call

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
	 
def getLinksV2(htmlData):
	"retorna els objectes a"
	soup = BeautifulSoup(htmlData)
	llista = []
	for link in soup.find_all('a'):
		llista.append(link)
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
	
def getStringsWithSubstringV2(companyAnchorList, subStr):
	"retorna llista de strings que si inclouen un substring"
	retList = []
	for anchor in companyAnchorList:
		tmpStr = anchor.get('href')
		if tmpStr.find(subStr) == -1:
			pass
		else:
			retList.append(anchor)
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

def printListV2(companyAnchorList):
	for anchor in companyAnchorList:
		tmpStr = anchor.get('href')
		print tmpStr

#MAIN STARTS HERE !!!!!!!!!!!!!!!!!!!!!	
prefix = "www.boletinfinanciero.es"
sufix = "/listado"
data = getPageFromInet(prefix, sufix)
companyAnchorList = getLinksV2(data)
companyAnchorList = getStringsWithSubstringV2(companyAnchorList, "/empresa/")

#DEBUG
#for anchor in companyAnchorList:
#	print anchor.get_text().strip()
#printListV2(companyAnchorList)

firstCompany = "ZINC"
jumpDone = False

for anchor in companyAnchorList:
	#Create directory names with the compay names
	companyName = anchor.get_text().strip()
		
	if jumpDone == False:
		if companyName.find(firstCompany) != -1:
			jumpDone = True
		else:
			continue
			
	fullPath = "./companies/" + companyName
	if os.path.exists(fullPath):
		pass
	else:
		os.makedirs(fullPath)
	

	companyLink = anchor.get('href')
	data = getPageFromInet(prefix, companyLink)
	sectionLinks = getLinks(data)
	sectionLinks = getStringsWithSubstring(sectionLinks, "/empresa/");
	sectionLinks = getStringsWithoutSubstring(sectionLinks, "/rss");

	for sectionLink in sectionLinks:
		data = getPageFromInet(prefix, sectionLink)
		subsectionLinks = getLinks(data)
		subsectionLinks = getStringsWithSubstring(subsectionLinks, "/empresa/")
		subsectionLinks = getStringsWithoutSubstring(subsectionLinks, "/rss");
		subsectionLinks = getStringsWithoutSubstring(subsectionLinks, "-0-noticias")

		for subsectionLink in subsectionLinks:
			data = getPageFromInet(prefix, subsectionLink)
			pdfLinks = getLinks(data)
			pdfLinks = getStringsWithSubstring(pdfLinks, ".pdf")

			for pdfLink in pdfLinks:
				pdfName = pdfLink.replace("/documento/", "")
				fullPdfName = fullPath + '/' + pdfName
				fullPdfLink = "http://www.boletinfinanciero.es" + pdfLink
				call(["wget", "-O", fullPdfName, fullPdfLink])

    
