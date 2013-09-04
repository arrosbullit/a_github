var fs = require('fs');


var companyName = "RONSA";

var bs = {
	//BS_key	automatic field!
	
	company_id: 0,			
	unofficial_name: companyName,							
	year: 0,									
	period: "ANUAL",								
	
	A_activo_no_corriente: 0,				
	I_inmovilizado_intangible: 0,				
	II_inmovilizado_material: 0,				
	III_inversiones_inmobiliarias: 0,			
	IV_inversiones_en_empresas_del_grupo: 0, 	
	V_inversiones_financieras_a_largo: 0,		
	VI_activos_por_impuesto_diferido: 0,		
	VII_otros_activos_no_corrientes: 0,			

	B_activo_corriente: 0,						
	I_activos_no_corrientes_para_la_venta: 0,	
	II_existencias: 0,							
	III_deudores_comerciales: 0,				
	IV_inversiones_en_empresas_del_grupo_a_corto: 0,	
	V_inversiones_financieras_a_corto: 0,		
	VI_periodificaciones_a_corto: 0,			
	VII_efectivo: 0,							
	
	total_activo: 0,							
	
	
	A_patrimonio_neto: 0,						
	B_pasivo_no_corriente: 0,					
	C_pasivo_corriente: 0,						
	
	total_patrimonio_neto_y_pasivo: 0				

};

var cr = {

	//CR_key	serial primary key,  automatic field :D
	
	company_id: 0,
	unofficial_name: companyName,
	year: 0,
	period: "ANUAL",
	
	importe_neto:0,
	variacion_existencias:0,
	trabajos_realizados:0,
	aprovisionamientos:0,
	otros_ingresos:0,
	gastos_personal:0,
	gastos_explotacion:0,
	amortizacion:0,
	imputacion_subvenciones:0,
	excesos:0,
	deterioro:0,
	otros:0,
	
	resultado_explotacion:0,
	
	ingresos_financieros:0,
	gastos_financieros:0,
	variacion_de_valor:0,
	diferencias_de_cambio:0,
	deterioro_financiero:0,
	
	resultado_financiero:0,
	
	resultado_antes_impuestos:0,
	impuestos:0,
	
	resultado_operaciones_continuadas:0,
	
	resultado_operaciones_interrumpidas:0,
	
	resultado_ejercicio:0,
	
	beneficio_por_accion_basico:0,
	beneficio_por_accion_diluido:0	
	
};

function getNumProperties(anObject){
	var i = 0;
	for(properties in anObject){
		i++;
	}
	return i;
}

function prepareInsert(obj, tableName)
{
	fs.appendFileSync(filename, "INSERT INTO " + tableName + "\n");
	fs.appendFileSync(filename, "(\n");
	//The last property has not comma...
	var numProps = getNumProperties(obj);
	var i = 0;
	for(property in obj){
		i++;
		if(i != numProps){
			fs.appendFileSync(filename, property + ',\n');
		} else {
			fs.appendFileSync(filename, property + '\n');
		}
	}
	fs.appendFileSync(filename, ')\n');
	fs.appendFileSync(filename, '\n');
	fs.appendFileSync(filename, 'VALUES\n');
	fs.appendFileSync(filename, '(\n');
	i = 0;
	for(property in obj){
		i++;
		if(i != numProps){
			if(typeof obj[property] == 'string'){
				fs.appendFileSync(filename, "\'" + 
					obj[property] + "\'" + ',\n');
			} else {
				fs.appendFileSync(filename, obj[property] + ',\n');
			}
		} else {
			fs.appendFileSync(filename, obj[property] + '\n');
		}
	}
	fs.appendFileSync(filename, ');\n');
	fs.appendFileSync(filename, '\n');
}

var fs = require("fs");
var filename = "insert_" + companyName + ".sql";
//Create the file
fs.writeFileSync(filename, "");
prepareInsert(bs, "bs");
prepareInsert(cr, "cr");



