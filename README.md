# coworkingUFC
 Protótipo funcional de uma aplicação web para o espaço de Coworking do Campus da UFC/Sobral
 
 Após baixar o repositório, será necessário instalar as dependências do NODE para o pleno funcionamento do protótipo. Para isso, utilizamos o **npm i**, tanto para o backend quanto frontend.
![image](https://user-images.githubusercontent.com/39319226/114950188-ec94fe80-9e28-11eb-86fd-9dc17c1d2290.png)
![image](https://user-images.githubusercontent.com/39319226/114950417-57463a00-9e29-11eb-8e69-2f5a2155e4bd.png)


Logo após instaladas as dependências, crie uma cópia do arquivo env_file, localizado na pasta backend. Renomeie a cópia para **.env**, este será o arquivo de configuração onde será feita a conexão com banco de dados. Ele deve seguir o seguinte padrão: 
![image](https://user-images.githubusercontent.com/39319226/114959810-26bbcb80-9e3c-11eb-8969-d5aed280f74a.png)


O sistema de gerenciamento de banco de dados utilizado foi o **Postgres**, que deverá ser instalado na máquina. Clique [aqui](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) para instalar a versão 13.2 para Windows 64bits.

Durante a instalação do postgres, será necessário cadastrar um usuário e senha para acesso ao banco. Neste protótipo, utilizamos o usuário padrão de nome 'postgres' e senha 1234.
Após a instalação, é necessário adicionar o **caminho de instalação do postgres** nas variaveis de ambiente do sistema. A pasta geralmente se encontra em C:\Program Files\PostgreSQL\13\bin

![image](https://user-images.githubusercontent.com/39319226/114953120-1b61a380-9e2e-11eb-98c0-c3fa7c289a96.png)
![image](https://user-images.githubusercontent.com/39319226/114953075-008f2f00-9e2e-11eb-959b-e885656b73ce.png) 
![image](https://user-images.githubusercontent.com/39319226/114953498-df7b0e00-9e2e-11eb-8b62-a98e81e202dc.png)


Com as dependências do node instaladas e o postgres devidamente configurado, o banco deve ser criado utilizando o CMD. Abaixo, seguem os comandos para utilizar o postgres no CMD

```
psql -U postgres    // para acessar o postgres
1234    // senha exigida
create database coworkingUFC    // banco criado

```

Abaixo, seguem outros comandos interessantes para uso no postgres. Outros comandos básicos podem ser acessados [aqui.](https://www.postgresqltutorial.com/psql-commands/)

```
\l   // visualizar todos os DB's existentes
\c coworkingufc    // comando para conectar ao banco coworkingUFC
\dt   // visualizar todas as tabelas do banco
select * from table(indicar nome da tabela requerida)   // visualizar todos os campos de uma tabela 

```

Com o banco criado, também precisaremos do MongoDB, que é utilizado para gerenciar as estatísticas do projeto(Quantidade de programas, projetos e reservas). Clique [aqui](https://www.mongodb.com/try/download/community) para baixar o MongoDB versão Windows 64Bits


Após a instalação do MongoDB, adicione o caminho de instalação nas variáveis de ambiente, assim como foi feito com o postgres. A pasta usualmente será C:\Program Files\MongoDB\Server\4.4\bin. Então, acesse a pasta bin do programa e execute o arquivo .exe mongod. Ele irá iniciar na porta 27017.

![image](https://user-images.githubusercontent.com/39319226/114956208-c83f1f00-9e34-11eb-98d1-2bbe32f12996.png) ![image](https://user-images.githubusercontent.com/39319226/114960131-cf6a2b00-9e3c-11eb-98e0-12e21fe62998.png)


Inicialmente, com o banco vazio, não teremos usuário administrador para realizar certas ações(insert, update e remove de usuários, por exemplo). Logo, para adicionarmos um usuário administrador, 


















 
 







