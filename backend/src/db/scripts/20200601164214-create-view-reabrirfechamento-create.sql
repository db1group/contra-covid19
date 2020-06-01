drop function IF EXISTS public.reabrirfechamento;

CREATE OR REPLACE FUNCTION public.reabrirfechamento(dtdiafato timestamp with time zone)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
declare
aprovacaoId int4;
begin
	raise notice 'Apagando aprovação do dia: "%"', dtDiaFato::date;
	delete from "AprovacaoDado" ad where ad."data" = dtDiaFato::date;

	raise notice 'Reabrindo Evoluções entre os dias: "%", "%"', (dtDiaFato::date - 1) || ' 13:00:00', dtDiaFato::date || ' 12:59:59';

	update "NotificacaoEvolucao" set
	dtfechamento = NULL
	where "createdAt" between cast((dtDiaFato::date - 1) || ' 13:00:00' as timestamptz)  and cast(dtDiaFato::date || ' 12:59:59' as timestamptz);
end; $function$
;

UPDATE FechamentoNotificacaoCovid19 set status = 'FECHADO' where status is null;
