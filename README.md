<p id="readme-top"></p>
<div align="center">
  <h3 align="center">Todo API</h3>

  <p align="center">
     Todo API builded with Express 🚀🚀🚀
    <br />
    <br />
    <a href="https://sign-up-form-mm1rymkfp-bossnasky.vercel.app/">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Todo API enabling the creation of a CRUD operation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Technologies used:

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone {{GITHUB_CLONE_URL}}
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run a server
   ```sh
   npm run start-server:dev
   ```
4. (OPTIONAL) Run a tests
   ```sh
   npm run test
   ```
### API_ROUTES

#### /api/v1/todos

<p>GET (Get all todos)</p>

```sh
  No data provided.
```

<p>POST (Create new todo)</p>

```sh
  {
    title: string;
    status:"active" or "completed"
  }
```

#### /api/v1/todos/:id

<p>PATCH (Update a todo)</p>

```sh
  id:Mongoose.ObjectID
  OPTIONAL : {
    title: string;
    status:"active" or "completed"
  }
```

<p>DELETE (Delete a todo)</p>

```sh
  id:Mongoose.ObjectID
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
