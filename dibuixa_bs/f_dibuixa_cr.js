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

CR.push(new CRLine("Actividades continuadas:", 0, false, false));
CR.push(new CRLine("Importe neto de la cifra de negocios", 88109));
CR.push(new CRLine("Variación de existencias", 4235));
CR.push(new CRLine("Aprovisionamientos", -55829));
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
CR.push(new CRLine("RESULTADO DEL EJERCICIO", 0));


//Calcula resultats parcials i resultat final
var resultatFinal = 0;
for(var i = 0; i < CR.length; i++){
	//console.log("i " + i);
	if(i >= CR.length ){
		break;
	}
	if(CR[i].resultFlag){
		CR[i].value = resultatFinal;
		console.log(CR[i].lineName + " " + CR[i].value);
	}
	else if(!CR[i].titleFlag && !isNaN(CR[i].value)){
		resultatFinal += CR[i].value;
	}
}
console.log("Resultat " + resultatFinal);

function dibuixaCR()
{

}

