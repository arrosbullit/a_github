from bs4 import BeautifulSoup

"retorna els links que hi ha en un html"
htmlData = "<html><a href=\"href_text\">anchor_text</a></html>"
soup = BeautifulSoup(htmlData)
myA = soup.find('a')
myText = myA.get_text()
print myText		

