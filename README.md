[![CircleCI](https://circleci.com/gh/db1group/contra-covid19/tree/master.svg?style=svg)](https://circleci.com/gh/db1group/contra-covid19/tree/master)

# Notifica Saúde

É uma iniciativa pensando na divulgação de informações confiáveis e de forma eficiente pelas secretarias de saúde de cada municipio.

Fique a vontade para ajudar!!

Acesse o site do projeto ([Notifica Saúde](https://notificasaude.com.br)), para obter mais informações sobre os voluntários, notícias e a evolução dos casos de covid-19 na região de Maringá.

## Para Devs

Caso queira contribuir com a evolução deste projeto, siga os passos abaixo:

O projeto utiliza as seguintes tecnologias:

- Backend
  - NodeJs
- DataBase
  - Postgres
- Cache
  - Redis
- Frontend
  - Vue.js
- Autenticação/Autorização
  - Keycloak
- Build contínuo
  - Github/CircleCI/Terraform/AWS
- Hospedagem
  - AWS

Por isso é necessario ter as bases e containers rodando antes de executar a aplicação.

Para facilitar este processo, foi criado um script `setup.bat`, que é responsável por inciar os containers e rodar os scripts de migração.

Após a execução do script, deve ser criado um usuário de acesso na aplicação via [Keycloak](http://localhost:8080). Para acessar, basta utilizar o usuário/senha: admin. Para mais informações sobre como criar um usuário, acessa o site da documentação [User Managment - Keycloak](https://www.keycloak.org/docs/latest/server_admin/#user-management). Para ter acesso total ao sistema, defina a Role `SECRETARIA_SAUDE` para o usuário criado.

Após a criação do usuário, já é possível rodar os serviços do backend/frontend. Acesse o terminal e entre na pasta do backend, digite `yarn dev` para inicar o aplicativo em modo desenvolvimento. Após isto, abre um novo terminal, entre na pasta frontend e digite yarn serve. Após iniciar o aplicativo (http://localhost:8081), digite o usuário e senhas criados no keycloak.

Agora só criar um Pull Request com sua alteração/correção :)

### Ambientes

#### Ambientes de Homologação

[Frontend](https://qa-app.notificasaude.com.br)

[Backend](https://qa-api.notificasaude.com.br)

[Keycloak](https://qa-auth.notificasaude.com.br)

#### Ambientes de Produção

[Frontend](https://www.notificasaude.com.br)

[Backend](https://api.notificasaude.com.br)

[Keycloak](https://auth.notificasaude.com.br)
