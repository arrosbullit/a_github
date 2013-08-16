//Actiu
var notCurrent = new Array();
var current = new Array();
var notCurrentPercent = new Array();
var currentPercent = new Array();
var myAssets;
var myAssetsPercent;
var totalActiuCorrent = 0;
var totalActiuNoCorrent = 0;
//Vars per dibuixar els curly braces
var actiuNoCorrentFirstY = 0;
var actiuNoCorrentLastY = 0;

var actiuCorrentFirstY = 0;
var actiuCorrentLastY = 0;

var patrimoniNetFirstY = 0;
var patrimoniNetLastY = 0;

var passiuNoCorrentFirstY = 0;
var passiuNoCorrentLastY = 0;

var passiuCorrentFirstY = 0;
var passiuCorrentLastY = 0;

var closingBraceMaxX = 0;

//With of line that separates non-current and current
var liquidityLineSeparationWidth = 2;
var patrimoniNetSeparationWidth = 2;
var passiveLineSeparationWidth = 2;
var canvasHeight = 450;
var canvasWidth =  242;
var columnWidth = (canvasWidth - passiveLineSeparationWidth)/2;
var canvasBottomExtraSize = 30;
var canvasSideExtraSize = 70;
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
		totalActiuNoCorrent += tmp.value;
	}
}

