ECHO CONFIGURANDO ARQUIVOS .ENV
cd backend
copy ".env.sample" ".env"
cd ../frontend
copy ".env.dev.sample" ".env.dev"
cd ..

ECHO INICIANDO REDIS...
call backend/run-redis.bat

ECHO INICIANDO POSTGRES...
call postgres/run-postgres.bat
ECHO WAITING POSTGRES STARTED...
timeout 5 > NUL

ECHO INICIANDO KEYCLOAK...
cd keycloak
call run-keycloak-pg.bat
ECHO WAITING KEYCLOAK STARTED...
timeout 10 > NUL

ECHO RODANDO SCRIPTS POSTGRES...
cd ../backend
call redo.bat