--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: periode; Type: TYPE; Schema: public; Owner: robert
--

CREATE TYPE periode AS ENUM (
    'ANUAL',
    'PRIMER_TRIMESTRE',
    'SEGON_TRIMESTRE',
    'TERCER_TRIMESTRE',
    'QUART_TRIMESTRE',
    'PRIMER_SEMSTRE',
    'SEGON_SEMESTRE'
);


ALTER TYPE public.periode OWNER TO robert;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: bs; Type: TABLE; Schema: public; Owner: robert; Tablespace: 
--

CREATE TABLE bs (
    bs_key integer NOT NULL,
    company_id integer,
    unofficial_name character varying(100),
    year smallint,
    period periode,
    a_activo_no_corriente numeric,
    i_inmovilizado_intangible numeric,
    ii_inmovilizado_material numeric,
    iii_inversiones_inmobiliarias numeric,
    iv_inversiones_en_empresas_del_grupo numeric,
    v_inversiones_financieras_a_largo numeric,
    vi_activos_por_impuesto_diferido numeric,
    vii_otros_activos_no_corrientes numeric,
    b_activo_corriente numeric,
    i_activos_no_corrientes_para_la_venta numeric,
    ii_existencias numeric,
    iii_deudores_comerciales numeric,
    iv_inversiones_en_empresas_del_grupo_a_corto numeric,
    v_inversiones_financieras_a_corto numeric,
    vi_periodificaciones_a_corto numeric,
    vii_efectivo numeric,
    total_activo numeric,
    a_patrimonio_neto numeric,
    b_pasivo_no_corriente numeric,
    c_pasivo_corriente numeric,
    total_patrimonio_neto_y_pasivo numeric
);


ALTER TABLE public.bs OWNER TO robert;

--
-- Name: bs_bs_key_seq; Type: SEQUENCE; Schema: public; Owner: robert
--

CREATE SEQUENCE bs_bs_key_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bs_bs_key_seq OWNER TO robert;

--
-- Name: bs_bs_key_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robert
--

ALTER SEQUENCE bs_bs_key_seq OWNED BY bs.bs_key;


--
-- Name: bs_bs_key_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('bs_bs_key_seq', 1, true);


--
-- Name: cr; Type: TABLE; Schema: public; Owner: robert; Tablespace: 
--

CREATE TABLE cr (
    cr_key integer NOT NULL,
    company_id integer,
    unofficial_name character varying(100),
    year smallint,
    period periode,
    importe_neto numeric,
    variacion_existencias numeric,
    trabajos_realizados numeric,
    aprovisionamientos numeric,
    otros_ingresos numeric,
    gastos_personal numeric,
    gastos_explotacion numeric,
    amortizacion numeric,
    imputacion_subvenciones numeric,
    excesos numeric,
    deterioro numeric,
    otros numeric,
    resultado_explotacion numeric,
    ingresos_financieros numeric,
    gastos_financieros numeric,
    variacion_de_valor numeric,
    diferencias_de_cambio numeric,
    deterioro_financiero numeric,
    resultado_financiero numeric,
    resultado_antes_impuestos numeric,
    impuestos numeric,
    resultado_operaciones_continuadas numeric,
    resultado_operaciones_interrumpidas numeric,
    resultado_ejercicio numeric,
    beneficio_por_accion_basico numeric,
    beneficio_por_accion_diluido numeric
);


ALTER TABLE public.cr OWNER TO robert;

--
-- Name: cr_cr_key_seq; Type: SEQUENCE; Schema: public; Owner: robert
--

CREATE SEQUENCE cr_cr_key_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cr_cr_key_seq OWNER TO robert;

--
-- Name: cr_cr_key_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robert
--

ALTER SEQUENCE cr_cr_key_seq OWNED BY cr.cr_key;


--
-- Name: cr_cr_key_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('cr_cr_key_seq', 1, true);


--
-- Name: empresa; Type: TABLE; Schema: public; Owner: robert; Tablespace: 
--

CREATE TABLE empresa (
    empresa_key integer NOT NULL,
    name character varying(100),
    unofficial_name character varying(100)
);


