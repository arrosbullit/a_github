var beneficiNet = 0;

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

function  CRLine(lineName, value, resultFlagParam, titleFlag)
{
	this.lineName = lineName; //Text
	this.value = value; //Dinerets
	this.resultFlag = false; //Resultat o sumand
	if(resultFlagParam != null){
		this.resultFlag = resultFlagParam;
	}
	this.titleFlag = false; //Titol
	if(titleFlag != null){
		this.titleFlag = titleFlag;
	}
}

var CR = new Array();

CR.push(new CRLine("Actividades continuadas:", 0, false, true));
CR.push(new CRLine("Importe neto de la cifra de negocios", 88109));
//CR.push(new CRLine("Variación de existencias", 4235));
//CR.push(new CRLine("Aprovisionamientos", -55829));
CR.push(new CRLine("Consum", 4235 - 55829)); 
CR.push(new CRLine("Otros ingresos de explotación", 384));
CR.push(new CRLine("Gastos de personal", -14237));
CR.push(new CRLine("Dotación a la amortización", -2790));
CR.push(new CRLine("Otros gastos de explotación", -14950));
CR.push(new CRLine("Resultado de la enajenación de activos no corrientes", 47));
CR.push(new CRLine("Resultado por deterioro de activos no corrientes", 66));
CR.push(new CRLine("RESULTADO DE EXPLOTACIÓN", 0, true, false));

//Segon bloc
CR.push(new CRLine("Ingresos financieros", 110));
CR.push(new CRLine("Gastos financieros", -2692));
CR.push(new CRLine("Diferencias de cambio", -245));
CR.push(new CRLine("Deterioro y resustado por enajenanaciones de instrumentos financieros", 0));
CR.push(new CRLine("Deterioro y resultado por enajenaciones de activos no corrientes", 0));
CR.push(new CRLine("RESULTADO ANTES DE IMPUESTOS", 0, true, false));

CR.push(new CRLine("Impuestos sobre ganancias", -592));
CR.push(new CRLine("RESULTADO PROCEDENTE DE OPERACIONES CONTINUADAS", 0, true, false));

CR.push(new CRLine("Actividades interrumpidas:", 0, false ,true));
CR.push(new CRLine("Resultado del ejercicio de las actividades interrumpidas", -15));
CR.push(new CRLine("RESULTADO DEL EJERCICIO", 0, true, false));


//Calcula resultats parcials i resultat final
var resultatFinal = 0;
for(var i = 0; i < CR.length; i++){
	//console.log("i " + i);
	if(i >= CR.length ){
		break;
	}
	if(CR[i].resultFlag){
		CR[i].value = resultatFinal;
		console.log(CR[i].lineName + " " + i + " " + CR[i].value);
	}
	else if(!CR[i].titleFlag && !isNaN(CR[i].value)){
		resultatFinal += CR[i].value;
	}
}
console.log("Resultat " + resultatFinal);
beneficiNet = resultatFinal;

//Els ingressos normals seran la prmera linea que sigui un titol
var ingressosNormals = 0;
var ingressosNormalsIdx = 0;
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
console.log("ingressosNormals " + ingressosNormals);

//Calcula els altres ingressos 
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
			i != ingressosNormalsIdx)	//no es els ingresso normal
	{
		altresIngressos += CR[i].value;
		//console.log("Altres ingressos: " + CR[i].lineName);
	}
}
console.log("altresIngressos " + altresIngressos);

var ingressosTotals = ingressosNormals + altresIngressos;

console.log("ingressosTotals " + ingressosTotals);

function dibuixaCR()
{
	console.log("dibuixaCR()");
	var canvasHeight = 450;
	var canvasWidth =  242;
	var columnWidth = (canvasWidth)/2;
	var canvasBottomExtraSize = 30;
	var canvasSideExtraSize = 70;
	var colorIdx = 0;
	
	//Crea un element svg
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
	
	var myX = canvasSideExtraSize + columnWidth + 2;
	var myY = 0;
	var lastY = 0;
	var sectionHeight = (ingressosNormals / ingressosTotals) * canvasHeight;
	var fill = colorCodes[colorIdx % colorCodes.length];
	
	var customData1 = "notused";
	var customData2 = 0;
	var myCallback = "onclick_ingressos(this)";

	//Fes una columna de ingressos
	doRect(mySVG, myX, lastY, columnWidth, 
		sectionHeight, fill,
		customData1, customData2, myCallback);
		
	lastY = lastY + sectionHeight;
	
	//Fes una seccio d'altres ingressos
	colorIdx++;
	var sectionHeight = (altresIngressos / ingressosTotals) * canvasHeight;
	var fill = colorCodes[colorIdx % colorCodes.length];
	customData2 = 1;
	var myCallback = "onclick_ingressos(this)";
	myX = myX; //no canvia
	
	doRect(mySVG, myX, lastY, columnWidth, 
		sectionHeight, fill,
		customData1, customData2, myCallback);

	lastY = lastY + sectionHeight;	
	
	//Dibuixa els gastos
	myCallback = "onclick_gastos(this)";
	colorIdx = 0;
	lastY = 0;
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
		var sectionHeight = ((-1 * CR[i].value) / ingressosTotals) * canvasHeight;
		var fill = colorCodes[colorIdx % colorCodes.length];
		customData2 = i;
		myX = canvasSideExtraSize; 
		doRect(mySVG, myX, lastY, columnWidth, 
			sectionHeight, fill,
			customData1, customData2, myCallback);
		lastY = lastY + sectionHeight;
		colorIdx++;
	}	
	
	//Fes una seccio de benefici net
	var sectionHeight = (beneficiNet / ingressosTotals) * canvasHeight;
	var fill = "red";
	customData2 = CR.length - 1;
	myX = canvasSideExtraSize; //no canvia
	
	doRect(mySVG, myX, lastY, columnWidth, 
		sectionHeight, fill,
		customData1, customData2, myCallback);
	
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

function onclick_ingressos(obj)
{
	removeHighlight();
	obj.setAttribute("opacity", "0.25");
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt;
	var val;
	var percent;
	if(idx == 0){
		console.log("IngressosNormals " + ingressosNormals);
		txt = "Ingressos normals";
		val = ingressosNormals;
		percent = ingressosNormals * 100 / ingressosTotals;
	}
	else if(idx == 1){
		console.log("altresIngressos " + altresIngressos);
		txt = "Altres ingressos";
		val = altresIngressos;
		percent = altresIngressos * 100 / ingressosTotals;
	}
	var val2 = accounting.formatMoney(val, "", 0, ".", ",");
	percent = accounting.formatMoney(percent, "", 1, ".", ",");
	console.log( val2 + " " + percent + "%");
	displaySectionInfo(txt, val2, percent + "%");
}

function onclick_gastos(obj)
{
	removeHighlight();
	obj.setAttribute("opacity", "0.25");
	var idx = obj.getAttribute("data-arrayIdx");
	if(idx == null) idx = 0;
	var txt;
	var val;
	var percent;
	
	txt = CR[idx].lineName;
	val = CR[idx].value;
	percent = val * 100 / ingressosTotals;

	var val2 = accounting.formatMoney(val, "", 0, ".", ",");
	percent = accounting.formatMoney(percent, "", 1, ".", ",");
	console.log( val2 + " " + percent + "%");
	displaySectionInfo(txt, val2, percent + "%");
	
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
