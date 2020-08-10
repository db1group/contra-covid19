call npx sequelize-cli db:migrate & ^
call npx sequelize-cli db:seed:all --seeders-path=".\src\db\seeders\development" & ^
call npx sequelize-cli db:seed:all
