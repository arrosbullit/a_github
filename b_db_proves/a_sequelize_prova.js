var Sequelize = require("sequelize");

/*
var sequelize = new Sequelize('database', 'username', 'password', {
  host: "my.server.tld",
  port: 12345,
  
})




var sequelize = new Sequelize('database', 'username', 'password', {
  // gimme postgres, please!
  dialect: 'postgres'
})
*/




var sequelize = new Sequelize('mydb', 'robert', '111111', {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});

sequelize.query("select * from bs").success(
	function(myTableRows){
		//console.log(myTableRows);
		console.log("iii_deudores_comerciales " + 
			myTableRows[0]['iii_deudores_comerciales']);
	});






