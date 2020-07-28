#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER covid19;
    CREATE DATABASE covid19;
    GRANT ALL PRIVILEGES ON DATABASE covid19 TO covid19;
    CREATE USER keycloak;
    CREATE DATABASE keycloak;
    GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
EOSQL