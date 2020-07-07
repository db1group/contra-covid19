drop view IF EXISTS public.vwboletimpopulacao CASCADE;
drop view IF EXISTS public.vwPerfilSuspeito CASCADE;
drop function IF EXISTS public.idadeSuspeito CASCADE;

CREATE OR REPLACE VIEW public.vwboletimpopulacao
AS SELECT to_char(v.dtaprovacao::timestamp with time zone, 'DD/MM/YYYY'::text) AS "Data",
    v.qtnotificado AS "Notificados",
    v.qtencerrado AS "Encerrados",
    v.qtdescartado AS "Descartados",
    v.qtconfirmado AS "Confirmados",
    v.qtconfirmadoencerrado AS "Recuperados​",
    v.qtobito AS "Óbitos",
    (v.qtnotificado - v.qtencerrado)::numeric - v.qtdescartado - v.qtconfirmado::numeric AS "Suspeitos de infecção",
    v.qtconfirmado - v.qtconfirmadoencerrado - v.qtobito AS "Ativos​",
    v.dtaprovacao
   FROM vwboletimacumulado v
  WHERE v.dtaprovacao >= '2020-05-18'::date AND v.aprovado = true;
