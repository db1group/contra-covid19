CREATE EXTENSION IF NOT EXISTS "pgcrypto";

drop table IF EXISTS public."DmLocalizacao" CASCADE;

CREATE TABLE IF NOT EXISTS public."DmLocalizacao" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  bairro varchar(100) NOT NULL,
  cidade varchar(50) NOT NULL,
  estado varchar(2) NOT NULL,
  pais varchar(50) NOT NULL,
  CONSTRAINT "DmLocalizacao_pkey" PRIMARY KEY (id)
);

drop table IF EXISTS public."DmPaciente" CASCADE;

CREATE TABLE IF NOT EXISTS public."DmPaciente" (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	sexo varchar(1) NOT NULL,
	comorbidade bool NOT NULL DEFAULT false,
	faixaetaria varchar(10) NOT NULL,
	CONSTRAINT "DmPaciente_pkey" PRIMARY KEY (id)
);

drop table IF EXISTS public."FatoNotificacaoCovid19" CASCADE;

CREATE TABLE IF NOT EXISTS public."FatoNotificacaoCovid19" (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	dtfato date NULL,
	dmpacienteid uuid NULL,
	dmlocalizacaoid uuid NULL,
	qtsuspeito int4 NULL,
	qtsuspeitoisolamento int4 NULL,
	qtsuspeitoregular int4 NULL,
	qtsuspeitouti int4 NULL,
	qtencerrado int4 NULL,
	qtconfirmado int4 NULL,
	qtconfirmadoisolamento int4 NULL,
	qtconfirmadoregular int4 NULL,
	qtconfirmadouti int4 NULL,
	qtrecuperado int4 NULL,
	qtobito int4 NULL,
	CONSTRAINT "FatoNotificacaoCovid19_pkey" PRIMARY KEY (id),
	CONSTRAINT "FatoNotificacaoCovid19_dmpacienteid_fkey" FOREIGN KEY (dmpacienteid) REFERENCES "DmPaciente"(id) ON UPDATE CASCADE ON DELETE SET NULL
);

drop table IF EXISTS public."AprovacaoDado" CASCADE;

CREATE TABLE IF NOT EXISTS public."AprovacaoDado" (
	id serial NOT NULL,
	"data" date NULL,
	aprovado bool NULL DEFAULT false,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "AprovacaoDado_pkey" PRIMARY KEY (id)
);

drop function IF EXISTS public.faixaetaria CASCADE;

drop function IF EXISTS public.idadeatual CASCADE;

CREATE OR REPLACE FUNCTION public.idadeatual(datadenascimento date)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
begin
  return EXTRACT(YEAR FROM age(dataDeNascimento));
end; $function$
;

CREATE OR REPLACE FUNCTION public.faixaetaria(datadenascimento date)
 RETURNS character varying
 LANGUAGE plpgsql
AS $function$
declare
 idade integer;
begin
  idade := idadeAtual(dataDeNascimento);
  CASE
      WHEN idade BETWEEN 0 AND 13 THEN
          return '0 A 13';
      WHEN idade BETWEEN 14 AND 59 THEN
          return '14 A 59';
      WHEN idade BETWEEN 60 AND 74 THEN
          return '60 A 74';
      else
      	return '75 OU MAIS';
  END CASE;
end; $function$
;

drop function IF EXISTS public.temcomorbidade CASCADE;

CREATE OR REPLACE FUNCTION public.temcomorbidade(notificacao "NotificacaoCovid19")
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
begin
	if notificacao."doencaNeurologicaCronica" then
    	return true;
	elsif notificacao."doencaRenalCronica" then
    	return true;
    elsif notificacao."doencaHematologicaCronica" then
    	return true;
   	elsif notificacao."asma" then
    	return true;
    elsif notificacao."outraPneumopatiaCronica" then
    	return true;
    elsif notificacao."obesidade" then
    	return true;
    elsif notificacao."infeccaoHIV" then
    	return true;
   	elsif notificacao."tabagismo" then
    	return true;
    elsif notificacao."sindromeDeDown" then
    	return true;
    elsif notificacao."diabetesMellitus" then
    	return true;
    elsif notificacao."imunodeficiencia" then
    	return true;
    elsif notificacao."doencaCardioVascularCronica" then
    	return true;
    elsif notificacao."hipertensao" then
    	return true;
    elsif notificacao."neoplasia" then
    	return true;
    elsif notificacao."outrosComorbidades" is not null then
    	return true;
    else
	    return false;
	end if;
end; $function$
;

