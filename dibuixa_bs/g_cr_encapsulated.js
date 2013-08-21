var CRE = {
	beneficiNet: 0,
	CR: [],
	resultatFinal: 0,
	ingressosNormals: 0,
	ingressosNormalsIdx: 0,
	ingressosTotals: 0,
	
	columnWidth: 0,
	columnHeight: 0,
	canvasTopEmptySpace: 0,
	
//Functions
	init: null,
	fillCRLines: null,
	doCRLine: null,
	calcResultatFinal: null,
	pickIngressosNormals: null,
	calcAltresIngressos: null,
	doRect: null,
	removeHighLight: null,
	displaySectionInfo: null,
	onclick_ingressos: null,
	onclick_gastos: null,
	printSectionsText: null,
	getShortenedVersion: null,
	dibuixaCR: null,
};

CRE.doCRLine = function(line, val, resFlag, titFlag){
	if(!resFlag){
		resFlag = false;
	} 
	if(!titFlag){
		titFlag = false;
	}
	return {
		lineName: line,
		value: val,
		resultFlag: resFlag,
		titleFlag: titFlag
	};
}
CRE.fillCRLines = function(){
	this.CR.push(this.doCRLine("Actividades continuadas:", 0, false, true));
	this.CR.push(this.doCRLine("Importe neto de la cifra de negocios", 88109));
	this.CR.push(this.doCRLine("Consum", 4235 - 55829));
	this.CR.push(this.doCRLine("Otros ingresos de explotación", 384));
	this.CR.push(this.doCRLine("Gastos de personal", -14237));
	this.CR.push(this.doCRLine("Dotación a la amortización", -2790));
	this.CR.push(this.doCRLine("Otros gastos de explotación", -14950));
	this.CR.push(this.doCRLine("Resultado de la enajenación de activos no corrientes", 47));
	this.CR.push(this.doCRLine("Resultado por deterioro de activos no corrientes", 66));
	this.CR.push(this.doCRLine("Ingresos financieros", 110));
	this.CR.push(this.doCRLine("Gastos financieros", -2692));
	this.CR.push(this.doCRLine("Diferencias de cambio", -245));
	this.CR.push(this.doCRLine("Deterioro y resustado por enajenanaciones de instrumentos financieros", 0));
	this.CR.push(this.doCRLine("Deterioro y resultado por enajenaciones de activos no corrientes", 0));
	this.CR.push(this.doCRLine("RESULTADO ANTES DE IMPUESTOS", 0, true, false));
	this.CR.push(this.doCRLine("Impuestos sobre ganancias", -592));
	this.CR.push(this.doCRLine("RESULTADO PROCEDENTE DE OPERACIONES CONTINUADAS", 0, true, false));
	this.CR.push(this.doCRLine("Actividades interrumpidas:", 0, false ,true));
	this.CR.push(this.doCRLine("Resultado del ejercicio de las actividades interrumpidas", -15));
	this.CR.push(this.doCRLine("RESULTADO DEL EJERCICIO", 0, true, false));
}

CRE.init = function()
{

	this.fillCRLines();
	this.resultatFinal = this.calcResultatFinal();
	this.beneficiNet = this.resultatFinal;
	var aux = this.pickIngressosNormals();
	this.ingressosNormals = aux[0];
	this.ingressosNormalsIdx = aux[1];
	this.altresIngressos = this.calcAltresIngressos();
	this.ingressosTotals = this.ingressosNormals + this.altresIngressos;
	
	
} 

CRE.calcResultatFinal = function()
{
	var CR = CRE.CR; //simplifica
	var resultat = 0;
	for(var i = 0; i < CR.length; i++){
		//console.log("i " + i);
		if(i >= CR.length ){
			break;
		}
		if(CR[i].resultFlag){
			CR[i].value = resultat;
			console.log(CR[i].lineName + " " + i + " " + CR[i].value);
		}
		else if(!CR[i].titleFlag && !isNaN(CR[i].value)){
			resultat += CR[i].value;
		}
	}
	return resultat;
}

CRE.pickIngressosNormals = function()
{
	var ingressosNormals = 0;
	var ingressosNormalsIdx = -1;
	var CR = CRE.CR; //simplifica
	for(var i = 0; i < CR.length; i++){
		//console.log("i " + i);
		if(i >= CR.length ){
			break;
		}
		if(CR[i].resultFlag || CR[i].titleFlag){
			//console.log("Result or title: " + CR[i].lineName);
			//nothing
		}
		else if(!isNaN(CR[i].value) && CR[i].value > 0){
			ingressosNormals = CR[i].value;
			ingressosNormalsIdx = i;
			break;
		}
	}
	console.log("ingressosNormals " + this.ingressosNormals);
	return [ingressosNormals, ingressosNormalsIdx];
}

