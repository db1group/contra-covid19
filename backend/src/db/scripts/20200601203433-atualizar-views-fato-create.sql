CREATE INDEX IF NOT EXISTS idx_municipio_nome ON "Municipio"(nome);
CREATE INDEX IF NOT EXISTS idx_dmlocalizacao_cidade ON "DmLocalizacao"(cidade);
CREATE INDEX IF NOT EXISTS idx_notificacao_status ON "Notificacao"(status);
CREATE INDEX IF NOT EXISTS idx_notif_evolucao_createdat ON "NotificacaoEvolucao"("createdAt");
create index IF NOT EXISTS idx_notif_evolucao_dtfechamento ON "NotificacaoEvolucao"(dtfechamento);
create index IF NOT EXISTS idx_notif_covid19_datanotif ON "NotificacaoCovid19"("dataHoraNotificacao");
create index IF NOT EXISTS idx_aprovacao_data ON "AprovacaoDado"(data);
create index IF NOT EXISTS idx_aprovacao_aprovado ON "AprovacaoDado"(aprovado);
create index IF NOT EXISTS idx_fato_data ON "FatoNotificacaoCovid19"(dtfato);
create index IF NOT EXISTS idx_fato_pesquisa ON "FatoNotificacaoCovid19"(dtfato, dmpacienteid, dmlocalizacaoid);

CREATE OR REPLACE VIEW public.vwnotificalocalizacao
AS SELECT b.nome AS bairro,
    m.nome AS cidade,
    m.uf AS estado,
    'BRASIL'::text AS pais
   FROM "Notificacao" n
     JOIN "NotificacaoCovid19" nc ON nc."notificacaoId" = n.id
     JOIN "NotificacaoEvolucao" ne ON ne."notificacaoId" = n.id
     JOIN "Pessoa" p ON p.id = n."pessoaId"
     JOIN "Bairro" b ON b.id = p."bairroId"
     JOIN "Municipio" m ON m.id = b."municipioId"
  GROUP BY b.nome, m.nome, m.uf, 'BRASIL'::text
  ORDER BY m.uf, m.nome, b.nome;

CREATE OR REPLACE VIEW public.vwlocalizacaopaciente
AS SELECT n.id AS "notificacaoId",
    dl.id AS dmlocalizacaoid,
    b.nome AS bairro,
    m.nome AS cidade,
    m.uf AS estado,
    'BRASIL'::text AS pais
   FROM "Notificacao" n
     JOIN "Pessoa" p ON p.id = n."pessoaId"
     JOIN "Bairro" b ON b.id = p."bairroId"
     JOIN "Municipio" m ON m.id = b."municipioId"
     LEFT JOIN "DmLocalizacao" dl ON dl.bairro::text = b.nome::text AND dl.cidade::text = m.nome::text AND dl.estado::text = m.uf::text AND dl.pais::text = 'BRASIL'::text
  WHERE n.status::text <> 'EXCLUIDA'::text;

CREATE OR REPLACE VIEW public.vwnotificapaciente
AS SELECT p.sexo,
    temcomorbidade(nc.*) AS comorbidade,
    faixaetaria(p."dataDeNascimento") AS faixaetaria
   FROM "Notificacao" n
     JOIN "NotificacaoCovid19" nc ON nc."notificacaoId" = n.id
     JOIN "NotificacaoEvolucao" ne ON ne."notificacaoId" = n.id
     JOIN "Pessoa" p ON p.id = n."pessoaId"
  GROUP BY p.sexo, (temcomorbidade(nc.*)), (faixaetaria(p."dataDeNascimento"));

CREATE OR REPLACE VIEW public.vwperfilpaciente
AS SELECT n.id AS "notificacaoId",
    dp.id AS dmpacienteid,
    p.sexo,
    temcomorbidade(nc.*) AS comorbidade,
    faixaetaria(p."dataDeNascimento") AS faixaetaria
   FROM "Notificacao" n
     JOIN "NotificacaoCovid19" nc ON nc."notificacaoId" = n.id
     JOIN "Pessoa" p ON p.id = n."pessoaId"
     LEFT JOIN "DmPaciente" dp ON dp.sexo::text = p.sexo::text AND dp.comorbidade = temcomorbidade(nc.*) AND dp.faixaetaria::text = faixaetaria(p."dataDeNascimento")::text
  WHERE n.status::text <> 'EXCLUIDA'::text;

