var Ratios = {
	calcRotacio: function(){
		var aux = CRE.ingressosTotals /
			BS.totalActiuCorrent;
		aux =  accounting.formatMoney(
				aux.toString(),
				 "", 2, ".", ",");
		return [aux, "Rotació"];
	},
	
	calcDiesRotacio: function(){
		var aux =   (BS.totalActiuCorrent / 
			CRE.ingressosTotals) * 365;
		aux = accounting.formatMoney(
				aux.toString(),
				 "", 1, ".", ",");
		return [aux, "Dies rotació"];
	},
	
	calcRendibilitatV1: function(){
		var aux = 100 * CRE.beneficiNet / (BS.totalAssets - BS.totalPassiuCorrent);
		aux = accounting.formatMoney(
				aux.toString(),
				 "", 2, ".", ",");
		aux = aux + "%"
		return [aux, "Rendibilitat (1)"];
	},
	
	calcWorkingCapital: function(){
		var aux =   BS.totalActiuCorrent -
			BS.totalPassiuCorrent;
		aux = accounting.formatMoney(
				aux.toString(),
				 "", 0, ".", ",");
		return [aux, "Working capital"];
	},
	
	calcSolvencia: function(){
		var aux =   BS.totalActiuCorrent /
			 BS.totalPassiuCorrent;
		aux = accounting.formatMoney(
				aux.toString(),
				 "", 1, ".", ",");
		return [aux, "Solvència (AC/PC)"];
	},
	
	calcROE: function(){
		var aux =   100 * CRE.beneficiNet / BS.totalPatrimoniNet;
		aux = accounting.formatMoney(
				aux.toString(),
				 "", 2, ".", ",");
		aux = aux + "%";
		return [aux, "ROE"];
	},
	
	dibuixa: function(){
		var container = document.getElementById("ratios");
		var aux;
		var str = "";
		
		aux = this.calcRotacio();
		str = str  + "<p>" + aux[1] + ": ";
		str = str + aux[0] + "</p>" +"<br>";
		
		aux = this.calcDiesRotacio();
		str = str  + "<p>" + aux[1] + ": ";
		str = str + aux[0] + "</p>" +"<br>";

		aux = this.calcRendibilitatV1();
		str = str  + "<p>" + aux[1] + ": ";
		str = str + aux[0] + "</p>" +"<br>";

		aux = this.calcWorkingCapital();
		str = str  + "<p>" + aux[1] + ": ";
		str = str + aux[0] + "</p>" +"<br>";

		aux = this.calcSolvencia();
		str = str  + "<p>" + aux[1] + ": ";
		str = str + aux[0] + "</p>" +"<br>";

		aux = this.calcROE();
		str = str  + "<p>" + aux[1] + ": ";
		str = str + aux[0] + "</p>" +"<br>";
		
		container.innerHTML = str;
	}
};

