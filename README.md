# Catálogo de Produtos Interativo

Pedro Henrique Mendes de Castro

### Descrição e Objetivo do Projeto

O objetivo deste projeto é desenvolver uma interface Front-End para interagir com uma API pública, permitindo a visualização, adição e atualização de produtos. A aplicação web consome a FakeStore API, que fornece dados fictícios de produtos de uma loja online.

### Tecnologias Utilizadas

* HTML5: Estruturação semântica das páginas web.
* CSS3: Estilização e layout dos componentes visuais.
* JavaScript: Manipulação do DOM, lógica da aplicação e comunicação com a API.
* Fetch API: Realização das requisições HTTP (GET, POST, PUT).

### Requisições Utilizadas

| Página | Tipo de Requisição | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| `index.html` | `GET` | `https://fakestoreapi.com/products` | Carrega e exibe a lista de produtos na página principal. |
| `adicionar.html` | `POST` | `https://fakestoreapi.com/products` | Envia os dados de um novo produto para a API. |
| `editar.html` | `GET` | `https://fakestoreapi.com/products/{id}` | Busca os dados de um produto específico para preencher o formulário. |
| `editar.html` | `PUT` | `https://fakestoreapi.com/products/{id}` | Envia os dados atualizados de um produto para a API. |

### Créditos e Fontes de Referência

* API Utilizada:FakeStore API (https://fakestoreapi.com/)
* Guia de Referência: MDN Web Docs - Fetch API (https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
* IA's: ChatGPT, Google Gemini.