CREATE OR REPLACE VIEW public.vwevolucaofechamento
AS SELECT ne."tpEvolucao",
    count(1) AS total
   FROM "Notificacao" n
     JOIN "NotificacaoEvolucao" ne ON ne."notificacaoId" = n.id
     JOIN "Pessoa" p ON p.id = n."pessoaId"
     JOIN "Municipio" m ON m.id = p."municipioId"
  WHERE n.status::text <> 'EXCLUIDA'::text AND ne.dtfechamento IS NULL AND m.nome::text = 'MARINGA - PR'::text
  GROUP BY ne."tpEvolucao"
UNION ALL
 SELECT ne0."tpEvolucao",
    0 AS total
   FROM "NotificacaoEvolucao" ne0
  WHERE NOT (ne0."tpEvolucao"::text IN ( SELECT ne."tpEvolucao"
           FROM "Notificacao" n
             JOIN "NotificacaoEvolucao" ne ON ne."notificacaoId" = n.id
             JOIN "Pessoa" p ON p.id = n."pessoaId"
             JOIN "Municipio" m ON m.id = p."municipioId"
          WHERE n.status::text <> 'EXCLUIDA'::text AND ne.dtfechamento IS NULL AND m.nome::text = 'MARINGA - PR'::text
          GROUP BY ne."tpEvolucao"))
  GROUP BY ne0."tpEvolucao";

drop function IF EXISTS public.obterboletimdia cascade;

CREATE OR REPLACE FUNCTION public.obterboletimdia(databoletim timestamp with time zone)
 RETURNS TABLE(qtnotificado bigint, qtencerrado bigint, qtconfirmado bigint, qtconfirmadoisolamento bigint, qtconfirmadoregular bigint, qtconfirmadouti bigint, qtconfirmadoencerrado bigint, qtobito bigint, qtsuspeitoisolamento bigint, qtsuspeitoregular bigint, qtsuspeitouti bigint, qtdescartado bigint)
 LANGUAGE plpgsql
AS $function$
begin
	return QUERY select sum(fnc.qtsuspeito) as qtNotificado,
sum(fnc.qtencerrado) as qtEncerrado,
sum(fnc.qtconfirmado) as qtconfirmado,
sum(fnc.qtconfirmadoisolamento) as qtconfirmadoisolamento,
sum(fnc.qtconfirmadoregular) as qtconfirmadoregular,
sum(fnc.qtconfirmadouti) as qtconfirmadouti,
sum(fnc.qtrecuperado) as qtconfirmadoencerrado,
sum(fnc.qtobito) as qtobito,
sum(fnc.qtsuspeitoisolamento) as qtsuspeitoisolamento,
sum(fnc.qtsuspeitoregular) as qtsuspeitoregular,
sum(fnc.qtsuspeitouti) as qtsuspeitouti,
sum(fnc.qtdescartado) as qtdescartado
from "FatoNotificacaoCovid19" fnc
join "DmLocalizacao" dl on dl.id = fnc.dmlocalizacaoid
where dl.cidade = 'MARINGA - PR' and fnc.dtfato = cast(dataBoletim as date);
end; $function$
;

drop function IF EXISTS public.obterboletim cascade;

CREATE OR REPLACE FUNCTION public.obterboletim(databoletim timestamp with time zone)
 RETURNS TABLE(qtnotificado bigint, qtencerrado bigint, qtconfirmado bigint, qtconfirmadoisolamento bigint, qtconfirmadoregular bigint, qtconfirmadouti bigint, qtconfirmadoencerrado bigint, qtobito bigint, qtacompanhamento numeric, qtenfermaria numeric, qtinternadouti numeric, qtsuspeitoobito numeric, qtdescartado bigint)
 LANGUAGE plpgsql
AS $function$
begin
	return QUERY select sum(fnc.qtsuspeito) as qtnotificado,
