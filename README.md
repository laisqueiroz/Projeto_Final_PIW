# :checkered_flag: (A Definir) - PETSHOP

Um sistema para um PetShop, onde será possível gerenciar os serviços e os clientes(Donos e Pets).

## :technologist: Membros da equipe

- Lais Freitas de Queiroz - 470580 - Design Digital
- Arusha Silveira Holanda Gomes - 471988 - Design Digital

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

- Administrador
- Médico Veterinário
- Atendente 
- Cliente 

## :spiral_calendar: Entidades ou tabelas do sistema

- Usuário
- Serviços
- Pets

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

- O administrador poderá gerenciar os serviços oferecidos (criar, modificar, deletar) e os clientes do PetShop.
- O atendente pode cadastrar novos clientes e atribuir serviços a cada cliente/pet.
- O médico veterinário pode ver os clientes, ver e adicionar informações ao histórico médico.
- Os clientes podem ver os serviços oferecidos e escolher um ou mais serviços para seu pet.
- Os Clientes poderam adicionar ou excluir os seus Pets.



----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Vue.js 3, Typescript, Bootstrap, Axios, Vuex, VueRouter

**Backend:**

Node.js, Express, Sequelize, SQLite, CORS, Typescript


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| USERS | X |  X  | X | X |
| SERVICES | X |  X  |  X | X |
| PET | X |  X  | X | X |
| MedicalRecord | X | X |   | X |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL FRONTEND | URL BACKEND |
| --- | --- | --- |
| POST | http://localhost:8080/login | http://localhost:3000/login |
| GET | http://localhost:8080/gestaouser | http://localhost:3000/users |
| PUT | http://localhost:8080/add-user | http://localhost:3000/users/:id |
| DELETE | http://localhost:gestaouser/ | http://localhost:3000/users/:id |
| GET | http://localhost:8080/user-view/:id | http://localhost:3000/users/:id |
| GET | http://localhost:8080/user-edit/:id | http://localhost:3000/users/:id |
| GET | http://localhost:8080/gestaoservice | http://localhost:3000/service |
| DELETE | http://localhost:gestaoservice | http://localhost:3000/service/:id |
| POST | http://localhost:8080/add-service | http://localhost:3000/service/:id |
| GET | http://localhost:8080/service-view/:id | http://localhost:3000/service:id |
| PUT | http://localhost:8080/service-edit/:id | http://localhost:3000/service/:id |
| POST | - | http://localhost:3000/pets/:id |
| GET | http://localhost:8080/listar-pets | http://localhost:3000/pets |
| PUT | - | http://localhost:3000/pets/:id |
| DELETE | - / | http://localhost:3000/pets/:id |


## :neckbeard: Como utilizar o sistema

A página inicial é um home básica com botão para login.

Os dados de usuário para login são:

--------- Admin ---------

email: laisqueiroz@email.com

senha: 123456

--------- Tutor ---------

email: testetutor@email.com

senha: 123456

--------- Médico Veterinário ---------

email: testemedVet@email.com

senha: 123456
