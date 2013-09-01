var pg = require('pg');


var connectionString = "postgres://robert:111111@localhost:5432/mydb";
var myDone = false;


//Aqui utilitzto pg.connect enlloc de client.connect per a fer
//pg object
//servir el pool de clients que pg implementa 
//done(): retorna el client al pool de clients
//pg.end(): disconnects all clints within all active pools
//client object
//client.query() creates a query object, queues it for execution and
//	returns it
//La query callback(err, result) es opcional
//la callback conté tot el resultat de la query que diuen que pot
//	 ocupar molta memòria. El paràmetre result té:
//	array rows


pg.connect(connectionString, function(err, client, done) {
	myClient = client;
	client.query('SELECT * FROM bs', function(err, result) {
		
		console.log(result.rows);
		pepito(done);
		//done();
		
	});
	
});

//var myClient;

function pepito(done)
{
	console.log("Soc Pepito");
	myClient.query('SELECT * FROM cr', function(err, result) {
		console.log(result.rows);
		console.log(err);
		//done();
		//pg.end();
		listEmpreses(done);
	});
}


function listEmpreses(done){
	console.log("listEmpreses()");
	myClient.query('select * from empresa', function(err, result){
		console.log(result.rows);
		console.log(err);
		done();
		pg.end();
	});

}

console.log("Is this the end? My only friend the end");

//Documentacio!!!
//var conString = "postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";

/*
var conString = "postgres://robert:111111@localhost:5432/mydb";

var client = new pg.Client(connectionString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});


client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('select * from bs', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});
*/