sum(fnc.qtencerrado) as qtencerrado,
sum(fnc.qtconfirmado) as qtconfirmado,
sum(fnc.qtconfirmadoisolamento) as qtconfirmadoisolamento,
sum(fnc.qtconfirmadoregular) as qtconfirmadoregular,
sum(fnc.qtconfirmadouti) as qtconfirmadouti,
sum(fnc.qtrecuperado) as qtconfirmadoencerrado,
sum(fnc.qtobito) as qtobito,
(select sum(acompanhamentosuspeitos.qtisolamento) from acompanhamentoSuspeitos(dataBoletim::date)) as qtsuspeitoisolamento,
(select sum(acompanhamentosuspeitos.qtenfermaria) from acompanhamentoSuspeitos(dataBoletim::date)) as qtsuspeitoregular,
(select sum(acompanhamentosuspeitos.qtuti) from acompanhamentoSuspeitos(dataBoletim::date)) as qtsuspeitouti,
(select sum(acompanhamentosuspeitos.qtobito) from acompanhamentoSuspeitos(dataBoletim::date)) as qtsuspeitoobito,
sum(fnc.qtdescartado) as qtdescartado
from "FatoNotificacaoCovid19" fnc
join "DmLocalizacao" dl on dl.id = fnc.dmlocalizacaoid
where dl.cidade = 'MARINGA - PR' and fnc.dtfato::date <= dataBoletim::date;
end; $function$
;

CREATE OR REPLACE VIEW public.vwboletimacumulado
AS SELECT v.dtaprovacao,
    v.aprovado,
    COALESCE(o.qtnotificado, 0::bigint) AS qtnotificado,
    COALESCE(o.qtencerrado, 0::bigint) AS qtencerrado,
    COALESCE(o.qtconfirmado, 0::bigint) AS qtconfirmado,
    COALESCE(o.qtconfirmadoisolamento, 0::bigint) AS qtconfirmadoisolamento,
    COALESCE(o.qtconfirmadoregular, 0::bigint) AS qtconfirmadoregular,
    COALESCE(o.qtconfirmadouti, 0::bigint) AS qtconfirmadouti,
    COALESCE(o.qtconfirmadoencerrado, 0::bigint) AS qtconfirmadoencerrado,
    COALESCE(o.qtobito, 0::bigint) AS qtobito,
    COALESCE(o.qtacompanhamento, 0::numeric) AS qtacompanhamento,
    COALESCE(o.qtenfermaria, 0::numeric) AS qtenfermaria,
    COALESCE(o.qttui, 0::numeric) AS qttui,
    COALESCE(o.qtsuspeitoobito, 0::numeric) AS qtsuspeitoobito,
	COALESCE(o.qtdescartado, 0::numeric) AS qtdescartado
   FROM vwaprovacoes v,
    LATERAL obterboletim(v.dtaprovacao::timestamp with time zone) o(qtnotificado, qtencerrado, qtconfirmado, qtconfirmadoisolamento, qtconfirmadoregular, qtconfirmadouti, qtconfirmadoencerrado, qtobito, qtacompanhamento, qtenfermaria, qttui, qtsuspeitoobito);

CREATE OR REPLACE VIEW public.vwboletimdia
AS SELECT v.dtaprovacao,
    v.aprovado,
    COALESCE(o.qtnotificado, 0::bigint) AS qtnotificado,
    COALESCE(o.qtencerrado, 0::bigint) AS qtencerrado,
    COALESCE(o.qtconfirmado, 0::bigint) AS qtconfirmado,
    COALESCE(o.qtconfirmadoisolamento, 0::bigint) AS qtconfirmadoisolamento,
    COALESCE(o.qtconfirmadoregular, 0::bigint) AS qtconfirmadoregular,
    COALESCE(o.qtconfirmadouti, 0::bigint) AS qtconfirmadouti,
    COALESCE(o.qtconfirmadoencerrado, 0::bigint) AS qtconfirmadoencerrado,
    COALESCE(o.qtobito, 0::bigint) AS qtobito,
    COALESCE(o.qtacompanhamento, 0::bigint) AS qtacompanhamento,
    COALESCE(o.qtenfermaria, 0::bigint) AS qtenfermaria,
    COALESCE(o.qttui, 0::bigint) AS qttui,
	COALESCE(o.qtdescartado, 0::numeric) AS qtdescartado
   FROM vwaprovacoes v,
    LATERAL obterboletimdia(v.dtaprovacao::timestamp with time zone) o(qtnotificado, qtencerrado, qtconfirmado, qtconfirmadoisolamento, qtconfirmadoregular, qtconfirmadouti, qtconfirmadoencerrado, qtobito, qtacompanhamento, qtenfermaria, qttui);