drop view IF EXISTS public.ultimaevolucao CASCADE;

CREATE OR REPLACE VIEW public.ultimaevolucao
AS SELECT ne."notificacaoId",
    ne."dtEvolucao"::date AS "dtEvolucao",
    ne."tpEvolucao",
    COALESCE(ne."tpLocal", 'ALTA_ISOLAMENTO_DOMICILIAR'::character varying) AS "tpLocal"
   FROM "NotificacaoEvolucao" ne
  WHERE ne.id = (( SELECT ne1.id
           FROM "NotificacaoEvolucao" ne1
          WHERE ne1."notificacaoId" = ne."notificacaoId"
          ORDER BY ne1."dtEvolucao" DESC
         LIMIT 1))
  GROUP BY ne."notificacaoId", ne."dtEvolucao", ne."tpEvolucao", ne."tpLocal";

drop view IF EXISTS public.vwfato CASCADE;

CREATE OR REPLACE VIEW public.vwfato
AS SELECT ne."dtEvolucao",
    dp.id AS dmpacienteid,
    p.sexo,
    temcomorbidade(nc.*) AS comorbidade,
    faixaetaria(p."dataDeNascimento") AS faixaetaria,
    dl.id AS dmlocalizacaoid,
    b.nome AS bairro,
    m.nome AS cidade,
    m.uf AS estado,
    'BRASIL'::text AS pais,
    count(nesusp.*) AS qtsuspeito,
    count(nesuspiso.*) AS qtsuspeitoisolamento,
    count(nesuspreg.*) AS qtsuspeitoregular,
    count(nesusputi.*) AS qtsuspeitouti,
    count(neencerrado.*) AS qtencerrado,
    count(neconfirmado.*) + count(nerecuperado.*) + count(neobito.*) AS qtconfirmado,
    count(neconfirmadoiso.*) AS qtconfirmadoiso,
    count(neconfirmadoreg.*) AS qtconfirmadoreg,
    count(neconfirmadouti.*) AS qtconfirmadouti,
    count(nerecuperado.*) AS qtrecuperado,
    count(neobito.*) AS qtobito
   FROM "Notificacao" n
     JOIN "NotificacaoCovid19" nc ON nc."notificacaoId" = n.id
     JOIN ultimaevolucao ne ON ne."notificacaoId" = n.id
     JOIN "Pessoa" p ON p.id = n."pessoaId"
     JOIN "Bairro" b ON b.id = p."bairroId"
     JOIN "Municipio" m ON m.id = b."municipioId"
     LEFT JOIN "DmPaciente" dp ON dp.sexo::text = p.sexo::text AND dp.comorbidade = temcomorbidade(nc.*) AND dp.faixaetaria::text = faixaetaria(p."dataDeNascimento")::text
     LEFT JOIN "DmLocalizacao" dl ON dl.bairro::text = b.nome::text AND dl.cidade::text = m.nome::text AND dl.estado::text = m.uf::text AND dl.pais::text = 'BRASIL'::text
     LEFT JOIN ultimaevolucao nesusp ON nesusp."notificacaoId" = n.id AND nesusp."dtEvolucao" = ne."dtEvolucao" AND nesusp."tpEvolucao"::text = 'SUSPEITO'::text
     LEFT JOIN ultimaevolucao nesuspiso ON nesuspiso."notificacaoId" = n.id AND nesuspiso."dtEvolucao" = ne."dtEvolucao" AND nesuspiso."tpEvolucao"::text = 'SUSPEITO'::text AND nesuspiso."tpLocal"::text = 'ALTA_ISOLAMENTO_DOMICILIAR'::text
     LEFT JOIN ultimaevolucao nesuspreg ON nesuspreg."notificacaoId" = n.id AND nesuspreg."dtEvolucao" = ne."dtEvolucao" AND nesuspreg."tpEvolucao"::text = 'SUSPEITO'::text AND nesuspreg."tpLocal"::text = 'INTERNAMENTO_LEITO_COMUM'::text
     LEFT JOIN ultimaevolucao nesusputi ON nesusputi."notificacaoId" = n.id AND nesusputi."dtEvolucao" = ne."dtEvolucao" AND nesusputi."tpEvolucao"::text = 'SUSPEITO'::text AND nesusputi."tpLocal"::text = 'INTERNAMENTO_LEITO_UTI'::text
     LEFT JOIN ultimaevolucao neencerrado ON neencerrado."notificacaoId" = n.id AND neencerrado."dtEvolucao" = ne."dtEvolucao" AND (neencerrado."tpEvolucao"::text = 'ENCERRADO'::text OR neencerrado."tpEvolucao"::text = 'DESCARTADO'::text)
     LEFT JOIN ultimaevolucao neconfirmado ON neconfirmado."notificacaoId" = n.id AND neconfirmado."dtEvolucao" = ne."dtEvolucao" AND neconfirmado."tpEvolucao"::text = 'CONFIRMADO'::text
     LEFT JOIN ultimaevolucao neconfirmadoiso ON neconfirmadoiso."notificacaoId" = n.id AND neconfirmadoiso."dtEvolucao" = ne."dtEvolucao" AND neconfirmadoiso."tpEvolucao"::text = 'CONFIRMADO'::text AND neconfirmadoiso."tpLocal"::text = 'ALTA_ISOLAMENTO_DOMICILIAR'::text
     LEFT JOIN ultimaevolucao neconfirmadoreg ON neconfirmadoreg."notificacaoId" = n.id AND neconfirmadoreg."dtEvolucao" = ne."dtEvolucao" AND neconfirmado."tpEvolucao"::text = 'CONFIRMADO'::text AND neconfirmado."tpLocal"::text = 'INTERNAMENTO_LEITO_COMUM'::text
     LEFT JOIN ultimaevolucao neconfirmadouti ON neconfirmadouti."notificacaoId" = n.id AND neconfirmadouti."dtEvolucao" = ne."dtEvolucao" AND neconfirmadouti."tpEvolucao"::text = 'CONFIRMADO'::text AND neconfirmadouti."tpLocal"::text = 'INTERNAMENTO_LEITO_UTI'::text
     LEFT JOIN ultimaevolucao nerecuperado ON nerecuperado."notificacaoId" = n.id AND nerecuperado."dtEvolucao" = ne."dtEvolucao" AND nerecuperado."tpEvolucao"::text = 'CURADO'::text
     LEFT JOIN ultimaevolucao neobito ON neobito."notificacaoId" = n.id AND neobito."dtEvolucao" = ne."dtEvolucao" AND neobito."tpEvolucao"::text = 'OBITO'::text
  GROUP BY ne."dtEvolucao", dp.id, p.sexo, (temcomorbidade(nc.*)), (faixaetaria(p."dataDeNascimento")), dl.id, b.nome, m.nome, m.uf, 'BRASIL'::text
  ORDER BY ne."dtEvolucao";

