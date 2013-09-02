var pg = require('pg');


var connectionString = "postgres://robert:111111@localhost:5432/mydb";
var myDone = false;

//Per fer les crides sequencialment ho faig encadenant ls callbacks

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

//Per executar funcions de forma sequencial utilitzo aquesta paranoia
function series(callbacks, last) {
  function next() {
    var callback = callbacks.shift();
    if(callback) {
      callback(lastResult, function() {
        next();
      });
    } else {
      last();
    }
  }
  next();
}



pg.connect(connectionString, function(err, client, done) {
	myClient = client;
	client.query('SELECT * FROM bs', function(err, result) {
		
		//console.log(result.rows);
		queryCR(done);
		//done();
		
	});
	
});

//var myClient;

function queryCR(done)
{
	console.log("Soc Pepito");
	myClient.query('SELECT * FROM cr', function(err, result) {
		//console.log(result.rows);
		//console.log(err);
		//done();
		//pg.end();
		listEmpreses(done);
	});
}


function listEmpreses(done){
	console.log("listEmpreses()");
	myClient.query('select * from empresa', function(err, result){
		console.log(result.rows);
		//console.log(err);
		//done();
		//pg.end();
		existeixEmpresa(done);
	});

}


//funcio per comprovar si existeix una empresa
function existeixEmpresa(done){
	console.log("existeixEmpresa()");
	myClient.query('SELECT * FROM empresa WHERE UPPER(name) LIKE UPPER(\'%cola%\')', 
		function(err, result){
			if(err){
				console.log("Empresa no trobada");	
			}
			if(result){
				if(result.rows.length == 0){
					console.log("Empresa no trobada");
				}
				else{
					console.log(result.rows);
				}
			}
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

