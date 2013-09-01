
drop table cr;


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
	imputacion_subvenciones					numeric,
	excesos									numeric,
	deterioro								numeric,
	otros									numeric,
	
	resultado_explotacion					numeric,
	
	ingresos_financieros					numeric,
	gastos_financieros						numeric,
	variacion_de_valor						numeric,
	diferencias_de_cambio					numeric,
	deterioro_financiero					numeric,
	
	resultado_financiero					numeric,
	
	resultado_antes_impuestos				numeric,
	impuestos								numeric,
	
	resultado_operaciones_continuadas		numeric,
	
	resultado_operaciones_interrumpidas		numeric,
	
	resultado_ejercicio						numeric,
	
	beneficio_por_accion_basico				numeric,
	beneficio_por_accion_diluido			numeric
	
);