//Add up all current assets
//console.log("Current assets");
for (var i = 0; i < myAssets.current.length; i++)
{
	tmp = myAssets.current[i];
	if(!isNaN(tmp.value)){
		totalAssets = totalAssets + tmp.value;
		totalActiuCorrent += tmp.value;
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
var totalPatrimoniNet = 0;
var totalPassiuNoCorrent = 0;
var totalPassiuCorrent = 0;

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
		totalPatrimoniNet += tmp.value;
	}
}
//Suma el passiu no corrent
for (var i = 0; i < myPassiu.noCorrent.length; i++)
{
	tmp = myPassiu.noCorrent[i];
	if(!isNaN(tmp.value)){
		totalPassiu = totalPassiu + tmp.value;
		totalPassiuNoCorrent += tmp.value;
	}
}
//Suma el passiu corrent
for (var i = 0; i < myPassiu.corrent.length; i++)
{
	tmp = myPassiu.corrent[i];
	if(!isNaN(tmp.value)){
		totalPassiu = totalPassiu + tmp.value;
		totalPassiuCorrent += tmp.value;
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


function dibuixaSVGBS()
{
	console.log("dibuixaSVGBS()");
    var container = document.getElementById("svgContainer");
	var mySVG = document.createElementNS("http://www.w3.org/2000/svg",
	 "svg");
	mySVG.setAttribute("version", "1.2");
	mySVG.setAttribute("baseProfile", "tiny");
	var aux = canvasWidth + 2 * canvasSideExtraSize;
	mySVG.setAttribute("width", aux + "px");
	aux = canvasHeight + canvasBottomExtraSize;
	mySVG.setAttribute("height", aux + "px");
	container.appendChild(mySVG);
	
	//Fes un rectangle  amb seccions de colors
	var r;
	var myX = canvasSideExtraSize;
	var lastY = 0;
	actiuNoCorrentFirstY = 0;
	var colorIdx = 0;
	for(var i = 0; i < myAssetsPercent.notCurrent.length; i++){	
		var val = myAssetsPercent.notCurrent[i].value;
		var text = myAssetsPercent.notCurrent[i].lineName;
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
			//Add text
			var shortText = getShortenedVersion(text);
			if(shortText.length){
				printSectionsText(mySVG, myX, lastY, sectionHeight,
				shortText, val, myAssets.notCurrent[i].value);
			}
			//loop increments
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	actiuNoCorrentLastY = lastY;
	//Draw line to separate non-current and current
	doRect(mySVG, myX, lastY, columnWidth, 
		lastY + liquidityLineSeparationWidth, "white");
	lastY = lastY + liquidityLineSeparationWidth;
	
	//Draw the current stuff
	actiuCorrentFirstY = lastY;
	for(var i = 0; i < myAssetsPercent.current.length; i++){
		var val = myAssetsPercent.current[i].value;
		var text = myAssetsPercent.current[i].lineName;
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
			//Add text
			var shortText = getShortenedVersion(text);
			if(shortText.length){
				printSectionsText(mySVG, myX, lastY, sectionHeight,
				shortText, val, myAssets.current[i].value);
			}
			//loop increments
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}		
	actiuCorrentLastY = lastY;
	//Dibuixa els passius
	//Calculate percentages
	//Patrimoni net percentages
	//Fes un rectangle  amb seccions de colors	
	var availHeight = canvasHeight - liquidityLineSeparationWidth - 
						patrimoniNetSeparationWidth;
	myX = canvasSideExtraSize + columnWidth + 2;
	lastY = 0;
	patrimoniNetFirstY = 0;
	colorIdx = 0;
	//Dibuixa el patrimoni net
	for(var i = 0; i < myPassiuPercent.patrimoniNet.length; i++){
		var val = myPassiuPercent.patrimoniNet[i].value;
		var text = myPassiuPercent.patrimoniNet[i].lineName;
		if(val != 0 && isNaN(val) == false){
			var sectionHeight = (val / 100) * availHeight;
			var fill = colorCodes[colorIdx % colorCodes.length];
			var customData1 = "notused";
			var customData2 = i;
			var myCallback = "onclick_patrimoniNet(this)";
			r = doRect(mySVG, myX, lastY, columnWidth, 
				sectionHeight, fill,
				customData1, customData2, myCallback);
			//Add text
			var shortText = getShortenedVersion(text);
			if(shortText.length){
				printSectionsText(mySVG, myX, lastY, sectionHeight,
				shortText, val, myPassiu.patrimoniNet[i].value);
			}
			//loop increments
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	patrimoniNetLastY = lastY;
	//Draw line to separate el patrimoni net
	doRect(mySVG, myX, lastY, columnWidth, 
		lastY + patrimoniNetSeparationWidth, "white");
	lastY = lastY + patrimoniNetSeparationWidth;	

	//Dibuixa el passiu no corrent
	passiuNoCorrentFirstY = lastY;
	for(var i = 0; i < myPassiuPercent.noCorrent.length; i++){
		var text = myPassiuPercent.noCorrent[i].lineName;
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
			//Add text
			var shortText = getShortenedVersion(text);
			if(shortText.length){
				printSectionsText(mySVG, myX, lastY, sectionHeight,
				shortText, val, myPassiu.noCorrent[i].value);
			}
			//loop increments
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}
	passiuNoCorrentLastY = lastY;
	//Draw line to separate non-current and current
	doRect(mySVG, myX, lastY, columnWidth, 
		lastY + liquidityLineSeparationWidth, "white");
	lastY = lastY + liquidityLineSeparationWidth;	

	//Dibuixa el passiu  corrent
	passiuCorrentFirstY = lastY;
	for(var i = 0; i < myPassiuPercent.corrent.length; i++){
		var val = myPassiuPercent.corrent[i].value;
		var text = myPassiuPercent.corrent[i].lineName;
		if(val != 0 && isNaN(val) == false){
			var sectionHeight = (val / 100) * availHeight;
			var fill = colorCodes[colorIdx % colorCodes.length];
			var customData1 = "notUsed";
			var customData2 = i;
			var myCallback = "onclick_passiuCorrent(this)";
			r = doRect(mySVG, myX, lastY, columnWidth, 
				sectionHeight, fill,
				customData1, customData2, myCallback);
			//Add text
			var shortText = getShortenedVersion(text);
			if(shortText.length){
				printSectionsText(mySVG, myX, lastY, sectionHeight,
				shortText, val, myPassiu.corrent[i].value);
			}
			//loop increments
			lastY = lastY + sectionHeight;
			colorIdx++;
		}
	}	
	passiuCorrentLastY = lastY;
	drawAllBraces(mySVG);
	printAgregatedAmounts(mySVG);
	
}

//Returns rectangle with the specified input params
function doRect(mySVG, x, y, width, height, fill, 
				customData1, customData2, myCallback)
{
	var r = document.createElementNS(
		"http://www.w3.org/2000/svg",
	 	"rect");
	r.setAttribute("class", "BSSection");
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
	removeHighlight();
	obj.setAttribute("opacity", "0.25");
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt = notCurrent[idx].lineName;
	var val = notCurrent[idx].value;
	var percent = notCurrentPercent[idx].value;
	console.log(txt);
	var val2 = accounting.formatMoney(val, "", 0, ".", ",");
	percent = accounting.formatMoney(percent, "", 1, ".", ",");
	console.log( val2 + " " + percent + "%");
	displaySectionInfo(txt, val2, percent + "%");
	getShortenedVersion(txt);
}
function onclick_actiuCorrent(obj)
{
	removeHighlight();
	obj.setAttribute("opacity", "0.25");
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt = current[idx].lineName;
	var val = current[idx].value;
	var percent = currentPercent[idx].value;
	console.log(txt);
	var val2 = accounting.formatMoney(val, "", 0, ".", ",");
	percent = accounting.formatMoney(percent, "", 1, ".", ",");
	console.log( val2 + " " + percent + "%");
	displaySectionInfo(txt, val2, percent + "%");
	getShortenedVersion(txt);
}
function onclick_patrimoniNet(obj)
{
	removeHighlight();
	obj.setAttribute("opacity", "0.25");
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt = patrimoniNet[idx].lineName;
	var val = patrimoniNet[idx].value;
	var percent = patrimoniNetPercent[idx].value;
	console.log(txt);
	var val2 = accounting.formatMoney(val, "", 0, ".", ",");
	percent = accounting.formatMoney(percent, "", 1, ".", ",");
	console.log( val2 + " " + percent + "%");
	displaySectionInfo(txt, val2, percent + "%");
	getShortenedVersion(txt);
}
function onclick_passiuNoCorrent(obj)
{
	removeHighlight();
	obj.setAttribute("opacity", "0.25");
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt = passiuNoCorrent[idx].lineName;
	var val = passiuNoCorrent[idx].value;
	var percent = passiuNoCorrentPercent[idx].value;
	console.log(txt);
	var val2 = accounting.formatMoney(val, "", 0, ".", ",");
	percent = accounting.formatMoney(percent, "", 1, ".", ",");
	console.log( val2 + " " + percent + "%");
	displaySectionInfo(txt, val2, percent + "%");
	getShortenedVersion(txt);
}
function onclick_passiuCorrent(obj)
{
	removeHighlight();
	obj.setAttribute("opacity", "0.25");
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt = passiuCorrent[idx].lineName;
	var val = passiuCorrent[idx].value;
	var percent = passiuCorrentPercent[idx].value;
	console.log(txt);
	var val2 = accounting.formatMoney(val, "", 0, ".", ",");
	percent = accounting.formatMoney(percent, "", 1, ".", ",");
	console.log( val2 + " " + percent + "%");
	displaySectionInfo(txt, val2, percent + "%");
	getShortenedVersion(txt);
}

function displaySectionInfo(text, value, percentage)
{
   var container = document.getElementById("sectionInfo");
   
   //Remove all child nodes
	while(container.hasChildNodes()){
		container.removeChild(container.lastChild);
	}
	var para=document.createElement("p");
	para.textContent = text;
	container.appendChild(para);	
	var para=document.createElement("p");
	para.textContent = percentage;
	container.appendChild(para);	
	var para=document.createElement("p");
	para.textContent = value;
	container.appendChild(para);	
}

function removeHighlight()
{
	var container = document.getElementById("svgContainer");
	container = container.getElementsByTagName("svg");
	var childs = container[0].childNodes;
	for(var i = 0; i < childs.length; i++){
		childs[i].setAttribute("opacity", "1");
	}
}

function getShortenedVersion(inText)
{
	var emptyText = "";
	var tmpText = inText.toLowerCase();
	var myShorts = ["inmovilizado", "intangible", "existencias",
					"clientes", "financieros", "efectivo",
					"capital", "prima", "deuda", "proveedores" ];
	var myShortsCat =["Immobilitzat", "Intangible", "Existències",
					  "Clients", "Financers", "Efectiu",
					  "Capital", "Prima", "Deute", "Proveïdors"];
					
	for(var i = 0; i < myShorts.length; i++){
		if(tmpText.search(myShorts[i]) != -1){
			console.log("shortened: " + myShortsCat[i]);
			return myShortsCat[i];
		}
	}
	return emptyText;
}

function printSectionsText(mySVG, x, y, sectionHeight, text, text2, text3)
{
	var fontSize = 15; 	
	var font2Size = 15;
	var font2Margin = 5;
	if(sectionHeight < fontSize){
		return;
	}
	var t = document.createElementNS(
		"http://www.w3.org/2000/svg",
	 	"text");
	t.setAttribute("x", x + fontSize);
	t.setAttribute("y", y + fontSize);
	t.setAttribute("font-size", fontSize);
	t.setAttribute("fill", "black");
	t.setAttribute("pointer-events", "none"); //click passthrough
	t.textContent = text;
	mySVG.appendChild(t);	
	//Add the percent
	if(sectionHeight < (fontSize + font2Size + font2Margin) ){
		return;
	}
	var v = document.createElementNS(
		"http://www.w3.org/2000/svg",
	 	"text");
	v.setAttribute("x", x + fontSize);
	v.setAttribute("y", y + fontSize + font2Size + font2Margin);
	v.setAttribute("font-size", font2Size);
	v.setAttribute("fill", "black");
	v.setAttribute("pointer-events", "none"); //click passthrough
	var percentVal = accounting.formatMoney(text2, "", 1, ".", ",");
	v.textContent = percentVal + "%";
	mySVG.appendChild(v);	
	//Add the value
	if(sectionHeight < (fontSize + 2 * font2Size + 2 * font2Margin) ){
		return;
	}
	var w = document.createElementNS(
		"http://www.w3.org/2000/svg",
	 	"text");
	w.setAttribute("x", x + fontSize);
	w.setAttribute("y", y + fontSize + 2 * font2Size + font2Margin);
	w.setAttribute("font-size", font2Size);
	w.setAttribute("fill", "black");
	w.setAttribute("pointer-events", "none"); //click passthrough
	var currencyVal = accounting.formatMoney(text3, "", 0,
					 ".", ",");
	w.textContent = currencyVal;
	mySVG.appendChild(w);	

}

function drawAllBraces(mySVG)
{
	drawOpeningCurlyBrace(mySVG, 
		canvasSideExtraSize,
		actiuNoCorrentFirstY, 
		canvasSideExtraSize, 
		actiuNoCorrentLastY);
	drawOpeningCurlyBrace(mySVG, 
		canvasSideExtraSize,
		actiuCorrentFirstY, 
		canvasSideExtraSize, 
		actiuCorrentLastY);
	drawClosingCurlyBrace(mySVG, 
		canvasSideExtraSize + canvasWidth,
		patrimoniNetFirstY, 
		canvasSideExtraSize + canvasWidth, 
		patrimoniNetLastY);
	drawClosingCurlyBrace(mySVG, 
		canvasSideExtraSize + canvasWidth,
		passiuNoCorrentFirstY, 
		canvasSideExtraSize + canvasWidth, 
		passiuNoCorrentLastY);
	drawClosingCurlyBrace(mySVG, 
		canvasSideExtraSize + canvasWidth,
		passiuCorrentFirstY, 
		canvasSideExtraSize + canvasWidth, 
		passiuCorrentLastY);

}

function drawOpeningCurlyBrace(mySVG, startX, startY, endX, endY)
{
	var cp1X, cp1Y;
	var cp2X, cp2Y;
	var len = endY - startY;
	var halfLen = len / 2;
	var middleX;
	var middleY;
	
	middleX = startX - halfLen / 12;
	middleY = startY + halfLen;
	
	cp1X = startX - halfLen / 5;
	cp1Y = startY + halfLen / 7;
	cp2X = middleX + halfLen / 5;
	cp2Y = middleY - halfLen / 7; 
	
	var t = document.createElementNS(
		"http://www.w3.org/2000/svg",
	 	"path");
	var data = "M " + startX + " " + startY + " " + 
				"C" + " " +  cp1X + " " + cp1Y + 
				" " + cp2X + " " + cp2Y + " " 
				+ middleX + " " + middleY;  	
	t.setAttribute("d", data);
	t.setAttribute("stroke", "blue");
	t.setAttribute("stroke-width", 2);
	t.setAttribute("fill", "none");
	t.setAttribute("pointer-events", "none"); //click passthrough
	mySVG.appendChild(t);	

	cp1X = middleX + halfLen / 5;
	cp1Y = middleY + halfLen / 7;
	cp2X = endX - halfLen / 5;
	cp2Y = endY - halfLen / 7; 

	t = document.createElementNS(
		"http://www.w3.org/2000/svg",
	 	"path");
	data = "M " + middleX + " " + middleY + " " + 
				"C" + " " +  cp1X + " " + cp1Y + 
				" " + cp2X + " " + cp2Y + " " 
				+ endX + " " + endY;  	
	t.setAttribute("d", data);
	t.setAttribute("stroke", "blue");
	t.setAttribute("stroke-width", 2);
	t.setAttribute("fill", "none");
	t.setAttribute("pointer-events", "none"); //click passthrough
	mySVG.appendChild(t);	

}

function drawClosingCurlyBrace(mySVG, startX, startY, endX, endY)
{
	var cp1X, cp1Y;
	var cp2X, cp2Y;
	var len = endY - startY;
	var halfLen = len / 2;
	var middleX;
	var middleY;
	
	middleX = startX + halfLen / 12;
	middleY = startY + halfLen;
	
	//Que el text no solapi la punxa del brace
	if(middleX > closingBraceMaxX){
		closingBraceMaxX = middleX;
	}
	
	cp1X = startX + halfLen / 5;
	cp1Y = startY + halfLen / 7;
	cp2X = middleX - halfLen / 5;
	cp2Y = middleY - halfLen / 7; 
	
	var t = document.createElementNS(
		"http://www.w3.org/2000/svg",
	 	"path");
	var data = "M " + startX + " " + startY + " " + 
				"C" + " " +  cp1X + " " + cp1Y + 
				" " + cp2X + " " + cp2Y + " " 
				+ middleX + " " + middleY;  	
	t.setAttribute("d", data);
	t.setAttribute("stroke", "blue");
	t.setAttribute("stroke-width", 2);
	t.setAttribute("fill", "none");
	t.setAttribute("pointer-events", "none"); //click passthrough
	mySVG.appendChild(t);	

	cp1X = middleX - halfLen / 5;
	cp1Y = middleY + halfLen / 7;
	cp2X = endX + halfLen / 5;
	cp2Y = endY - halfLen / 7; 

	t = document.createElementNS(
		"http://www.w3.org/2000/svg",
	 	"path");
	data = "M " + middleX + " " + middleY + " " + 
				"C" + " " +  cp1X + " " + cp1Y + 
				" " + cp2X + " " + cp2Y + " " 
				+ endX + " " + endY;  	
	t.setAttribute("d", data);
	t.setAttribute("stroke", "blue");
	t.setAttribute("stroke-width", 2);
	t.setAttribute("fill", "none");
	t.setAttribute("pointer-events", "none"); //click passthrough
	mySVG.appendChild(t);	
}

function printAgregatedAmounts(mySVG)
{
	//Actiu no corrent
	var x, y, value;
	var fontSize = 15; 	
	var fontMargin = 5;
	x = fontMargin;
	y = (actiuNoCorrentLastY - actiuNoCorrentFirstY) / 2;
	val = accounting.formatMoney(
					totalActiuNoCorrent.toString(),
					 "", 0, ".", ",");
	printSVGText(mySVG, x, y, "ANC", fontSize);
	printSVGText(mySVG, x, y + fontSize, val, fontSize);
	
	//Actiu corrent
	x = fontMargin;
	y = actiuCorrentLastY - 
		(actiuCorrentLastY - actiuCorrentFirstY) / 2;
	val = accounting.formatMoney(
					totalActiuCorrent.toString(),
					 "", 0, ".", ",");
	printSVGText(mySVG, x, y, "AC", fontSize);
	printSVGText(mySVG, x, y + fontSize, val, fontSize);
					
	//Patrimoni Net
	x = closingBraceMaxX + fontMargin;
	y = (patrimoniNetLastY - patrimoniNetFirstY) / 2;
	val = accounting.formatMoney(
					totalPatrimoniNet.toString(),
					 "", 0, ".", ",");
	printSVGText(mySVG, x, y, "PN", fontSize);
	printSVGText(mySVG, x, y + fontSize, val, fontSize);

	//Passiu no corrent
	x = closingBraceMaxX + fontMargin;
	y = passiuNoCorrentFirstY + 
		(passiuNoCorrentLastY - passiuNoCorrentFirstY) / 2;
	val = accounting.formatMoney(
					totalPassiuNoCorrent.toString(),
					 "", 0, ".", ",");
	printSVGText(mySVG, x, y, "PNC", fontSize);
	printSVGText(mySVG, x, y + fontSize, val, fontSize);

	//Passiu corrent
	x = closingBraceMaxX + fontMargin;
	y = passiuCorrentFirstY + 
		(passiuCorrentLastY - passiuCorrentFirstY) / 2;
	val = accounting.formatMoney(
					totalPassiuCorrent.toString(),
					 "", 0, ".", ",");
	printSVGText(mySVG, x, y, "PC", fontSize);
	printSVGText(mySVG, x, y + fontSize, val, fontSize);
	
	//Passiu = Actiu = numero
	x = canvasSideExtraSize + fontSize;
	y = canvasHeight + fontSize;
	val = accounting.formatMoney(
					totalAssets.toString(),
					 "", 0, ".", ",");
	var val2 = "Passiu = Actiu = " + val;
	printSVGText(mySVG, x, y, val2, fontSize);
}

function printSVGText(mySVG, x, y, str, fontSize)
{
	var t = document.createElementNS(
		"http://www.w3.org/2000/svg",
	 	"text");
	t.setAttribute("x",x);
	t.setAttribute("y", y);
	t.setAttribute("font-size", fontSize);
	t.setAttribute("fill", "black");
	t.setAttribute("pointer-events", "none"); //click passthrough
	t.textContent = str;
	mySVG.appendChild(t);	
}