CREATE OR REPLACE VIEW public.vwboletimdiario
AS SELECT v.dtaprovacao,
    v.qtnotificado AS suspeito,
    v.qtencerrado AS encerrado,
    v.qtconfirmado AS confirmado,
    v.qtconfirmadoencerrado AS recuperado,
    v.qtobito AS obito,
	v.qtdescartado as descartado
   FROM vwboletimdia v
  WHERE v.dtaprovacao >= '2020-05-19'::date AND v.aprovado = true;

CREATE OR REPLACE VIEW public.vwboletimresumido
AS SELECT v.dtaprovacao,
    v.qtnotificado AS suspeito,
    v.qtencerrado AS encerrado,
    v.qtconfirmado AS confirmado,
    v.qtconfirmadoencerrado AS recuperado,
    v.qtobito AS obito,
	v.qtdescartado as descartado
   FROM vwboletimacumulado v
  WHERE v.dtaprovacao >= '2020-05-18'::date AND v.aprovado = true;

CREATE OR REPLACE VIEW public.vwboletimtotal
AS SELECT v.dtaprovacao,
    v.qtnotificado AS suspeito,
    v.qtencerrado AS encerrado,
    v.qtconfirmado AS confirmado,
    v.qtconfirmadoencerrado AS recuperado,
    v.qtobito AS obito,
	v.qtdescartado as descartado
   FROM vwboletimacumulado v
  WHERE v.aprovado = true
  ORDER BY v.dtaprovacao DESC
 LIMIT 1;

CREATE OR REPLACE FUNCTION public.definirdimensaolocalizacao()
 RETURNS SETOF vwnotificalocalizacao
 LANGUAGE plpgsql
AS $function$
declare
localizacao public.vwNotificaLocalizacao%ROWTYPE;
begin
	truncate table "DmLocalizacao" cascade;

	for localizacao in select * from public.vwNotificaLocalizacao
	loop
		raise notice 'Inserindo DmLocalizacao: "%", "%", "%", "%"', localizacao.bairro, localizacao.cidade, localizacao.estado, localizacao.pais;
		insert into "DmLocalizacao" values (DEFAULT, localizacao.bairro, localizacao.cidade, localizacao.estado, localizacao.pais);
		RETURN NEXT localizacao;
	end loop;
end; $function$
;

CREATE OR REPLACE FUNCTION public.definirdimensaolocalizacao(notificacao uuid)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
declare
localizacao vwlocalizacaopaciente%ROWTYPE;
localizacaoid uuid;
begin
	select * into localizacao from vwLocalizacaoPaciente lp where lp."notificacaoId" = notificacao;
	if localizacao.dmlocalizacaoid is not null then
		return localizacao.dmlocalizacaoid;
	end if;

	raise notice 'Inserindo DmLocalizacao: "%", "%", "%", "%"', localizacao.bairro, localizacao.cidade, localizacao.estado, localizacao.pais;
	insert into "DmLocalizacao" values (DEFAULT, localizacao.bairro, localizacao.cidade, localizacao.estado, localizacao.pais) returning id into localizacaoid;
	return localizacaoid;
end; $function$
;

CREATE OR REPLACE FUNCTION public.definirdimensaopaciente(notificacao uuid)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
declare
paciente vwperfilpaciente%ROWTYPE;
pacienteId uuid;
begin
	select * into paciente from vwperfilpaciente pp where pp."notificacaoId" = notificacao;
	if paciente.dmpacienteid is not null then
		return paciente.dmpacienteid;
	end if;

	raise notice 'Inserindo DmPaciente: "%", "%", "%"', paciente.sexo, paciente.comorbidade, paciente.faixaEtaria;
	insert into "DmPaciente" values (DEFAULT, paciente.sexo, paciente.comorbidade, paciente.faixaEtaria) returning id into pacienteId;
	return pacienteId;