drop function IF EXISTS public.definirdimensaolocalizacao CASCADE;

CREATE OR REPLACE FUNCTION public.definirdimensaolocalizacao(fato vwfato)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
declare
localizacao "DmLocalizacao"%ROWTYPE;
localizacaoid uuid;
begin
   if fato.dmLocalizacaoId is not null then
		return fato.dmLocalizacaoId;
	end if;

	select * into localizacao from "DmLocalizacao" v where V.bairro = fato.bairro and v.cidade = fato.cidade and v.estado = fato.estado and v.pais = fato.pais;
	if found then
		return localizacao.id;
	end if;

	raise notice 'Inserindo DmLocalizacao: "%", "%", "%", "%"', fato.bairro, fato.cidade, fato.estado, fato.pais;
	insert into "DmLocalizacao" values (DEFAULT, fato.bairro, fato.cidade, fato.estado, fato.pais) returning id into localizacaoid;
	return localizacaoid;
end; $function$
;

drop function IF EXISTS public.definirdimensaopaciente CASCADE;

CREATE OR REPLACE FUNCTION public.definirdimensaopaciente(fato vwfato)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
declare
paciente "DmPaciente"%ROWTYPE;
pacienteid uuid;
begin
	if fato.dmPacienteId is not null then
		return fato.dmPacienteId;
	end if;

	select * into paciente from "DmPaciente" p where p.sexo = fato.sexo and p.comorbidade = fato.comorbidade and p.faixaEtaria = fato.faixaEtaria;
	if found then
		return paciente.id;
	end if;

	raise notice 'Inserindo DmPaciente: "%", "%", "%"', fato.sexo, fato.comorbidade, fato.faixaEtaria;
	insert into "DmPaciente" values (DEFAULT, fato.sexo, fato.comorbidade, fato.faixaEtaria) returning id into pacienteid;
	return pacienteid;
end; $function$
;

drop view IF EXISTS public.vwaprovacoes CASCADE;

