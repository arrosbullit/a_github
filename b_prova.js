#!/usr/bin/node
console.log("prova");

function  BSLine(lineName, value)
{
	this.lineName = lineName;
	this.value = value;
}

var balanceSheet = new Array();

balanceSheet.push(new BSLine("Inmovilizado material", 59783));
balanceSheet.push(new BSLine("Activos Intangibles", 144440));
balanceSheet.push(new BSLine("Inversiones en asociadas", 0));
balanceSheet.push(new BSLine("Activos por impuestos diferidos", 12324));
balanceSheet.push(new BSLine("Activos financieros disponibles para la venta", 0));
balanceSheet.push(new BSLine("Otros activos financieros no corrientes", 2332));

balanceSheet.push(new BSLine("Existencias", 55738));
balanceSheet.push(new BSLine("Clientes y otras cuentas a cobrar", 45285));
balanceSheet.push(new BSLine("Activos financieros disponibles para la venta", 15173));
balanceSheet.push(new BSLine("Activos a valor razonable con cambios en resultados", 0 ));

balanceSheet.push(new BSLine("Instrumentos financieros derivados", 0));
balanceSheet.push(new BSLine("Activos por impuestos corrientes", 6470));
balanceSheet.push(new BSLine("Otros activos financieros", 0));
balanceSheet.push(new BSLine("Otros activos corrientes", 343));
balanceSheet.push(new BSLine("Efectivo y equivalentes al efectivo", 9480 ));
balanceSheet.push(new BSLine("Activos del Grupo enajenable clasificados como mantenidos para la venta", 8680));

var totalActivo = 0;
for (var i = 0; i < balanceSheet.length; i++)
{
	tmp = balanceSheet[i];
	console.log(tmp.lineName + " " + tmp.value);
	if(!isNaN(tmp.value)){
		totalActivo = totalActivo + tmp.value;
	}
	
	console.log("Total activo " + totalActivo);
	
}
