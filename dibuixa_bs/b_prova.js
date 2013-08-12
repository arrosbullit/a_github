var notCurrent = new Array();
var current = new Array();
var notCurrentPercent = new Array();
var currentPercent = new Array();
var myAssets;
var myAssetsPercent;

function  BSLine(lineName, value)
{
	this.lineName = lineName;
	this.value = value;
}

function Assets(notCurrent, current)
{
	this.notCurrent = notCurrent;
	this.current = current;
}



notCurrent.push(new BSLine("Inmovilizado material", 59783));
notCurrent.push(new BSLine("Activos Intangibles", 144440));
notCurrent.push(new BSLine("Inversiones en asociadas", 0));
notCurrent.push(new BSLine("Activos por impuestos diferidos", 12324));
notCurrent.push(new BSLine("Activos financieros disponibles para la venta", 0));
notCurrent.push(new BSLine("Otros activos financieros no corrientes", 2332));

current.push(new BSLine("Existencias", 55738));
current.push(new BSLine("Clientes y otras cuentas a cobrar", 45285));
current.push(new BSLine("Activos financieros disponibles para la venta", 15173));
current.push(new BSLine("Activos a valor razonable con cambios en resultados", 0 ));

current.push(new BSLine("Instrumentos financieros derivados", 0));
current.push(new BSLine("Activos por impuestos corrientes", 6470));
current.push(new BSLine("Otros activos financieros", 0));
current.push(new BSLine("Otros activos corrientes", 343));
current.push(new BSLine("Efectivo y equivalentes al efectivo", 9480 ));
current.push(new BSLine("Activos del Grupo enajenable clasificados como mantenidos para la venta", 8680));

myAssets = new Assets(notCurrent, current);

//Add up all not current assets
var totalAssets = 0;
console.log("Not current assets");
for (var i = 0; i < myAssets.notCurrent.length; i++)
{
	tmp = myAssets.notCurrent[i];
	console.log(tmp.lineName + " " + tmp.value);
	if(!isNaN(tmp.value)){
		totalAssets = totalAssets + tmp.value;
	}
}

//Add up all current assets
console.log("Current assets");
for (var i = 0; i < myAssets.current.length; i++)
{
	tmp = myAssets.current[i];
	console.log(tmp.lineName + " " + tmp.value);
	if(!isNaN(tmp.value)){
		totalAssets = totalAssets + tmp.value;
	}
}

console.log("Total activo " + totalAssets);

//Calculate percentages

//Do not-current percentages
for (var i = 0; i < myAssets.notCurrent.length; i++)
{
	tmp = myAssets.notCurrent[i];
	var percent = 0;
	if(!isNaN(tmp.value)){
		percent = tmp.value * 100 / totalAssets;
	}
	notCurrentPercent.push(new BSLine(tmp.lineName, percent));
	console.log(notCurrentPercent[i].lineName + " " + notCurrentPercent[i].value);
}
//Do current percentages
for (var i = 0; i < myAssets.current.length; i++)
{
	tmp = myAssets.current[i];
	var percent = 0;
	if(!isNaN(tmp.value)){
		percent = tmp.value * 100 / totalAssets;
	}
	currentPercent.push(new BSLine(tmp.lineName, percent));
	console.log(currentPercent[i].lineName + " " + currentPercent[i].value);
}

myAssetsPercent = new Assets(notCurrentPercent, currentPercent);

//Aquesta funcio es crida quan es fa click sobre el quadrat

function myFunction()
{
	var canvasHeight = 500;
	//Create some text
	var para=document.createElement("p");
	var node=document.createTextNode("This is new.");
	para.appendChild(node);
	//Locate the div
	var divElement = document.getElementById("bsDivId");
	//Add text
	divElement.appendChild(para);
	//Create the canvas
	var canvas = document.createElement("canvas");
	canvas.id = "myCanvas";
	canvas.width = "400";
	canvas.height = canvasHeight;
	canvas.style = "border:1px solid #c3c3c3;";
	//Add the canvas
	divElement.appendChild(canvas);
	

	console.log('myFunction()')
	
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.restore();
	ctx.fillStyle="080";
	ctx.fillRect(0,0,150,canvasHeight);	
	
	//Fes un rectangle  amb seccions de colors
	var lastY = 0;
	for(var i = 0; i < myAssetsPercent.notCurrent.length; i++){
		//Generate a random color
		var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
		ctx.fillStyle = randomColor;
		var sectionHeight = (myAssetsPercent.notCurrent[i].value / 100) * canvasHeight;
		ctx.fillRect(0, lastY, 150, sectionHeight);	
		lastY = lastY + sectionHeight;
	}

	for(var i = 0; i < myAssetsPercent.current.length; i++){
		//Generate a random color
		var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
		ctx.fillStyle = randomColor;
		var sectionHeight = (myAssetsPercent.current[i].value / 100) * canvasHeight;
		ctx.fillRect(0, lastY, 150, sectionHeight);	
		lastY = lastY + sectionHeight;
	}
	
}


