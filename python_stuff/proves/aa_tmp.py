#Here there should be a loop. For each company.
#Get company name
#Get page
companyLink = links[0]
data = getPageFromInet(prefix, companyLink)
links = getLinks(data)
links = getStringsWithSubstring(links, "/empresa/");
links = getStringsWithoutSubstring(links, "/rss");

#Here there should be a loop. For every section.

#Get page
sectionLink = links[0]
data = getPageFromInet(prefix, sectionLink)
links = getLinks(data)
links = getStringsWithSubstring(links, "/empresa/")
links = getStringsWithoutSubstring(links, "/rss");
#Els links de totes les seccions tenen -0-noticias i jo no vull anar enrere!!!
links = getStringsWithoutSubstring(links, "-0-noticias")

#Get page
data = getPageFromInet(prefix, links[0])
links = getLinks(data)
links = getStringsWithSubstring(links, ".pdf")
printList(links)



#Loop over the pdf links here!
