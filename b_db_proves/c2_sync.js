//Per executar funcions de forma sequencial hagi de fer 
//les paranoies més increibles!

// Example task
// Example task
function myFunction(arg, callback) {
  var delay = 1000; // random ms
  console.log('async with \''+arg+'\', return in '+delay+' ms');
  setTimeout(function() { callback(arg + 1); }, delay);
}

function final(results) { console.log('Done', results); }

var myArray = [
myFunction,
myFunction,
myFunction,
final
];

function series(tasks) {
	var previousResult;
	function next(previousResult) {
		var task = tasks.shift();
		if(tasks.length == 0){
			//last task
			task(previousResult);
		} else {
			task(previousResult, next);
		}
	}
	next(0);
}

series(myArray);
