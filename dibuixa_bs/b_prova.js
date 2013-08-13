var notCurrent = new Array();
var current = new Array();
var notCurrentPercent = new Array();
var currentPercent = new Array();
var myAssets;
var myAssetsPercent;
var colorCodes = new Array;
//With of line that separates non-current and current
var separationWidth = 2;
/*
colorCodes.push("#FF0000"); //1 roig
colorCodes.push("#FF7400"); //2 taronja
colorCodes.push("#FFC673"); //3 taronja clar 
colorCodes.push("#FFD300"); //4 groc 
colorCodes.push("#C9F76F"); //5 FFAA00 groc -> verd clar
colorCodes.push("#9FEE00"); //6 verd clar més fosc
colorCodes.push("#00CC00"); //7 verd
colorCodes.push("#009999"); //8 blau clar
colorCodes.push("#1240AB"); //9 blau més fosc
colorCodes.push("#DF64BD"); //5 FFFF00 groc -> lila clar
colorCodes.push("#CD0074"); //12 lila
colorCodes.push("#7109AA"); //11 carmin
*/
colorCodes.push("#00BB3F");
colorCodes.push("#00A287");
//colorCodes.push("#006957");
//colorCodes.push("#1E796A");
colorCodes.push("#1240AB");
colorCodes.push("#4671D5");
colorCodes.push("#6C8CD5");
colorCodes.push("#06266F");
//colorCodes.push("#00B945"); 
colorCodes.push("#0776A0"); 
//colorCodes.push("#162EAE"); 
colorCodes.push("#4711AE"); 
colorCodes.push("#8805A8"); 


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
	var colorIdx = 0;
	for(var i = 0; i < myAssetsPercent.notCurrent.length; i++){
		var val = myAssetsPercent.notCurrent[i].value;
		//val = 100 / (myAssetsPercent.notCurrent.length + myAssetsPercent.current.length);
		if(val != 0){
			ctx.fillStyle = colorCodes[colorIdx % colorCodes.length];
			var sectionHeight = (val / 100) * (canvasHeight - separationWidth);
			ctx.fillRect(0, lastY, 150, sectionHeight);	
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	
	
	ctx.fillStyle = "black";
	ctx.fillRect(0, lastY, 150, lastY + separationWidth);
	lastY = lastY + separationWidth;
	
	for(var i = 0; i < myAssetsPercent.current.length; i++){
		var val = myAssetsPercent.current[i].value;
		//val = 100 / (myAssetsPercent.notCurrent.length + myAssetsPercent.current.length);
		if(val != 0){
			ctx.fillStyle = colorCodes[colorIdx % colorCodes.length];
			var sectionHeight = (val / 100) * (canvasHeight - separationWidth);
			ctx.fillRect(0, lastY, 150, sectionHeight);	
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	
}


