# Petshop Az :dog2:

Sistema criado para a seleção da AZ Tecnologia.

Para conseguir configurar o sistema siga os passos abaixo:

No Postgres crie um banco com o nome **petshopaz_bd** no campo **spring.datasource.password** digite a sua senha de conexão com o banco de dados Postgres

![Conexao01](https://uploaddeimagens.com.br/images/003/291/934/full/conexao01.jpg?1623908049)

com o banco criado volte na api e desmarque os campos como mostra a figura abaixo e depois execute a aplicação



![Conexao03](https://uploaddeimagens.com.br/images/003/291/935/full/conexao03.jpg?1623908136)

após a compilação da api marque novamente os campos e va para a pasta raiz da aplicação

![Conexao05](https://uploaddeimagens.com.br/images/003/291/936/full/conexao05.jpg?1623908176)

ao executar aqueles comandos será criado um sql com o nome create.sql na pasta raiz abra com um editor de texto de sua preferência. Copie o conteúdo gerado pela sql e volte para o Postgres

em public > Query Tool vamos copiar o conteúdo e criar as tabelas necessarias para a aplicação funcionar

![Conexao08](https://uploaddeimagens.com.br/images/003/291/937/full/conexao08.jpg?1623908212)





![Conexao09](https://uploaddeimagens.com.br/images/003/291/939/full/conexao09.jpg?1623908273)

![Conexao10](https://uploaddeimagens.com.br/images/003/291/940/full/conexao10.jpg?1623908303)

Para finalizar abra a pasta petshopaz-app com algum terminal e execute npm install para adicionar as dependencias do projeto e logo depois npm start ou yarn start para criar um servidor local de conexão e acessar a porta http://localhost/3000.