end; $function$
;

CREATE OR REPLACE FUNCTION public.definirdimensaopaciente()
 RETURNS SETOF vwnotificapaciente
 LANGUAGE plpgsql
AS $function$
declare
paciente public.vwNotificaPaciente%ROWTYPE;
begin
	truncate table "DmPaciente" cascade;

	for paciente in select * from public.vwNotificaPaciente
	loop
		raise notice 'Inserindo DmPaciente: "%", "%", "%"', paciente.sexo, paciente.comorbidade, paciente.faixaEtaria;
		insert into "DmPaciente" values (DEFAULT, paciente.sexo, paciente.comorbidade, paciente.faixaEtaria);
		RETURN NEXT paciente;
	end loop;
end; $function$
;

CREATE OR REPLACE FUNCTION public.definirfatodia(dtdiafato timestamp with time zone)
 RETURNS SETOF "NotificacaoEvolucao"
 LANGUAGE plpgsql
AS $function$
declare
  evolucao "NotificacaoEvolucao"%ROWTYPE;
  pacienteid uuid;
  localizacaoid uuid;
  fatorec "FatoNotificacaoCovid19"%ROWTYPE;
  suspeito bigint default 0;
  suspeitoisolamento bigint default 0;
  suspeitoregular bigint default 0;
  suspeitouti bigint default 0;
  encerrado bigint default 0;
  confirmado bigint default 0;
  confirmadoiso bigint default 0;
  confirmadoreg bigint default 0;
  confirmadouti bigint default 0;
  recuperado bigint default 0;
  obito bigint default 0;
  dtInicial timestamp;
 dtFinal timestamp;
 totalEvolucoes bigint default 0;
 descartado bigint default 0;
