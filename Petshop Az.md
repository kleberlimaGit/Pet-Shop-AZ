# Petshop Az :dog2:

Sistema criado para a seleção da AZ Tecnologia.

Para conseguir configurar o sistema siga os passos abaixo:

No Postgres crie um banco com o nome **petshopaz_bd** no campo **spring.datasource.password** digite a sua senha de conexão com o banco de dados Postgres

![conexao01](C:\Users\mov_k\Downloads\conexao01.jpg)

com o banco criado volte na api e desmarque os campos como mostra a figura abaixo e depois execute a aplicação



![conexao03](C:\Users\mov_k\Downloads\conexao03.jpg)

após a compilação da api marque novamente os campos e va para a pasta raiz da aplicação

![conexao05](C:\Users\mov_k\Downloads\conexao05.jpg)

ao executar aqueles comandos será criado um sql com o nome create.sql na pasta raiz abra com um editor de texto de sua preferência. Copie o conteúdo gerado pela sql e volte para o Postgres

em public > Query Tool vamos copiar o conteúdo e criar as tabelas necessarias para a aplicação funcionar

![conexao08](C:\Users\mov_k\Downloads\conexao08.jpg)





![conexao09](C:\Users\mov_k\Downloads\conexao09.jpg)

![conexao10](C:\Users\mov_k\Downloads\conexao10.jpg)

Para finalizar abra a pasta petshopaz-app com algum terminal e execute npm install para adicionar as dependencias do projeto e logo depois npm start ou yarn start para criar um servidor local de conexão e acessar a porta http://localhost/3000.