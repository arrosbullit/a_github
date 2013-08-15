//Actiu
var notCurrent = new Array();
var current = new Array();
var notCurrentPercent = new Array();
var currentPercent = new Array();
var myAssets;
var myAssetsPercent;

//With of line that separates non-current and current
var liquidityLineSeparationWidth = 2;
var patrimoniNetSeparationWidth = 2;
var passiveLineSeparationWidth = 2;
var canvasHeight = 500;
var canvasWidth = 302;
var columnWidth = (canvasWidth - passiveLineSeparationWidth)/2;
//My color palette
var colorCodes = new Array;
colorCodes.push("#00BB3F");
colorCodes.push("#00A287");
colorCodes.push("#1240AB");
colorCodes.push("#4671D5");
colorCodes.push("#6C8CD5");
colorCodes.push("#06266F");
colorCodes.push("#0776A0"); 
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
for (var i = 0; i < myAssets.notCurrent.length; i++)
{
	tmp = myAssets.notCurrent[i];
	if(!isNaN(tmp.value)){
		totalAssets = totalAssets + tmp.value;
	}
}

//Add up all current assets
//console.log("Current assets");
for (var i = 0; i < myAssets.current.length; i++)
{
	tmp = myAssets.current[i];
	if(!isNaN(tmp.value)){
		totalAssets = totalAssets + tmp.value;
	}
}

//console.log("Total activo " + totalAssets);

//Calculate percentages
//Do not-current percentages
for (var i = 0; i < myAssets.notCurrent.length; i++)
{
	tmp = myAssets.notCurrent[i];
	var percent = 0;
	if(!isNaN(tmp.value)){
		percent = tmp.value * 100 / totalAssets;
		//console.log("Percent " + percent);
	}
	notCurrentPercent.push(new BSLine(tmp.lineName, percent));
	//console.log(notCurrentPercent[i].lineName + " " + notCurrentPercent[i].value);
}
//Do current percentages
for (var i = 0; i < myAssets.current.length; i++)
{
	tmp = myAssets.current[i];
	var percent = 0;
	if(!isNaN(tmp.value)){
		percent = tmp.value * 100 / totalAssets;
		//console.log("Percent " + percent);
	}
	currentPercent.push(new BSLine(tmp.lineName, percent));
	//console.log(currentPercent[i].lineName + " " + currentPercent[i].value);
}

myAssetsPercent = new Assets(notCurrentPercent, currentPercent);

//Passiu
var patrimoniNet = new Array();
var passiuNoCorrent = new Array();
var passiuCorrent = new Array();

var patrimoniNetPercent = new Array();
var passiuNoCorrentPercent = new Array();
var passiuCorrentPercent = new Array();

var myPassiu;
var myPassiuPercent;

function Passiu(patrimoniNet, noCorrent, corrent)
{
	this.patrimoniNet = patrimoniNet;
	this.noCorrent = noCorrent;
	this.corrent = corrent;
}

patrimoniNet.push(new BSLine("Capital ordinario", 56974));
patrimoniNet.push(new BSLine("Prima de emisión", 63432));
patrimoniNet.push(new BSLine("Participaciones no dominantes  - Otras reservas", 9608));

passiuNoCorrent.push(new BSLine("Deuda financiera", 141447));
passiuNoCorrent.push(new BSLine("Instrumentos financieros derivados", 5103));
passiuNoCorrent.push(new BSLine("Pasivos por impuestos diferidos", 3819));
passiuNoCorrent.push(new BSLine("Otros pasivos financieros", 8150));
passiuNoCorrent.push(new BSLine("Otros pasivos y subvenciones de capital", 1343));
passiuNoCorrent.push(new BSLine("Provisiones para otros pasivos y gastos", 2033));

passiuCorrent.push(new BSLine("Proveedores y otras cuentas a pagar", 42373));
passiuCorrent.push(new BSLine("Pasivos por impuestos corrientes", 7866));
passiuCorrent.push(new BSLine("Deuda financiera", 9058));
passiuCorrent.push(new BSLine("Instrumentos financieros derivados", 189));
passiuCorrent.push(new BSLine("Otros pasivos financieros", 670));
passiuCorrent.push(new BSLine("Provisiones para otros pasivos y gastos", 79));
passiuCorrent.push(new BSLine("Otros pasivos corrientes", 7904));
passiuCorrent.push(new BSLine("Pasivos del Grupo enajenable clasificados como mantenidos para la venta", 0));
	
