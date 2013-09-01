
drop table bs;

drop type periode;

CREATE TYPE periode AS ENUM (
'ANUAL',
'PRIMER_TRIMESTRE',
'SEGON_TRIMESTRE',
'TERCER_TRIMESTRE',
'QUART_TRIMESTRE',
'PRIMER_SEMSTRE',
'SEGON_SEMESTRE');


CREATE TABLE BS
(
	BS_key	serial primary key,
	
	company_id								integer,
	unofficial_name							varchar(100),
	year									smallint,
	period									periode,
	
	A_activo_no_corriente					numeric,
	I_inmovilizado_intangible				numeric,
	II_inmovilizado_material				numeric,
	III_inversiones_inmobiliarias			numeric,
	IV_inversiones_en_empresas_del_grupo 	numeric,
	V_inversiones_financieras_a_largo		numeric,
	VI_activos_por_impuesto_diferido		numeric,
	VII_otros_activos_no_corrientes			numeric,

	B_activo_corriente						numeric,
	I_activos_no_corrientes_para_la_venta	numeric,
	II_existencias							numeric,
	III_deudores_comerciales				numeric,
	IV_inversiones_en_empresas_del_grupo_a_corto	numeric,
	V_inversiones_financieras_a_corto		numeric,
	VI_periodificaciones_a_corto			numeric,
	VII_efectivo							numeric,
	
	total_activo							numeric,
	
	
	A_patrimonio_neto						numeric,
	B_pasivo_no_corriente					numeric,
	C_pasivo_corriente						numeric,
	
	total_patrimonio_neto_y_pasivo			numeric
);


CREATE TABLE CR
(
	CR_key	serial primary key,
	
	company_id								integer,
	unofficial_name							varchar(100),
	year									smallint,
	period									periode,
	
	importe_neto							numeric,
	variacion_existencias					numeric,
	trabajos_realizados						numeric,
	aprovisionamientos						numeric,
	otros_ingresos							numeric,
	gastos_personal							numeric,
	gastos_explotacion						numeric,
	amortizacion							numeric,
	imputacion_subvenciones							numeric,
	excesos									numeric,
	deterioro								numeric,
	otros									numeric,
	
	resultado_explotacion					numeric,
	
	ingresos_financieros					numeric,
	gastos_financieros						numeric,
	variacion_de_valor						numeric,
	diferencias_de_cambio					numeric,
	deterioro								numeric,
	
	resultado_financiero					numeric,
	
	resultado_antes_impuestos				numeric,
	impuestos								numeric,
	
	resultado_operaciones_continuadas		numeric,
	
	resultado_operaciones_interrumpidas		numeric,
	
	resultado_ejercicio						numeric,
	
	beneficio_por_accion_basico				numeric,
	beneficio_por_accion_diluido			numeric
	
);