begin
	delete from "FatoNotificacaoCovid19" fnc where fnc.dtfato = dtDiaFato::date;

	dtInicial := dtdiafato - interval '1 day' + interval '13 hour';
    dtFinal := dtdiafato + interval '13 hour' + interval '59 minute' + interval '59 second';

   	select count(ne) into totalEvolucoes from "Notificacao" n join "NotificacaoEvolucao" ne on ne."notificacaoId" = n.id where n.status <> 'EXCLUIDA' and (ne."createdAt"::timestamp >= dtInicial::timestamp and ne."createdAt"::timestamp <= dtFinal::timestamp);
    if totalEvolucoes = 0 then
		raise notice 'Inserindo fato zerado. Período: %, %', dtInicial, dtFinal;
		select dp.id into pacienteid from "DmPaciente" dp where dp.sexo = 'M' and dp.faixaetaria = '14 A 59' and dp.comorbidade = false;
		select dl.id into localizacaoid from "DmLocalizacao" dl where dl.bairro = 'GERAL' and dl.cidade = 'MARINGA - PR' and estado = 'PR';

		insert into "FatoNotificacaoCovid19" values (DEFAULT, dtDiaFato::date, pacienteid, localizacaoid, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	end if;

	for evolucao in  select ne.* from "Notificacao" n
			 join "NotificacaoEvolucao" ne on ne."notificacaoId" = n.id
			 where n.status <> 'EXCLUIDA' and (ne."createdAt"::timestamp >= dtInicial::timestamp and ne."createdAt"::timestamp <= dtFinal::timestamp)
	loop
		raise notice 'Evolução: %', evolucao;
	  	select definirdimensaolocalizacao(evolucao."notificacaoId") into localizacaoid;
      	select definirdimensaopaciente(evolucao."notificacaoId") into pacienteid;

		suspeito := 0;
		suspeitoisolamento := 0;
		suspeitoregular := 0;
		suspeitouti := 0;
		encerrado := 0;
		confirmado := 0;
		confirmadoiso := 0;
		confirmadoreg := 0;
		confirmadouti := 0;
		recuperado := 0;
		obito := 0;
		descartado := 0;
		if evolucao."tpEvolucao" = 'CONFIRMADO' then
			confirmado := 1;
			if evolucao."tpLocal" = 'INTERNAMENTO_LEITO_COMUM' then confirmadoreg := 1;
			elsif evolucao."tpLocal" = 'INTERNAMENTO_LEITO_UTI' then confirmadouti := 1;
			elsif evolucao."tpLocal" = 'ALTA_ISOLAMENTO_DOMICILIAR' then confirmadoiso := 1;
		end if;
		elsif evolucao."tpEvolucao" = 'ENCERRADO' then encerrado := 1;
		elsif evolucao."tpEvolucao" = 'DESCARTADO' then descartado := 1;
		elsif evolucao."tpEvolucao" = 'CURADO' then recuperado := 1;
		elsif evolucao."tpEvolucao" = 'OBITO' then obito := 1;
		elsif evolucao."tpEvolucao" = 'SUSPEITO' then
			suspeito := 1;
			if evolucao."tpLocal" = 'INTERNAMENTO_LEITO_COMUM' then suspeitoregular := 1;
			elsif evolucao."tpLocal" =	'INTERNAMENTO_LEITO_UTI' then suspeitouti := 1;
			elsif evolucao."tpLocal" = 'ALTA_ISOLAMENTO_DOMICILIAR' then suspeitoisolamento := 1;
			end if;
		end if;

		raise notice 'Inserindo Evolução: %, %, %, %, %, %, %, %, %, %, %, %, %', evolucao."tpEvolucao", suspeito, suspeitoisolamento,
				suspeitoregular, suspeitouti, encerrado, confirmado, confirmadoiso, confirmadoreg, confirmadouti, recuperado, obito, descartado;

		select * into fatorec from "FatoNotificacaoCovid19" fc where fc.dmpacienteid = pacienteid and fc.dmlocalizacaoid = localizacaoid and fc.dtfato::date = dtDiaFato::date;
		if not found then
			raise notice 'Inserindo fato: %, %, %', evolucao."dtEvolucao"::date, pacienteid, localizacaoid;
			insert into "FatoNotificacaoCovid19" values (DEFAULT, dtDiaFato::date, pacienteid, localizacaoid, suspeito, suspeitoisolamento,
				suspeitoregular, suspeitouti, encerrado, confirmado, confirmadoiso, confirmadoreg, confirmadouti, recuperado, obito, descartado);
		else
			raise notice 'Atualizando fato: %', fatorec;
			update "FatoNotificacaoCovid19" set
				qtsuspeito = qtsuspeito + suspeito,
				qtsuspeitoisolamento = qtsuspeitoisolamento + suspeitoisolamento,
				qtsuspeitoregular = qtsuspeitoregular + suspeitoregular,
				qtsuspeitouti = qtsuspeitouti + suspeitouti,
				qtencerrado = qtencerrado + encerrado,
				qtconfirmado = qtconfirmado + confirmado,
				qtconfirmadoisolamento = qtconfirmadoisolamento + confirmadoiso,
				qtconfirmadoregular  = qtconfirmadoregular + confirmadoreg,
				qtconfirmadouti = qtconfirmadouti + confirmadouti,
				qtrecuperado = qtrecuperado + recuperado,
				qtobito = qtobito + obito,
				qtdescartado = qtdescartado + descartado
			where id = fatorec.id;
		end if;
		RETURN NEXT evolucao;
	end loop;
end; $function$
;

CREATE OR REPLACE FUNCTION public.definirfatonotificacao()
 RETURNS SETOF "Notificacao"
 LANGUAGE plpgsql
AS $function$
declare
  notificacao "Notificacao"%ROWTYPE;
  evolucao "NotificacaoEvolucao"%ROWTYPE;
  pacienteid uuid;
  localizacaoid uuid;
  fatorec "FatoNotificacaoCovid19"%ROWTYPE;
  suspeito bigint default 0;
  suspeitoisolamento bigint default 0;
  suspeitoregular bigint default 0;
  suspeitouti bigint default 0;
  encerrado bigint default 0;
  confirmado bigint default 0;
  confirmadoiso bigint default 0;
  confirmadoreg bigint default 0;
  confirmadouti bigint default 0;
  recuperado bigint default 0;
  obito bigint default 0;
  descartado bigint default 0;
begin
	truncate table "FatoNotificacaoCovid19";
	for notificacao in select * from "Notificacao" n where n.status <> 'EXCLUIDA'
	loop
		raise notice 'Notificação: %', notificacao.id;
		select definirdimensaolocalizacao(notificacao.id) into localizacaoid;
		select definirdimensaopaciente(notificacao.id) into pacienteid;

		for evolucao in select * from "NotificacaoEvolucao" ne where ne."notificacaoId" = notificacao.id
		loop
     	  raise notice 'Evolução: %', evolucao;

		  suspeito := 0;
		  suspeitoisolamento := 0;
		  suspeitoregular := 0;
		  suspeitouti := 0;
		  encerrado := 0;
		  confirmado := 0;
		  confirmadoiso := 0;
		  confirmadoreg := 0;
		  confirmadouti := 0;
		  recuperado := 0;
		  obito := 0;
		  descartado := 0;
		    if evolucao."tpEvolucao" = 'CONFIRMADO' then
				confirmado := 1;
				if evolucao."tpLocal" = 'INTERNAMENTO_LEITO_COMUM' then confirmadoreg := 1;
				elsif evolucao."tpLocal" = 'INTERNAMENTO_LEITO_UTI' then confirmadouti := 1;
				elsif evolucao."tpLocal" = 'ALTA_ISOLAMENTO_DOMICILIAR' then confirmadoiso := 1;
				end if;
			elsif evolucao."tpEvolucao" = 'ENCERRADO' then encerrado := 1;
			elsif evolucao."tpEvolucao" = 'DESCARTADO' then descartado := 1;
			elsif evolucao."tpEvolucao" = 'CURADO' then recuperado := 1;
			elsif evolucao."tpEvolucao" = 'OBITO' then obito := 1;
			elsif evolucao."tpEvolucao" = 'SUSPEITO' then
				suspeito := 1;
				if evolucao."tpLocal" = 'INTERNAMENTO_LEITO_COMUM' then suspeitoregular := 1;
				elsif evolucao."tpLocal" =	'INTERNAMENTO_LEITO_UTI' then suspeitouti := 1;
			    elsif evolucao."tpLocal" = 'ALTA_ISOLAMENTO_DOMICILIAR' then suspeitoisolamento := 1;
				end if;
			end if;

			raise notice 'Inserindo Evolução: %, %, %, %, %, %, %, %, %, %, %, %, %', evolucao."tpEvolucao", suspeito, suspeitoisolamento,
					suspeitoregular, suspeitouti, encerrado, confirmado, confirmadoiso, confirmadoreg, confirmadouti, recuperado, obito, descartado;

			select * into fatorec from "FatoNotificacaoCovid19" fc where fc.dmpacienteid = pacienteid and fc.dmlocalizacaoid = localizacaoid and fc.dtfato = evolucao."dtEvolucao"::date;
			if not found then
				raise notice 'Inserindo fato: %, %, %', evolucao."dtEvolucao"::date, pacienteid, localizacaoid;
				insert into "FatoNotificacaoCovid19" values (DEFAULT, evolucao."dtEvolucao"::date, pacienteid, localizacaoid, suspeito, suspeitoisolamento,
					suspeitoregular, suspeitouti, encerrado, confirmado, confirmadoiso, confirmadoreg, confirmadouti, recuperado, obito, descartado);
			else
				raise notice 'Atualizando fato: %', fatorec;
				update "FatoNotificacaoCovid19" set
					qtsuspeito = qtsuspeito + suspeito,
					qtsuspeitoisolamento = qtsuspeitoisolamento + suspeitoisolamento,
					qtsuspeitoregular = qtsuspeitoregular + suspeitoregular,
					qtsuspeitouti = qtsuspeitouti + suspeitouti,
					qtencerrado = qtencerrado + encerrado,
					qtconfirmado = qtconfirmado + confirmado,
					qtconfirmadoisolamento = qtconfirmadoisolamento + confirmadoiso,
					qtconfirmadoregular  = qtconfirmadoregular + confirmadoreg,
					qtconfirmadouti = qtconfirmadouti + confirmadouti,
					qtrecuperado = qtrecuperado + recuperado,
					qtobito = qtobito + obito,
					qtdescartado = qtdescartado + descartado
				where id = fatorec.id;
			end if;
		end loop;

		RETURN NEXT notificacao;
	end loop;
end; $function$
;

CREATE OR REPLACE FUNCTION public.definirusuariounidadesaude(usermail character varying, unidadecnes character varying)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
declare
userId uuid;
unidadeId uuid;
userUnidadeId uuid;
begin
	select id into unidadeId from "UnidadeSaude" us where us.cnes = unidadeCnes;
	if not found then
		RAISE EXCEPTION 'Nonexistent CNES --> %', unidadeCnes
			USING HINT = 'Não foi encontrado uma unidade de saúde com este CNES';
	end if;

	select id into userId from "User" u where u.email = userMail;
	if found then
		raise notice 'Usuário encontrado: "%"', userId;
		select id into userUnidadeId from "UserUnidadeSaude" uus where uus."userId" = "userId" and uus."unidadeSaudeId" = unidadeId;
		if found then
    		raise notice 'Usuário já vinculado a unidade de saúde: "%"', userUnidadeId;
			return userUnidadeId;
		end if;
	else
		insert into "User" values (gen_random_uuid(), userMail, current_timestamp, current_timestamp) returning id into userId;
		raise notice 'Inserindo User: "%", "%"', userMail, userId;
	end if;

	raise notice 'Inserindo UserUnidadeSaude: "%", "%"', userId, unidadeId;
	insert into "UserUnidadeSaude" values (gen_random_uuid(), userId, unidadeId, current_timestamp, current_timestamp) returning id into userUnidadeId;
	return userUnidadeId;
end; $function$
;

CREATE OR REPLACE FUNCTION public.realizarfechamento(dtdiafato timestamp with time zone)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
declare
aprovacaoId int4;
begin
	delete from "AprovacaoDado" ad where ad."data" = dtDiaFato::date;
	raise notice 'Fechando Evoluções entre os dias: "%", "%"', (dtDiaFato::date - 1) || ' 13:00:00', dtDiaFato::date || ' 12:59:59';

	update "NotificacaoEvolucao" set
	dtfechamento = cast(dtDiaFato::date || ' 12:59:59' as timestamptz)
	where "createdAt" between cast((dtDiaFato::date - 1) || ' 13:00:00' as timestamptz)  and cast(dtDiaFato::date || ' 12:59:59' as timestamptz);

	raise notice 'Inserindo AprovacaoDado: "%"', dtDiaFato::date;
	insert into "AprovacaoDado" values (DEFAULT, dtDiaFato::date, true, current_timestamp, current_timestamp) returning id into aprovacaoId;
	return aprovacaoId;
end; $function$
;

CREATE OR REPLACE VIEW public.vwfechamento
AS SELECT v.dtaprovacao,
    v.aprovado,
    COALESCE(o.qtnotificado, 0::bigint) AS qtnotificado,
    COALESCE(o.qtencerrado, 0::bigint) AS qtencerrado,
    COALESCE(o.qtconfirmado, 0::bigint) AS qtconfirmado,
    COALESCE(o.qtconfirmadoencerrado, 0::bigint) AS qtconfirmadoencerrado,
    COALESCE(o.qtobito, 0::bigint) AS qtobito,
    COALESCE((o.qtnotificado - o.qtencerrado - o.qtdescartado - o.qtconfirmadoencerrado - o.qtobito)::numeric, 0::numeric) AS qtacompanhamento,
    COALESCE(o.qtconfirmadoisolamento, 0::bigint) AS qtconfirmadoisolamento,
	COALESCE(o.qtdescartado, 0::numeric) AS qtdescartado
   FROM vwaprovacoes v,
    LATERAL obterboletim(v.dtaprovacao::timestamp with time zone) o(qtnotificado, qtencerrado, qtconfirmado, qtconfirmadoisolamento, qtconfirmadoregular, qtconfirmadouti, qtconfirmadoencerrado, qtobito, qtacompanhamento, qtenfermaria, qttui, qtsuspeitoobito);