myPassiu = new Passiu(patrimoniNet, passiuNoCorrent, passiuCorrent);

//Suma tot el patrimoni net
var totalPassiu = 0;
for (var i = 0; i < myPassiu.patrimoniNet.length; i++)
{
	tmp = myPassiu.patrimoniNet[i];
	if(!isNaN(tmp.value)){
		totalPassiu = totalPassiu + tmp.value;
	}
}
//Suma el passiu no corrent
for (var i = 0; i < myPassiu.noCorrent.length; i++)
{
	tmp = myPassiu.noCorrent[i];
	if(!isNaN(tmp.value)){
		totalPassiu = totalPassiu + tmp.value;
	}
}
//Suma el passiu corrent
for (var i = 0; i < myPassiu.corrent.length; i++)
{
	tmp = myPassiu.corrent[i];
	if(!isNaN(tmp.value)){
		totalPassiu = totalPassiu + tmp.value;
	}
}
//console.log("Total passiu " + totalPassiu);
//Calculate percentages
//Patrimoni net percentages
for (var i = 0; i < myPassiu.patrimoniNet.length; i++)
{
	tmp = myPassiu.patrimoniNet[i];
	var percent = 0;
	if(!isNaN(tmp.value)){
		percent = tmp.value * 100 / totalPassiu;
		//console.log("Percent " + percent);
	}
	patrimoniNetPercent.push(new BSLine(tmp.lineName, percent));
}
//Percentatges del passiu no corrent
for (var i = 0; i < myPassiu.noCorrent.length; i++)
{
	tmp = myPassiu.noCorrent[i];
	var percent = 0;
	if(!isNaN(tmp.value)){
		percent = tmp.value * 100 / totalPassiu;
		//console.log("Percent " + percent);
	}
	passiuNoCorrentPercent.push(new BSLine(tmp.lineName, percent));
}
//Percentatges del passiu corrent
for (var i = 0; i < myPassiu.corrent.length; i++)
{
	tmp = myPassiu.corrent[i];
	var percent = 0;
	if(!isNaN(tmp.value)){
		percent = tmp.value * 100 / totalPassiu;
		//console.log("Percent " + percent);
	}
	passiuCorrentPercent.push(new BSLine(tmp.lineName, percent));
}

myPassiuPercent = new Passiu(
	patrimoniNetPercent,
	passiuNoCorrentPercent, 
	passiuCorrentPercent);


