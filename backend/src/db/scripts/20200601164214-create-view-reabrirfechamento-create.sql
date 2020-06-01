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

UPDATE FechamentoNotificacaoCovid19 set status = 'FECHADO' where status = 'ABERTO';

drop function IF EXISTS public.podereabrirfechamento;

CREATE OR REPLACE FUNCTION public.podereabrirfechamento(idfechamento uuid)
 RETURNS TABLE(id uuid, "dataFechamento" timestamp with time zone, "casosNotificados" integer, acompanhados integer, "casosEncerrados" integer, confirmados integer, curados integer, obitos integer, "emIsolamentoDomiciliar" integer, status character varying)
 LANGUAGE plpgsql
AS $function$
begin
	return QUERY select fnc.id, fnc."dataFechamento", fnc."casosNotificados", fnc.acompanhados, fnc."casosEncerrados", fnc.confirmados, fnc.curados, fnc.obitos, fnc."emIsolamentoDomiciliar", fnc.status
		from "FechamentoNotificacaoCovid19" fnc where fnc.id = idFechamento
		and (not exists (select * from "FechamentoNotificacaoCovid19" fne where fne."dataFechamento"::date = (fnc."dataFechamento"::date + 1))
		or exists (select 1 from "FechamentoNotificacaoCovid19" fe where fe.status = 'REABERTO' and fe."dataFechamento"::date = (fnc."dataFechamento"::date + 1)));
end; $function$
;
