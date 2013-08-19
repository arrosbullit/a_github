//onload = "BS.dibuixa()"
var BS = {
	notCurrent: [],
	current: [],
	totalActiuCorrent: 0,
	totalActiuNoCorrent: 0,
	
	//Vars per dibuixar els curly braces
	actiuNoCorrentFirstY: 0,
	actiuNoCorrentLastY: 0,
	
	actiuCorrentFirstY: 0,
	actiuCorrentLastY: 0,
	
	patrimoniNetFirstY: 0,
	patrimoniNetLastY: 0,
	
	passiuNoCorrentFirstY: 0,
	passiuNoCorrentLastY: 0,
	
	passiuCorrentFirstY: 0,
	passiuCorrentLastY: 0,
	
	closingBraceMaxX: 0,
	
	//Linies blanques que separen les coses
	liquidityLineSeparationWidth: 2,
	patrimoniNetSeparationWidth: 2,
	passiveLineSeparationWidth: 2,
	
	canvasHeight: 450,
	canvasWidth: 242,
	columnWidth: 0,
	canvasBottomExtraSize: 30,
	canvasTopExtraSize: 30,
	canvasSideExtraSize: 70,
	
	colorCodes: [],
	
	totalAssets: 0,
	totalActiuNoCorrent: 0,
	
	patrimoniNet: [],
	passiuNoCorrent: [],
	passiuCorrent: [],
	
	totalPatrimoniNet: 0,
	totalPassiuNoCorrent: 0,
	totalPassiuCorrent: 0,
	totalPassiu: 0,
		
//Funcions
	init: function()
	{
		console.log("BS.init()");
		
		this.columnWidth = (this.canvasWidth -
			this.passiveLineSeparationWidth)/2; 
		
		this.colorCodes.push("#00BB3F");
		this.colorCodes.push("#00A287");
		this.colorCodes.push("#1240AB");
		this.colorCodes.push("#4671D5");
		this.colorCodes.push("#6C8CD5");
		this.colorCodes.push("#06266F");
		this.colorCodes.push("#0776A0"); 
		this.colorCodes.push("#4711AE"); 
		this.colorCodes.push("#8805A8"); 
		
		this.fillBS();
		this.calcSumes();

	},
	
	BSLine: function(lineNameP, valueP)
	{
		return {
			lineName: lineNameP,
			value: valueP
		};
	},
	
	fillBS: function()
	{
		this.notCurrent.push(this.BSLine("Inmovilizado material", 59783));
		this.notCurrent.push(this.BSLine("Activos Intangibles", 144440));
		this.notCurrent.push(this.BSLine("Inversiones en asociadas", 0));
		this.notCurrent.push(this.BSLine("Activos por impuestos diferidos", 12324));
		this.notCurrent.push(this.BSLine("Activos financieros disponibles para la venta", 0));
		this.notCurrent.push(this.BSLine("Otros activos financieros no corrientes", 2332));
		
		this.current.push(this.BSLine("Existencias", 55738));
		this.current.push(this.BSLine("Clientes y otras cuentas a cobrar", 45285));
		this.current.push(this.BSLine("Activos financieros disponibles para la venta", 15173));
		this.current.push(this.BSLine("Activos a valor razonable con cambios en resultados", 0 ));
		this.current.push(this.BSLine("Instrumentos financieros derivados", 0));
		this.current.push(this.BSLine("Activos por impuestos corrientes", 6470));
		this.current.push(this.BSLine("Otros activos financieros", 0));
		this.current.push(this.BSLine("Otros activos corrientes", 343));
		this.current.push(this.BSLine("Efectivo y equivalentes al efectivo", 9480 ));
		this.current.push(this.BSLine("Activos del Grupo enajenable clasificados como mantenidos para la venta", 8680));
		

		this.patrimoniNet.push(this.BSLine("Capital ordinario", 56974));
		this.patrimoniNet.push(this.BSLine("Prima de emisión", 63432));
		this.patrimoniNet.push(this.BSLine("Participaciones no dominantes  - Otras reservas", 9608));

		this.passiuNoCorrent.push(this.BSLine("Deuda financiera", 141447));
		this.passiuNoCorrent.push(this.BSLine("Instrumentos financieros derivados", 5103));
		this.passiuNoCorrent.push(this.BSLine("Pasivos por impuestos diferidos", 3819));
		this.passiuNoCorrent.push(this.BSLine("Otros pasivos financieros", 8150));
		this.passiuNoCorrent.push(this.BSLine("Otros pasivos y subvenciones de capital", 1343));
		this.passiuNoCorrent.push(this.BSLine("Provisiones para otros pasivos y gastos", 2033));

		this.passiuCorrent.push(this.BSLine("Proveedores y otras cuentas a pagar", 42373));
		this.passiuCorrent.push(this.BSLine("Pasivos por impuestos corrientes", 7866));
		this.passiuCorrent.push(this.BSLine("Deuda financiera", 9058));
		this.passiuCorrent.push(this.BSLine("Instrumentos financieros derivados", 189));
		this.passiuCorrent.push(this.BSLine("Otros pasivos financieros", 670));
		this.passiuCorrent.push(this.BSLine("Provisiones para otros pasivos y gastos", 79));
		this.passiuCorrent.push(this.BSLine("Otros pasivos corrientes", 7904));
		this.passiuCorrent.push(this.BSLine("Pasivos del Grupo enajenable clasificados como mantenidos para la venta", 0));
		
		
	},
	
	calcSumes: function()
	{
		var tmp;
		//Suma l actiu no corrent
		for (var i = 0; i < this.notCurrent.length; i++)
		{
			tmp = this.notCurrent[i];
			if(!isNaN(tmp.value)){
				this.totalAssets = this.totalAssets + tmp.value;
				this.totalActiuNoCorrent += tmp.value;
			}
		}
		console.log("totalActiuNoCorrent " + this.totalActiuNoCorrent);
		//Suma l actiu corrent
		for (var i = 0; i < this.current.length; i++)
		{
			tmp = this.current[i];
			if(!isNaN(tmp.value)){
				this.totalAssets = this.totalAssets + tmp.value;
				this.totalActiuCorrent += tmp.value;
			}
		}	
		console.log("totalActiuCorrent " + this.totalActiuCorrent);
		console.log("totalAssets " + this.totalAssets);	
		//Suma tot el patrimoni net
		for (var i = 0; i < this.patrimoniNet.length; i++)
		{
			tmp = this.patrimoniNet[i];
			if(!isNaN(tmp.value)){
				this.totalPassiu = this.totalPassiu + tmp.value;
				this.totalPatrimoniNet += tmp.value;
			}
		}
		console.log("totalPatrimoniNet " + this.totalPatrimoniNet);
		
		//Suma el passiu no corrent
		for (var i = 0; i < this.passiuNoCorrent.length; i++)
		{
			tmp = this.passiuNoCorrent[i];
			if(!isNaN(tmp.value)){
				this.totalPassiu = this.totalPassiu + tmp.value;
				this.totalPassiuNoCorrent += tmp.value;
			}
		}
		console.log("totalPassiuNoCorrent " + this.totalPassiuNoCorrent);
		//Suma el passiu corrent
		for (var i = 0; i < this.passiuCorrent.length; i++)
		{
			tmp = this.passiuCorrent[i];
			if(!isNaN(tmp.value)){
				this.totalPassiu = this.totalPassiu + tmp.value;
				this.totalPassiuCorrent += tmp.value;
			}
		}	
		console.log("totalPassiuCorrent " + this.totalPassiuCorrent);
		console.log("totalPassiu "  + this.totalPassiu);
	},
	
 	dibuixa: function()
	{
		console.log("BS.dibuixa()");
		var container = document.getElementById("BSSVGContainer");
		var mySVG = document.createElementNS("http://www.w3.org/2000/svg",
		 "svg");
		mySVG.setAttribute("version", "1.2");
		mySVG.setAttribute("baseProfile", "tiny");
		var aux = this.canvasWidth + 2 * this.canvasSideExtraSize;
		mySVG.setAttribute("width", aux + "px");
		aux = this.canvasHeight + this.canvasTopExtraSize + this.canvasBottomExtraSize;
		mySVG.setAttribute("height", aux + "px");
		container.appendChild(mySVG);
	
		//Fes un rectangle  amb seccions de colors
		var myX = this.canvasSideExtraSize;
		var lastY = 0;
		this.actiuNoCorrentFirstY = 0;
		var colorIdx = 0;
		for(var i = 0; i < this.notCurrent.length; i++){	
			var val = 100 * (this.notCurrent[i].value / this.totalAssets);
			var text = this.notCurrent[i].lineName;
			if(val != 0 && isNaN(val) == false){
				var sectionHeight = (val / 100) * 
					(this.canvasHeight - this.liquidityLineSeparationWidth);
				var fill = this.colorCodes[colorIdx % this.colorCodes.length];
				var customData1 = "notused";
				var customData2 = i;
				var myCallback = "BS.onclick_actiuNoCorrent(this)";
				this.doRect(mySVG, myX, lastY, this.columnWidth, 
					sectionHeight, fill,
					customData1, customData2, myCallback);
				//Add text
				var shortText = this.getShortenedVersion(text);
				if(shortText.length){
					this.printSectionsText(mySVG, myX, lastY, sectionHeight,
						shortText, val, this.notCurrent[i].value);
				}
				//loop increments
				lastY = lastY + sectionHeight;
				colorIdx++;
			}
		}
		this.actiuNoCorrentLastY = lastY;
		//Draw line to separate non-current and current
		this.doRect(mySVG, myX, lastY, this.columnWidth, 
			lastY + this.liquidityLineSeparationWidth, "white");
		lastY = lastY + this.liquidityLineSeparationWidth;
	
		//Draw the current stuff
		this.actiuCorrentFirstY = lastY;
		for(var i = 0; i < this.current.length; i++){
			var val = 100 * (this.current[i].value / this.totalAssets);
			var text = this.current[i].lineName;
			if(val != 0 && isNaN(val) == false){
				var sectionHeight = (val / 100) * 
					(this.canvasHeight - this.liquidityLineSeparationWidth);
				var fill = this.colorCodes[colorIdx % this.colorCodes.length];
				var customData1 = "notused";
				var customData2 = i;
				var myCallback = "BS.onclick_actiuCorrent(this)";
				this.doRect(mySVG, myX, lastY, this.columnWidth, 
					sectionHeight, fill,
					customData1, customData2, myCallback);
				//Add text
				var shortText = this.getShortenedVersion(text);
				if(shortText.length){
					this.printSectionsText(mySVG, myX, lastY, sectionHeight,
						shortText, val, this.current[i].value);
				}
				//loop increments
				lastY = lastY + sectionHeight;
				colorIdx++;
			}
		}		
		this.actiuCorrentLastY = lastY;
		//Dibuixa els passius
		//Calculate percentages
		//Patrimoni net percentages
		//Fes un rectangle  amb seccions de colors	
		var availHeight = this.canvasHeight - this.liquidityLineSeparationWidth - 
							this.patrimoniNetSeparationWidth;
		myX = this.canvasSideExtraSize + this.columnWidth + 2;
		lastY = 0;
		this.patrimoniNetFirstY = 0;
		colorIdx = 0;
		//Dibuixa el patrimoni net
		for(var i = 0; i < this.patrimoniNet.length; i++){
			var val = 100 * (this.patrimoniNet[i].value / this.totalPassiu);
			var text = this.patrimoniNet[i].lineName;
			if(val != 0 && isNaN(val) == false){
				var sectionHeight = (val / 100) * availHeight;
				var fill = this.colorCodes[colorIdx % this.colorCodes.length];
				var customData1 = "notused";
				var customData2 = i;
				var myCallback = "BS.onclick_patrimoniNet(this)";
				this.doRect(mySVG, myX, lastY, this.columnWidth, 
					sectionHeight, fill,
					customData1, customData2, myCallback);
				//Add text
				var shortText = this.getShortenedVersion(text);
				if(shortText.length){
					this.printSectionsText(mySVG, myX, lastY, sectionHeight,
						shortText, val, this.patrimoniNet[i].value);
				}
				//loop increments
				lastY = lastY + sectionHeight;
				colorIdx++;
			}
		}
		this.patrimoniNetLastY = lastY;
		//Draw line to separate el patrimoni net
		this.doRect(mySVG, myX, lastY, this.columnWidth, 
			lastY + this.patrimoniNetSeparationWidth, "white");
		lastY = lastY + this.patrimoniNetSeparationWidth;	

		//Dibuixa el passiu no corrent
		this.passiuNoCorrentFirstY = lastY;
		for(var i = 0; i < this.passiuNoCorrent.length; i++){
			var text = this.passiuNoCorrent[i].lineName;
			var val = 100 * (this.passiuNoCorrent[i].value / this.totalPassiu);
			//console.log("passiu no corrent" + val);
			if(val != 0 && isNaN(val) == false){
				var sectionHeight = (val / 100) * availHeight;
				var fill = this.colorCodes[colorIdx % this.colorCodes.length];
				var customData1 = "notused";
				var customData2 = i;
				var myCallback = "BS.onclick_passiuNoCorrent(this)";
				this.doRect(mySVG, myX, lastY, this.columnWidth, 
					sectionHeight, fill,
					customData1, customData2, myCallback);
				//Add text
				var shortText = this.getShortenedVersion(text);
				if(shortText.length){
					this.printSectionsText(mySVG, myX, lastY, sectionHeight,
					shortText, val, this.passiuNoCorrent[i].value);
				}
				//loop increments
				lastY = lastY + sectionHeight;
				colorIdx++;
			}
		}
		this.passiuNoCorrentLastY = lastY;
		//Draw line to separate non-current and current
		this.doRect(mySVG, myX, lastY, this.columnWidth, 
			lastY + this.liquidityLineSeparationWidth, "white");
		lastY = lastY + this.liquidityLineSeparationWidth;	

		//Dibuixa el passiu  corrent
		this.passiuCorrentFirstY = lastY;
		for(var i = 0; i < this.passiuCorrent.length; i++){
			var val = 100 * (this.passiuCorrent[i].value / this.totalPassiu);
			var text = this.passiuCorrent[i].lineName;
			if(val != 0 && isNaN(val) == false){
				var sectionHeight = (val / 100) * availHeight;
				var fill = this.colorCodes[colorIdx % this.colorCodes.length];
				var customData1 = "notUsed";
				var customData2 = i;
				var myCallback = "BS.onclick_passiuCorrent(this)";
				this.doRect(mySVG, myX, lastY, this.columnWidth, 
					sectionHeight, fill,
					customData1, customData2, myCallback);
				//Add text
				var shortText = this.getShortenedVersion(text);
				if(shortText.length){
					this.printSectionsText(mySVG, myX, lastY, sectionHeight,
					shortText, val, this.passiuCorrent[i].value);
				}
				//loop increments
				lastY = lastY + sectionHeight;
				colorIdx++;
			}
		}	
		this.passiuCorrentLastY = lastY;
		this.drawAllBraces(mySVG);
		this.printAgregatedAmounts(mySVG);
	
	},
	
	//Returns rectangle with the specified input params
	doRect: function(mySVG, x, y, width, height, fill, 
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
	},

	onclick_actiuNoCorrent: function(obj)
	{
		this.removeHighlight();
		obj.setAttribute("opacity", "0.25");
		var idx = obj.getAttribute("data-arrayIdx");
		if(idx == null) idx = 0;
		var txt = this.notCurrent[idx].lineName;
		var val = this.notCurrent[idx].value;
		var percent = 100 * (val / this.totalAssets);
		console.log(txt);
		var val2 = accounting.formatMoney(val, "", 0, ".", ",");
		percent = accounting.formatMoney(percent, "", 1, ".", ",");
		console.log( val2 + " " + percent + "%");
		this.displaySectionInfo(txt, val2, percent + "%");
	},
	
	onclick_actiuCorrent: function(obj)
	{
		this.removeHighlight();
		obj.setAttribute("opacity", "0.25");
		var idx = obj.getAttribute("data-arrayIdx");
		if(idx == null) idx = 0;
		var txt = this.current[idx].lineName;
		var val = this.current[idx].value;
		var percent = 100 * (val / this.totalAssets);
		console.log(txt);
		var val2 = accounting.formatMoney(val, "", 0, ".", ",");
		percent = accounting.formatMoney(percent, "", 1, ".", ",");
		console.log( val2 + " " + percent + "%");
		this.displaySectionInfo(txt, val2, percent + "%");
	},
	
	onclick_patrimoniNet: function(obj)
	{
		this.removeHighlight();
		obj.setAttribute("opacity", "0.25");
		var idx = obj.getAttribute("data-arrayIdx");
		if(idx == null) idx = 0;
		var txt = this.patrimoniNet[idx].lineName;
		var val = this.patrimoniNet[idx].value;
		var percent = 100 * (val / this.totalAssets);
		console.log(txt);
		var val2 = accounting.formatMoney(val, "", 0, ".", ",");
		percent = accounting.formatMoney(percent, "", 1, ".", ",");
		console.log( val2 + " " + percent + "%");
		displaySectionInfo(txt, val2, percent + "%");
	},
	
	onclick_passiuNoCorrent: function(obj)
	{
		this.removeHighlight();
		obj.setAttribute("opacity", "0.25");
		var idx = obj.getAttribute("data-arrayIdx");
		if(idx == null) idx = 0;
		var txt = this.passiuNoCorrent[idx].lineName;
		var val = this.passiuNoCorrent[idx].value;
		var percent = 100 * ( val / this.totalAssets);
		console.log(txt);
		var val2 = accounting.formatMoney(val, "", 0, ".", ",");
		percent = accounting.formatMoney(percent, "", 1, ".", ",");
		console.log( val2 + " " + percent + "%");
		this.displaySectionInfo(txt, val2, percent + "%");
	},
	
	onclick_passiuCorrent: function(obj)
	{
		this.removeHighlight();
		obj.setAttribute("opacity", "0.25");
		var idx = obj.getAttribute("data-arrayIdx");
		if(idx == null) idx = 0;
		var txt = this.passiuCorrent[idx].lineName;
		var val = this.passiuCorrent[idx].value;
		var percent = 100 * ( val / this.totalAssets);
		console.log(txt);
		var val2 = accounting.formatMoney(val, "", 0, ".", ",");
		percent = accounting.formatMoney(percent, "", 1, ".", ",");
		console.log( val2 + " " + percent + "%");
		this.displaySectionInfo(txt, val2, percent + "%");
	},
	
	displaySectionInfo: function(text, value, percentage)
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
	},

	removeHighlight: function()
	{
		var container = document.getElementById("svgContainer");
		container = container.getElementsByTagName("svg");
		var childs = container[0].childNodes;
		for(var i = 0; i < childs.length; i++){
			childs[i].setAttribute("opacity", "1");
		}
	},

	getShortenedVersion: function(inText)
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
				//console.log("shortened: " + myShortsCat[i]);
				return myShortsCat[i];
			}
		}
		return emptyText;
	},

	printSectionsText: function(mySVG, x, y, sectionHeight, text, text2, text3)
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

	},

	drawAllBraces: function(mySVG)
	{
		this.drawOpeningCurlyBrace(mySVG, 
			this.canvasSideExtraSize,
			this.actiuNoCorrentFirstY, 
			this.canvasSideExtraSize, 
			this.actiuNoCorrentLastY);
		this.drawOpeningCurlyBrace(mySVG, 
			this.canvasSideExtraSize,
			this.actiuCorrentFirstY, 
			this.canvasSideExtraSize, 
			this.actiuCorrentLastY);
		this.drawClosingCurlyBrace(mySVG, 
			this.canvasSideExtraSize + this.canvasWidth,
			this.patrimoniNetFirstY, 
			this.canvasSideExtraSize + this.canvasWidth, 
			this.patrimoniNetLastY);
			
		this.drawClosingCurlyBrace(mySVG, 
			this.canvasSideExtraSize + this.canvasWidth,
			this.passiuNoCorrentFirstY, 
			this.canvasSideExtraSize + this.canvasWidth, 
			this.passiuNoCorrentLastY);
		this.drawClosingCurlyBrace(mySVG, 
			this.canvasSideExtraSize + this.canvasWidth,
			this.passiuCorrentFirstY, 
			this.canvasSideExtraSize + this.canvasWidth, 
			this.passiuCorrentLastY);

	},

	drawOpeningCurlyBrace: function(mySVG, startX, startY, endX, endY)
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

	},

	drawClosingCurlyBrace: function(mySVG, startX, startY, endX, endY)
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
		if(middleX > this.closingBraceMaxX){
			this.closingBraceMaxX = middleX;
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
	},

	printAgregatedAmounts: function(mySVG)
	{
		//Actiu no corrent
		var x, y, value;
		var fontSize = 15; 	
		var fontMargin = 5;
		x = fontMargin;
		y = (this.actiuNoCorrentLastY - this.actiuNoCorrentFirstY) / 2;
		val = accounting.formatMoney(
						this.totalActiuNoCorrent.toString(),
						 "", 0, ".", ",");
		this.printSVGText(mySVG, x, y, "ANC", fontSize);
		this.printSVGText(mySVG, x, y + fontSize, val, fontSize);
	
		//Actiu corrent
		x = fontMargin;
		y = this.actiuCorrentLastY - 
			(this.actiuCorrentLastY - this.actiuCorrentFirstY) / 2;
		val = accounting.formatMoney(
						this.totalActiuCorrent.toString(),
						 "", 0, ".", ",");
		this.printSVGText(mySVG, x, y, "AC", fontSize);
		this.printSVGText(mySVG, x, y + fontSize, val, fontSize);
					
		//Patrimoni Net
		x = this.closingBraceMaxX + fontMargin;
		y = (this.patrimoniNetLastY - this.patrimoniNetFirstY) / 2;
		val = accounting.formatMoney(
						this.totalPatrimoniNet.toString(),
						 "", 0, ".", ",");
		this.printSVGText(mySVG, x, y, "PN", fontSize);
		this.printSVGText(mySVG, x, y + fontSize, val, fontSize);

		//Passiu no corrent
		x = this.closingBraceMaxX + fontMargin;
		y = this.passiuNoCorrentFirstY + 
			(this.passiuNoCorrentLastY - this.passiuNoCorrentFirstY) / 2;
		val = accounting.formatMoney(
						this.totalPassiuNoCorrent.toString(),
						 "", 0, ".", ",");
		this.printSVGText(mySVG, x, y, "PNC", fontSize);
		this.printSVGText(mySVG, x, y + fontSize, val, fontSize);

		//Passiu corrent
		x = this.closingBraceMaxX + fontMargin;
		y = this.passiuCorrentFirstY + 
			(this.passiuCorrentLastY - this.passiuCorrentFirstY) / 2;
		val = accounting.formatMoney(
						this.totalPassiuCorrent.toString(),
						 "", 0, ".", ",");
		this.printSVGText(mySVG, x, y, "PC", fontSize);
		this.printSVGText(mySVG, x, y + fontSize, val, fontSize);
	
		//Passiu = Actiu = numero
		x = this.canvasSideExtraSize + fontSize;
		y = this.canvasHeight + fontSize;
		val = accounting.formatMoney(
						this.totalAssets.toString(),
						 "", 0, ".", ",");
		var val2 = "Passiu = Actiu = " + val;
		this.printSVGText(mySVG, x, y, val2, fontSize);
	},

	printSVGText: function(mySVG, x, y, str, fontSize)
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

};

BS.init();
