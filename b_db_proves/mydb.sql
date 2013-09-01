CREATE TABLE BS
(
	BS_key	serial primary key,
	
	A_activo_no_corriente					numeric,
	I_inmovilizado_intangible				numeric,
	II_inmovilizado_materiall				numeric,
	III_inversiones_inmobiliarias			numeric,
	IV_inversiones_en_empresas_del_grupo 	numeric,
	V_inversiones_financieras_a_largo		numeric,
	VI_activos_por_impuesto_diferido		numeric,

	B_activo_corriente						numeric,
	I_activos_no_corrientes_para_la_venta	numeric,
	II_existencias							numeric,
	III_deudores_comerciales				numeric,
	IV_inversiones_en_empresas_del_grupo	numeric,
	V_inversiones_financieras_a_corto		numeric,
	VI_periodificaciones_a_corto			numeric,
	VII_efectivo							numeric,
	
	A_patrimonio_neto						numeric,
	B_pasivo_no_corriente					numeric,
	C_pasivo_corriente						numeric
);
