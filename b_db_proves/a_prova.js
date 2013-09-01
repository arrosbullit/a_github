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




var sequelize = new Sequelize('mydb', 'postgres', '111111', {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});

sequelize.query("select * from weather").success(
	function(myTableRows){
		console.log(myTableRows)
	})






