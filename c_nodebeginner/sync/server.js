var http = require("http");
var url = require("url");

function start(route, handle){

	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		response.writeHead(200, {"Content-Type": "text/plain"});
		var content = route(handle, pathname);
		response.write(content);
		//response.write("Hello World");
		response.end();
			
	}
	
	http.createServer(onRequest).listen(8888);
	
	console.log("Server started at localhost:8888");

}


/*
	http.createServer(function(request, response){
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
		response.end();
	}).listen(8888);
*/





exports.start = start;


