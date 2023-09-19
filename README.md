# Tutorial Sequelize e TypeScript

Este repositório contém um projeto exemplo que demonstra o uso do [Sequelize](https://github.com/sequelize/sequelize) com TypeScript para modelar e gerenciar associações em bancos de dados relacionais.

Um tutorial completo está no artigo [Introdução Ao Sequelize E Modelagem De Dados Com TypeScript](https://escoladaprogramacao.com.br/introducao-ao-sequelize-e-modelagem-de-dados-com-typescript/).

## Conteúdo

<!-- toc -->

- [Modelos e Associações](#modelos-e-associações)
- [Início Rápido](#início-rápido)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Endpoints Disponíveis](#endpoints-disponíveis)
  - [Empréstimos](#empréstimos)
  - [Gêneros](#gêneros)
  - [Livros](#livros)
  - [Usuários](#usuários)
- [Contribuições](#contribuições)
- [Licença](#licença)

<!-- tocstop -->

## Modelos e Associações

- Usuário
- Livro
- DetalhesLivro
- Emprestimo
- Genero
- LivroGenero

## Início Rápido

### Pré-requisitos

- Node.js e npm

### Instalação

1. Clone o repositório:

```sh
git clone [URL_DO_REPOSITÓRIO]
```

2. Entre no diretório:

```sh
cd [NOME_DO_DIRETÓRIO]
```

3. Instale as dependências:

```sh
npm install
```

4. Inicie o servidor:

```sh
npm run dev:server
```

Agora você pode acessar o servidor na porta especificada (por exemplo, `http://localhost:3000`).

## Endpoints Disponíveis

No caminho `insomnia/api.json` está o arquivo que pode ser importado no [Insonmia](https://insomnia.rest/) para auxiliá-lo a testar a API.

### Empréstimos

```
POST  /emprestimos
POST  /emprestimos/:id/devolver
GET   /emprestimos/atrasados
GET   /emprestimos/atrasados/:idUsuario
```

### Gêneros

```
POST  /generos
GET   /generos
GET   /generos/:id/livros
```

### Livros

```
POST  /livros
GET   /livros
GET   /livros/:id/generos
POST  /livros/:id/generos/:idGenero
```

### Usuários

```
POST  /usuarios
GET   /usuarios
GET   /usuarios/:id/emprestimos
```

## Contribuições

Contribuições são bem-vindas! Por favor, abra um PR com suas alterações ou crie um Issue para discutir qualquer melhoria.

## Licença

MIT

---

Espero que este projeto lhe ajude a compreender melhor o Sequelize com TypeScript. Se tiver dúvidas ou sugestões, sinta-se à vontade para abrir um Issue ou enviar um PR!
