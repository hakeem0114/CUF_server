# CUF_server 

## REST API For Students on Information of Ontario Universities
Used cheerio & axios to scrape references for data in order to create
an API for my UI

# Libraries & Packages Used

Cheerio
```
 A fast headless browser (does not render actual UI )  that is DOM parser without executing Javascript on the webpages, unlike Puppeteer.
```

Axios
```
Better alternative (in built support for download progress, more secure, error handling, cancelling request and their timeouts) to fetch API for http req with node & js
```

The rest are standard node libraries for server

## References
Macleans,Statistics Canada, OntarioUniversities.org organization

## How to access
Run a get request to the server being hosted on Render & retrieve as .json():

https://cuf-server.onrender.com/universityData

## REST API Architecture 
Due to inconsistent speed of api call, json data has been moved into a cloud storage (firebase cloud) in order to make the API stateless.

Solves the need to have the backup data on the server for the CUF_client use. 

The deployed server is still available for public use.



