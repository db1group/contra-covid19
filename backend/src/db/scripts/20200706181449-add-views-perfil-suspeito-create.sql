drop function IF EXISTS public.idadeSuspeito CASCADE;

CREATE OR REPLACE FUNCTION public.idadeSuspeito(datadenascimento date)
 RETURNS character
 LANGUAGE plpgsql
AS $function$
declare
 idade integer;
begin
  idade := EXTRACT(YEAR FROM age(dataDeNascimento));
  if idade = 1 then
  	return idade || ' ano';
  elsif idade > 1 then
  	return idade || ' anos';
  elsif idade = 0  then
	idade = EXTRACT(MONTH FROM age(dataDeNascimento));
    if idade <= 1 then
    	return '1 mês';
   	else
   		return idade || ' meses';
   	end if;
  end if;
end; $function$
;

drop view IF EXISTS public.vwPerfilSuspeito CASCADE;

create or replace view vwPerfilSuspeito as
select idadeSuspeito(p."dataDeNascimento") as idade, idadeatual(p."dataDeNascimento") as anos, p."dataDeNascimento", p.sexo, ne."createdAt"
from "Notificacao" n
 join "NotificacaoEvolucao" ne on ne."notificacaoId" = n.id
 join "Pessoa" p on p.id = n."pessoaId"
 where ne."tpEvolucao" = 'SUSPEITO';

drop view IF EXISTS public.vwboletimpopulacao CASCADE;

CREATE OR REPLACE VIEW public.vwboletimpopulacao as
 select to_char(v.dtaprovacao::timestamp with time zone, 'DD/MM/YYYY'::text) AS "Data",
    v.qtnotificado AS "Notificados",
    v.qtencerrado AS "Encerrados",
    v.qtdescartado AS "Descartados",
    v.qtconfirmado AS "Confirmados",
    v.qtconfirmadoencerrado AS "Recuperados​",
    v.qtobito AS "Óbitos",
    (v.qtnotificado - v.qtencerrado)::numeric - v.qtdescartado - v.qtconfirmado::numeric AS "Suspeitos de infecção",
    v.qtconfirmado - v.qtconfirmadoencerrado - v.qtobito AS "Ativos​",
    v.dtaprovacao,
    (select string_agg(p.idade, ',') from vwPerfilSuspeito p where p."createdAt"::date = v.dtaprovacao::date and p.sexo = 'M' and p.anos >= 12) as homens,
    (select string_agg(p.idade, ',') from vwPerfilSuspeito p where p."createdAt"::date = v.dtaprovacao::date and p.sexo = 'F' and p.anos >= 12) as mulheres,
    (select string_agg(p.idade, ',') from vwPerfilSuspeito p where p."createdAt"::date = v.dtaprovacao::date and p.anos < 12) as criancas
   FROM vwboletimacumulado v
WHERE v.dtaprovacao >= '2020-05-18'::date AND v.aprovado = true;
