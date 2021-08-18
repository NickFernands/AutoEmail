## Informações principais

API de um sistema de autores e leitores com envio de emails automáticos usando o nodemailer, contem um CRUD para essas duas entidades, os leitores podem seguir os autores, que realizam as postagens.
A cada nova postagem, ou caso um autor saia da plataforma, a plataforma envia um email para os leitores, esse e-mail se adequa a cada situação.
A API utiliza validações e tratamentos de erros adequados para cada situação, com a ferramenta Express Validator.

## Uso do Mailtrap
foi utilizada a ferramenta de testes de email Mailtrap na construção dessa API, abaixo tem exemplos de alguns emails enviados:

#### Novo Post
![Novo Post](C:\Users\Nickaum\Desktop\Nodemailer\novo post.png)

#### Autor Removido
![Autor Removido](C:\Users\Nickaum\Desktop\Nodemailer\autor removido.png)

Sintam-se livres para utilizar qualquer outro serviço que desejarem

Tecnologias Utilizadas

- NodeJs
- Mailtrap
- MySQL
- Nodemon
- Express
- Express-validator
- Morgan
- Nodemailer

## Como Instalar o Projeto
- Clonar esse repositório
- Utilizar as query's que estão na pasta model dentro do MySQL Workbench (Ou outra ferramenta que utilize a linguagem SQL)
- Com o projeto aberto, utilizar o comando no terminal "--npm instal" para instalar as dependências
- Após instalar as dependências e ter utilizado as querys, utilizar o comando "--npm start" para inicar o projeto
- Utilizar as rotas no Postman ou Insomnia
- Criar uma conta no mailtrap ou utilizar outro serviço