function myFunction()
{
	console.log('myFunction()')

	
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
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	canvas.style = "border:1px solid #c3c3c3;";
	//Add the canvas
	divElement.appendChild(canvas);
	
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.restore();
	
	//Fes un rectangle  amb seccions de colors
	var myX = 0;
	var lastY = 0;
	var colorIdx = 0;
	for(var i = 0; i < myAssetsPercent.notCurrent.length; i++){
		var val = myAssetsPercent.notCurrent[i].value;
		//val = 100 / (myAssetsPercent.notCurrent.length + myAssetsPercent.current.length);
		if(val != 0){
			ctx.fillStyle = colorCodes[colorIdx % colorCodes.length];
			var sectionHeight = (val / 100) * (canvasHeight - liquidityLineSeparationWidth);
			ctx.fillRect(myX, lastY, columnWidth, sectionHeight);	
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	
	//Draw line to separate non-current and current
	ctx.fillStyle = "white";
	ctx.fillRect(myX, lastY, columnWidth, lastY + liquidityLineSeparationWidth);
	lastY = lastY + liquidityLineSeparationWidth;
	
	//Draw the current stuff
	for(var i = 0; i < myAssetsPercent.current.length; i++){
		var val = myAssetsPercent.current[i].value;
		//val = 100 / (myAssetsPercent.notCurrent.length + myAssetsPercent.current.length);
		if(val != 0){
			ctx.fillStyle = colorCodes[colorIdx % colorCodes.length];
			var sectionHeight = (val / 100) * (canvasHeight - liquidityLineSeparationWidth);
			ctx.fillRect(myX, lastY, columnWidth, sectionHeight);	
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	
	//Dibuixa els passius
	//Calculate percentages
	//Patrimoni net percentages
	//Fes un rectangle  amb seccions de colors
	var availHeight = canvasHeight - liquidityLineSeparationWidth - 
						patrimoniNetSeparationWidth;
	myX = columnWidth + 2;
	lastY = 0;
	colorIdx = 0;
	//Dibuixa el patrimoni net
	for(var i = 0; i < myPassiuPercent.patrimoniNet.length; i++){
		var val = myPassiuPercent.patrimoniNet[i].value;
		if(val != 0){
			ctx.fillStyle = colorCodes[colorIdx % colorCodes.length];
			var sectionHeight = (val / 100) * availHeight;
			ctx.fillRect(myX, lastY, columnWidth, sectionHeight);	
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	//Draw line to separate el patrimoni net
	ctx.fillStyle = "white";
	ctx.fillRect(myX, lastY, columnWidth, lastY + patrimoniNetSeparationWidth);
	lastY = lastY + patrimoniNetSeparationWidth;	
	//Dibuixa el passiu no corrent
	for(var i = 0; i < myPassiuPercent.noCorrent.length; i++){
		var val = myPassiuPercent.noCorrent[i].value;
		//console.log("passiu no corrent" + val);
		if(val != 0){
			ctx.fillStyle = colorCodes[colorIdx % colorCodes.length];
			var sectionHeight = (val / 100) * availHeight;
			ctx.fillRect(myX, lastY, columnWidth, sectionHeight);	
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	//Draw line to separate non-current and current
	ctx.fillStyle = "white";
	ctx.fillRect(myX, lastY, columnWidth, lastY + liquidityLineSeparationWidth);
	lastY = lastY + liquidityLineSeparationWidth;	
	//Dibuixa el passiu  corrent
	for(var i = 0; i < myPassiuPercent.corrent.length; i++){
		var val = myPassiuPercent.corrent[i].value;
		if(val != 0){
			ctx.fillStyle = colorCodes[colorIdx % colorCodes.length];
			var sectionHeight = (val / 100) * availHeight;
			ctx.fillRect(myX, lastY, columnWidth, sectionHeight);	
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}	
}

function dibuixaSVGBS()
{
    var container = document.getElementById("svgContainer");
	var mySVG = document.createElementNS("http://www.w3.org/2000/svg",
	 "svg");
	mySVG.setAttribute("version", "1.2");
	mySVG.setAttribute("baseProfile", "tiny");
	container.appendChild(mySVG);
	
	//Fes un rectangle  amb seccions de colors
	var r;
	var myX = 0;
	var lastY = 0;
	var colorIdx = 0;
	for(var i = 0; i < myAssetsPercent.notCurrent.length; i++){	
		var val = myAssetsPercent.notCurrent[i].value;
		if(val != 0 && isNaN(val) == false){
			var sectionHeight = (val / 100) * 
				(canvasHeight - liquidityLineSeparationWidth);
			var fill = colorCodes[colorIdx % colorCodes.length];
			var customData1 = "notused";
			var customData2 = i;
			var myCallback = "onclick_actiuNoCorrent(this)";
			r = doRect(mySVG, myX, lastY, columnWidth, 
				sectionHeight, fill,
				customData1, customData2, myCallback);
			//loop increments
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	
	//Draw line to separate non-current and current
	doRect(mySVG, myX, lastY, columnWidth, 
		lastY + liquidityLineSeparationWidth, "white");
	lastY = lastY + liquidityLineSeparationWidth;
	
	//Draw the current stuff
	for(var i = 0; i < myAssetsPercent.current.length; i++){
		var val = myAssetsPercent.current[i].value;
		if(val != 0 && isNaN(val) == false){
			var sectionHeight = (val / 100) * 
				(canvasHeight - liquidityLineSeparationWidth);
			var fill = colorCodes[colorIdx % colorCodes.length];
			var customData1 = "notused";
			var customData2 = i;
			var myCallback = "onclick_actiuCorrent(this)";
			r = doRect(mySVG, myX, lastY, columnWidth, 
				sectionHeight, fill,
				customData1, customData2, myCallback);
			//loop increments
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}		
	
	//Dibuixa els passius
	//Calculate percentages
	//Patrimoni net percentages
	//Fes un rectangle  amb seccions de colors	
	var availHeight = canvasHeight - liquidityLineSeparationWidth - 
						patrimoniNetSeparationWidth;
	myX = columnWidth + 2;
	lastY = 0;
	colorIdx = 0;
	//Dibuixa el patrimoni net
	for(var i = 0; i < myPassiuPercent.patrimoniNet.length; i++){
		var val = myPassiuPercent.patrimoniNet[i].value;
		if(val != 0 && isNaN(val) == false){
			var sectionHeight = (val / 100) * availHeight;
			var fill = colorCodes[colorIdx % colorCodes.length];
			var customData1 = "notused";
			var customData2 = i;
			var myCallback = "onclick_patrimoniNet(this)";
			r = doRect(mySVG, myX, lastY, columnWidth, 
				sectionHeight, fill,
				customData1, customData2, myCallback);
			//loop increments
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	
	//Draw line to separate el patrimoni net
	doRect(mySVG, myX, lastY, columnWidth, 
		lastY + patrimoniNetSeparationWidth, "white");
	lastY = lastY + patrimoniNetSeparationWidth;	

	//Dibuixa el passiu no corrent
	for(var i = 0; i < myPassiuPercent.noCorrent.length; i++){
		var val = myPassiuPercent.noCorrent[i].value;
		//console.log("passiu no corrent" + val);
		if(val != 0 && isNaN(val) == false){
			var sectionHeight = (val / 100) * availHeight;
			var fill = colorCodes[colorIdx % colorCodes.length];
			var customData1 = "notused";
			var customData2 = i;
			var myCallback = "onclick_passiuNoCorrent(this)";
			r = doRect(mySVG, myX, lastY, columnWidth, 
				sectionHeight, fill,
				customData1, customData2, myCallback);
			//loop increments
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	
	//Draw line to separate non-current and current
	doRect(mySVG, myX, lastY, columnWidth, 
		lastY + liquidityLineSeparationWidth, "white");
	lastY = lastY + liquidityLineSeparationWidth;	

	//Dibuixa el passiu  corrent
	for(var i = 0; i < myPassiuPercent.corrent.length; i++){
		var val = myPassiuPercent.corrent[i].value;
		if(val != 0 && isNaN(val) == false){
			var sectionHeight = (val / 100) * availHeight;
			var fill = colorCodes[colorIdx % colorCodes.length];
			var customData1 = "notUsed";
			var customData2 = i;
			var myCallback = "onclick_passiuCorrent(this)";
			r = doRect(mySVG, myX, lastY, columnWidth, 
				sectionHeight, fill,
				customData1, customData2, myCallback);
			//loop increments
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}	
	
}

//Returns rectangle with the specified input params
function doRect(mySVG, x, y, width, height, fill, 
				customData1, customData2, myCallback)
{
	var r = document.createElementNS(
		"http://www.w3.org/2000/svg",
	 	"rect");
	r.setAttribute("x", x);
	r.setAttribute("y", y);
	r.setAttribute("width", width);
	r.setAttribute("height", height);
	r.setAttribute("fill", fill);
	if(customData1){
		r.setAttribute("data-arrayId", customData1);
	}
	if(customData2){
		r.setAttribute("data-arrayIdx", customData2);
	}
	if(myCallback){
		r.setAttribute("onclick", myCallback);	
	}
	mySVG.appendChild(r);
	return r;
}

function onclick_actiuNoCorrent(obj)
{
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt = notCurrent[idx].lineName;
	var val = notCurrent[idx].value;
	var percent = notCurrentPercent[idx].value;
	console.log(txt + " " + val + " " + percent);
}
function onclick_actiuCorrent(obj)
{
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt = current[idx].lineName;
	var val = current[idx].value;
	var percent = currentPercent[idx].value;
	console.log(txt + " " + val + " " + percent);
}
function onclick_patrimoniNet(obj)
{
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt = patrimoniNet[idx].lineName;
	var val = patrimoniNet[idx].value;
	var percent = patrimoniNetPercent[idx].value;
	console.log(txt + " " + val + " " + percent);
}
function onclick_passiuNoCorrent(obj)
{
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt = passiuNoCorrent[idx].lineName;
	var val = passiuNoCorrent[idx].value;
	var percent = passiuNoCorrentPercent[idx].value;
	console.log(txt + " " + val + " " + percent);
}
function onclick_passiuCorrent(obj)
{
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt = passiuCorrent[idx].lineName;
	var val = passiuCorrent[idx].value;
	var percent = passiuCorrentPercent[idx].value;
	console.log(txt + " " + val + " " + percent);
}