ALTER TABLE public.empresa OWNER TO robert;

--
-- Name: empresa_empresa_key_seq; Type: SEQUENCE; Schema: public; Owner: robert
--

CREATE SEQUENCE empresa_empresa_key_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.empresa_empresa_key_seq OWNER TO robert;

--
-- Name: empresa_empresa_key_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robert
--

ALTER SEQUENCE empresa_empresa_key_seq OWNED BY empresa.empresa_key;


--
-- Name: empresa_empresa_key_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('empresa_empresa_key_seq', 1, false);


--
-- Name: bs_key; Type: DEFAULT; Schema: public; Owner: robert
--

ALTER TABLE ONLY bs ALTER COLUMN bs_key SET DEFAULT nextval('bs_bs_key_seq'::regclass);


--
-- Name: cr_key; Type: DEFAULT; Schema: public; Owner: robert
--

ALTER TABLE ONLY cr ALTER COLUMN cr_key SET DEFAULT nextval('cr_cr_key_seq'::regclass);


--
-- Name: empresa_key; Type: DEFAULT; Schema: public; Owner: robert
--

ALTER TABLE ONLY empresa ALTER COLUMN empresa_key SET DEFAULT nextval('empresa_empresa_key_seq'::regclass);


--
-- Data for Name: bs; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY bs (bs_key, company_id, unofficial_name, year, period, a_activo_no_corriente, i_inmovilizado_intangible, ii_inmovilizado_material, iii_inversiones_inmobiliarias, iv_inversiones_en_empresas_del_grupo, v_inversiones_financieras_a_largo, vi_activos_por_impuesto_diferido, vii_otros_activos_no_corrientes, b_activo_corriente, i_activos_no_corrientes_para_la_venta, ii_existencias, iii_deudores_comerciales, iv_inversiones_en_empresas_del_grupo_a_corto, v_inversiones_financieras_a_corto, vi_periodificaciones_a_corto, vii_efectivo, total_activo, a_patrimonio_neto, b_pasivo_no_corriente, c_pasivo_corriente, total_patrimonio_neto_y_pasivo) FROM stdin;
1	1	RONSA	2011	ANUAL	7943	0	638	5654	0	1573	78	0	3896	0	0	11	0	3771	0	114	11839	7791	3868	180	11839
\.


--
-- Data for Name: cr; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY cr (cr_key, company_id, unofficial_name, year, period, importe_neto, variacion_existencias, trabajos_realizados, aprovisionamientos, otros_ingresos, gastos_personal, gastos_explotacion, amortizacion, imputacion_subvenciones, excesos, deterioro, otros, resultado_explotacion, ingresos_financieros, gastos_financieros, variacion_de_valor, diferencias_de_cambio, deterioro_financiero, resultado_financiero, resultado_antes_impuestos, impuestos, resultado_operaciones_continuadas, resultado_operaciones_interrumpidas, resultado_ejercicio, beneficio_por_accion_basico, beneficio_por_accion_diluido) FROM stdin;
1	1	RONSA	2011	ANUAL	431	0	0	-41	0	-139	-61	-33	0	0	0	0	157	114	-47	-56	10	-49	-28	129	-7	122	0	122	12.32	0
\.


--
-- Data for Name: empresa; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY empresa (empresa_key, name, unofficial_name) FROM stdin;
1	RONSA	RONSA
2	COCACOLA	COCACOLA
\.


--
-- Name: bs_pkey; Type: CONSTRAINT; Schema: public; Owner: robert; Tablespace: 
--

ALTER TABLE ONLY bs
    ADD CONSTRAINT bs_pkey PRIMARY KEY (bs_key);


--
-- Name: cr_pkey; Type: CONSTRAINT; Schema: public; Owner: robert; Tablespace: 
--

ALTER TABLE ONLY cr
    ADD CONSTRAINT cr_pkey PRIMARY KEY (cr_key);


--
-- Name: empresa_pkey; Type: CONSTRAINT; Schema: public; Owner: robert; Tablespace: 
--

ALTER TABLE ONLY empresa
    ADD CONSTRAINT empresa_pkey PRIMARY KEY (empresa_key);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