CRE.calcAltresIngressos = function()
{
	var CR = CRE.CR; //simplifica
	var altresIngressos = 0;
	for(var i = 0; i < CR.length; i++){
		//console.log("i " + i);
		if(i >= CR.length ){
			break;
		}
		if(CR[i].resultFlag || CR[i].titleFlag){
			//nothing
		}
		else if(!isNaN(CR[i].value) && 		//es un num 
				CR[i].value > 0 &&			//mes gran que zero
				i != this.ingressosNormalsIdx)	//no es els ingresso normal
		{
			altresIngressos += CR[i].value;
			//console.log("Altres ingressos: " + CR[i].lineName);
		}
	}
	console.log("altresIngressos " + altresIngressos);
	return altresIngressos;
}

//Returns rectangle with the specified input params
CRE.doRect = function(mySVG, x, y, width, height, fill, 
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
CRE.removeHighlight = function()
{
	var container = document.getElementById("CRSVGContainer");
	container = container.getElementsByTagName("svg");
	var childs = container[0].childNodes;
	for(var i = 0; i < childs.length; i++){
		childs[i].setAttribute("opacity", "1");
	}
}

CRE.displaySectionInfo = function(text, value, percentage)
{
   var container = document.getElementById("CRSectionInfo");
   
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


CRE.onclick_ingressos =  function(obj)
{
	this.removeHighlight();
	obj.setAttribute("opacity", "0.25");
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt;
	var val;
	var percent;
	if(idx == 0){
		console.log("IngressosNormals " + this.ingressosNormals);
		txt = "Ingressos normals";
		val = this.ingressosNormals;
		percent = this.ingressosNormals * 100 / this.ingressosTotals;
	}
	else if(idx == 1){
		console.log("altresIngressos " + this.altresIngressos);
		txt = "Altres ingressos";
		val = this.altresIngressos;
		percent = this.altresIngressos * 100 / this.ingressosTotals;
	}
	var val2 = accounting.formatMoney(val, "", 0, ".", ",");
	percent = accounting.formatMoney(percent, "", 1, ".", ",");
	console.log( val2 + " " + percent + "%");
	this.displaySectionInfo(txt, val2, percent + "%");
}

CRE.onclick_gastos = function(obj)
{
	this.removeHighlight();
	obj.setAttribute("opacity", "0.25");
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt;
	var val;
	var percent;
	
	txt = this.CR[idx].lineName;
	val = this.CR[idx].value;
	percent = val * 100 / this.ingressosTotals;

	var val2 = accounting.formatMoney(val, "", 0, ".", ",");
	percent = accounting.formatMoney(percent, "", 1, ".", ",");
	console.log( val2 + " " + percent + "%");
	this.displaySectionInfo(txt, val2, percent + "%");
	
}


CRE.printSectionsText = function(mySVG, x, y, sectionHeight, text,
		 percentText, amountText)
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
	if(percentText != null){
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
		var percentVal = accounting.formatMoney(percentText, "", 1,
						 ".", ",");
		v.textContent = percentVal + "%";
		mySVG.appendChild(v);	
	}
	if(amountText != null){
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
		var currencyVal = accounting.formatMoney(amountText, "", 0,
						 ".", ",");
		w.textContent = currencyVal;
		mySVG.appendChild(w);	
	}

}

CRE.getShortenedVersion = function(inText)
{
	var emptyText = "";
	var tmpText = inText.toLowerCase();
	var myShorts = ["consum", "personal", "amortización",
					"otros", "financieros", "cambio",
					"enajenaciones", "impuestos"];
					
	var myShortsCat =["Consum", "Personal", "Amortització",
					  "Altres", "Financers", "Canvi divises",
					  "Enajenaciones", "Impostos"];
					
	for(var i = 0; i < myShorts.length; i++){
		if(tmpText.search(myShorts[i]) != -1){
			console.log("shortened: " + myShortsCat[i]);
			return myShortsCat[i];
		}
	}
	return emptyText;
}


CRE.dibuixaCR = function()
{
	console.log("dibuixaCR()");
		
	this.columnWidth = (FSCommon.canvasWidth - 
						FSCommon.columnSeparationSize -
						2 * FSCommon.canvasSideExtraSize) / 2;
	
	this.columnHeight = FSCommon.canvasHeight - 
						FSCommon.canvasBottomTextSpace -
						FSCommon.canvasTopTextSpace;
						
	this.canvasTopEmptySpace = 0;
						
	var colorIdx = 0;
	
	//Crea un element svg
    var container = document.getElementById("CRSVGContainer");
	var mySVG = document.createElementNS("http://www.w3.org/2000/svg",
	 "svg");
	mySVG.setAttribute("version", "1.2");
	mySVG.setAttribute("baseProfile", "tiny");
	var aux = FSCommon.canvasWidth;
	mySVG.setAttribute("width", aux + "px");
	aux = FSCommon.canvasHeight;
	mySVG.setAttribute("height", aux + "px");
	container.appendChild(mySVG);
	
	var myX = this.columnWidth + FSCommon.columnSeparationSize;
	var myY = FSCommon.canvasTopTextSpace + this.canvasTopEmptySpace;
	var lastY = myY;
	var perU = (this.ingressosNormals / this.ingressosTotals);
	var perCent = perU * 100;
	var sectionHeight = perU * this.columnHeight;
	var fill = FSCommon.colorCodes[colorIdx % FSCommon.colorCodes.length];
	
	var customData1 = "notused";
	var customData2 = 0;
	var myCallback = "CRE.onclick_ingressos(this)";

	//Fes titol ingressos
	//this.printSectionsText(mySVG, myX, lastY, this.canvasTopEmpySpace, 
	//	"Ingressos");		

	//Fes una columna de ingressos
	this.doRect(mySVG, myX, lastY, this.columnWidth, 
		sectionHeight, fill,
		customData1, customData2, myCallback);
		
	this.printSectionsText(mySVG, myX, lastY, sectionHeight, 
		"Ingressos", perCent, this.ingressosNormals);		
		
	lastY = lastY + sectionHeight;
	
	//Fes una seccio d'altres ingressos
	colorIdx++;
	perU = (this.altresIngressos / this.ingressosTotals);
	perCent = perU * 100;
	sectionHeight =  perU * this.columnHeight;
	fill = FSCommon.colorCodes[colorIdx % FSCommon.colorCodes.length];
	customData2 = 1;
	myCallback = "CRE.onclick_ingressos(this)";
	myX = myX; //no canvia
	
	this.doRect(mySVG, myX, lastY, this.columnWidth, 
		sectionHeight, fill,
		customData1, customData2, myCallback);

	this.printSectionsText(mySVG, myX, lastY, sectionHeight, 
		"Altres ingressos", perCent, this.altresIngressos);		

	lastY = lastY + sectionHeight;	
	
	//Fes titol despeses
	myX = 0; 
	
	//this.printSectionsText(mySVG, myX, 0, this.canvasTopEmpySpace, 
	//"Despeses");		
	
	lastY = FSCommon.canvasTopTextSpace + this.canvasTopEmptySpace;

	//Dibuixa els gastos
	myCallback = "CRE.onclick_gastos(this)";
	colorIdx = 0;
	var CR = this.CR;
	for(var i = 0; i < CR.length; i++){
		//console.log("i " + i);
		if(i >= CR.length ){
			break;
		}
		if(CR[i].resultFlag || CR[i].titleFlag){
			continue;
		}
		if(isNaN(CR[i].value) || 		//no es un num 
				CR[i].value >= 0){		//major o igual que zero
			continue;
		}
		console.log("Gasto " + CR[i].value);
		//Dibuixa aquest gasto
		var aux = -1 * CR[i].value; 
		perU = aux / this.ingressosTotals;
		perCent = perU * 100;
		sectionHeight = perU * this.columnHeight;
		fill = FSCommon.colorCodes[colorIdx % FSCommon.colorCodes.length];
		customData2 = i;
		
		this.doRect(mySVG, myX, lastY, this.columnWidth, 
			sectionHeight, fill,
			customData1, customData2, myCallback);
			
		var shortText = this.getShortenedVersion(CR[i].lineName);
		
		if(shortText.length){
			this.printSectionsText(mySVG, myX, lastY, sectionHeight, 
				shortText, perCent, aux);
			}		
			
		lastY = lastY + sectionHeight;
		colorIdx++;
	}	
	
	//Fes una seccio de benefici net
	var sectionHeight = (this.beneficiNet / this.ingressosTotals) *
						 this.columnHeight;
	var fill = "red";
	customData2 = CR.length - 1;
	myX = 0; //no canvia
	
	this.doRect(mySVG, myX, lastY, this.columnWidth, 
		sectionHeight, fill,
		customData1, customData2, myCallback);
		
	//Draw closing curly brace
	var startX = 2 * this.columnWidth + FSCommon.columnSeparationSize;
	var startY =  FSCommon.canvasTopTextSpace + this.canvasTopEmptySpace;
	var endX = startX;
	var endY = startY + this.columnHeight;
	var middleX;
	middleX = FSCommon.drawClosingCurlyBrace(mySVG, startX,
							 startY, endX, endY);
	var fontMargin = 3;
	var fontSize = 15;
	startX = middleX + fontMargin;
	startY = startY + (endY - startY) / 2;
	var val = accounting.formatMoney(
				this.ingressosTotals.toString(),
				 "", 0, ".", ",");	
	BS.printSVGText(mySVG, startX, startY, "Ingressos",
			 fontSize);
	BS.printSVGText(mySVG, startX, startY+ fontSize,
				 val, fontSize);
	
}


