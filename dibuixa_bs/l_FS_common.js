/*
columnWidth: 0,
columnHeight: 0,
canvasTopEmptySpace: 0,
*/

var FSCommon = {
	canvasHeight: 492,
	canvasWidth: 352,
	canvasBottomTextSpace: 0,
	canvasTopTextSpace: 20,
	canvasSideExtraSize: 70,
	columnSeparationSize: 2,
	
	colorCodes: [],
	
//Functions
	init: function(){
		this.colorCodes.push("LightSeaGreen");
		this.colorCodes.push("PowderBlue");
		/*
		this.colorCodes.push("DarkTurquoise");
		this.colorCodes.push("DodgerBlue");
		this.colorCodes.push("LightBlue");
		*/
		
		/*
		this.colorCodes.push("#34D1B2");
		this.colorCodes.push("#00A287");
		this.colorCodes.push("#1240AB");
		this.colorCodes.push("#4671D5");
		this.colorCodes.push("#6C8CD5");
		this.colorCodes.push("#06266F");
		this.colorCodes.push("#0776A0"); 
		this.colorCodes.push("#4711AE"); 
		this.colorCodes.push("#8805A8"); 
		*/		
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
		t.setAttribute("stroke", "LightSlateGray");
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
		t.setAttribute("stroke", "LightSlateGray");
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
		t.setAttribute("stroke", "LightSlateGray");
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
		t.setAttribute("stroke", "LightSlateGray");
		t.setAttribute("stroke-width", 2);
		t.setAttribute("fill", "none");
		t.setAttribute("pointer-events", "none"); //click passthrough
		mySVG.appendChild(t);	
		
		return middleX;
	}

};