CREATE OR REPLACE VIEW public.vwaprovacoes
AS SELECT u."dtEvolucao" AS dtaprovacao,
    COALESCE(a.aprovado, false) AS aprovado
   FROM ultimaevolucao u
     LEFT JOIN "AprovacaoDado" a ON a.data = u."dtEvolucao"
  GROUP BY u."dtEvolucao", a.aprovado;

drop view IF EXISTS public.obterboletim;

CREATE OR REPLACE FUNCTION public.obterboletim(databoletim timestamp with time zone)
 RETURNS TABLE(qtnotificados bigint, qtencerrado bigint, qtconfirmado bigint, qtconfirmadoisolamento bigint, qtconfirmadoregular bigint, qtconfirmadouti bigint, qtconfirmadoencerrado bigint, qtobito bigint, qtsuspeito bigint, qtsuspeitoisolamento bigint, qtsuspeitoregular bigint, qtsuspeitouti bigint)
 LANGUAGE plpgsql
AS $function$
begin
	return QUERY select sum(fnc.qtsuspeito) + sum(fnc.qtconfirmado) + sum(fnc.qtencerrado) as qtNotificados,
sum(fnc.qtencerrado) as qtEncerrado,
sum(fnc.qtconfirmado) as qtconfirmado,
sum(fnc.qtconfirmadoisolamento) as qtconfirmadoisolamento,
sum(fnc.qtconfirmadoregular) as qtconfirmadoregular,
sum(fnc.qtconfirmadouti) as qtconfirmadouti,
sum(fnc.qtrecuperado) as qtconfirmadoencerrado,
sum(fnc.qtobito) as qtobito,
sum(fnc.qtsuspeito) as qtsuspeito,
sum(fnc.qtsuspeitoisolamento) as qtsuspeitoisolamento,
sum(fnc.qtsuspeitoregular) as qtsuspeitoregular,
sum(fnc.qtsuspeitouti) as qtsuspeitouti
from "FatoNotificacaoCovid19" fnc
where fnc.dtfato <= cast(dataBoletim as date);
end; $function$
;

drop function IF EXISTS public.definirfato CASCADE;

CREATE OR REPLACE FUNCTION public.definirfato(dtfato timestamp with time zone)
 RETURNS SETOF vwfato
 LANGUAGE plpgsql
AS $function$
declare
	fato vwfato%ROWTYPE;
  pacienteid uuid;
  localizacaoid uuid;
  fatorec "FatoNotificacaoCovid19"%ROWTYPE;
begin
	for fato in select * from vwfato f where f."dtEvolucao" = cast(dtFato as date)
	loop
		select definirDimensaoPaciente(fato) into pacienteid;
		select definirDimensaoLocalizacao(fato) into localizacaoid;
		select * into fatorec from "FatoNotificacaoCovid19" fc where fc.dmpacienteid = pacienteid and fc.dmlocalizacaoid = localizacaoid;
		if not found then
     		raise notice 'Inserindo fato: %, %, %', fato, pacienteid, localizacaoid;
			insert into "FatoNotificacaoCovid19" values (DEFAULT,fato."dtEvolucao", pacienteid, localizacaoid, fato.qtsuspeito, fato.qtsuspeitoisolamento,
				fato.qtsuspeitoregular, fato.qtsuspeitouti, fato.qtencerrado, fato.qtconfirmado, fato.qtconfirmadoiso, fato.qtconfirmadoreg, fato.qtconfirmadouti,
				fato.qtrecuperado, fato.qtobito);
		end if;

		RETURN NEXT fato;
	end loop;
end; $function$
;

drop view IF EXISTS public.vwboletim CASCADE;

CREATE OR REPLACE VIEW public.vwboletim
AS SELECT v.dtaprovacao,
    v.aprovado,
    o.qtnotificados,
    o.qtencerrado,
    o.qtconfirmado,
    o.qtconfirmadoisolamento,
    o.qtconfirmadoregular,
    o.qtconfirmadouti,
    o.qtconfirmadoencerrado,
    o.qtobito,
    o.qtsuspeito,
    o.qtsuspeitoisolamento,
    o.qtsuspeitoregular,
    o.qtsuspeitouti
   FROM vwaprovacoes v,
    LATERAL obterboletim(v.dtaprovacao::timestamp with time zone) o(qtnotificados, qtencerrado, qtconfirmado, qtconfirmadoisolamento, qtconfirmadoregular, qtconfirmadouti, qtconfirmadoencerrado, qtobito, qtsuspeito, qtsuspeitoisolamento, qtsuspeitoregular, qtsuspeitouti);
