## Setup

- [ ] nodejs
- [ ] graphQL
- [ ] prisma
- [ ] apollo server
- [ ] React
- [ ] express
- [ ] styled component

```bash
npm init -y
npm i apollo-server graphql
npm i nodemon --save-dev
```

- write `server.js` with apollo-server graphql codes
- Error: SyntaxError: Cannot use import statement outside a module
  - Solution: if you wrote `import` in `server.js`, add `"type": "module"` in `package.json`

```bash
npm i @babel/core @babel/preset-env @babel/node --save-dev
```

- create `babel.config.json`
- `babel.config.json` : add presets config

```
{
	"presets": ["@babel/preset-env"]
}
```

- now you can delete `"type": "module"` in `package.json`
  - because `module type` can occur some limitations
- change `package.json` command to
  - `"dev": "nodemon --exec babel-node server.js"`
- using babel allows your code available to whatever node version it is.

## Backend Setup

- make `instaclone` database in your postgreSQL

#### Account

```bash
npx prisma init
```

```
✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn Prisma would have added DATABASE_URL but it already exists in .env
warn You already have a .gitignore. Don't forget to exclude .env to not commit any secret.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet,
read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started

```

- create `Model User` in `schema.prisma` file
- prisma migrate: `npm run migrate`
- ready to run server? Not yet. Before that, we need schema, typedefs, resolvers
- Synchronize Schemas
  - typeDefs/mutations/queries.js : GRAPHQL Schema
  - schema.prism: PRISMA Schema
- always `npm run migrate` whenever you change `schema.prisma`
- create account in `users.mutations.js`
- download bcrypt npm for hasing password

```bash
npm i bcrypt
```

<details>
<summary> Study Backend Setup </summary>
<br>
<h2>Prisma, PostgresQL</h2>

- [x] install prisma
- [x] prisma migrate
- [x] prisma client
- [x] create schema.js
- [x] server.js / client.js

- https://www.prisma.io/
- ORM: you don't write sql. Talks to database. You write javascript. Prisma translates them into sql.
- Better to write in Typescript, if you can.
- Prisma will generate client which will talk to your database via Javascript code.

```
npm install prisma -D
npx prisma init
```

<h2>Install postgresql database, admin</h2>

- https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
- install (mac): https://postgresapp.com/
- install admin (windows): https://www.pgadmin.org/download/pgadmin-4-windows/
- connect your database url with prisma via `.env` file
- change `DATABASE_URL` in `.env` : username (db owner name), db name

<h2>Install Prisma</h2>

- vscode extension: install `prisma`
- write in `prisma/schema.prisma`. it looks similar to graphql, but it's not exactly graphql.
- next stpe: **prisma migrate**: https://www.prisma.io/docs/concepts/components/prisma-migrate
- no need to write `--name init` for now.

```bash
npx prisma migrate dev --name init
```

- if you get E1000 error: need correct password in .env DATABASE_URL
- it would generate `migrations` folder and auto-download prisma client because of `dev` command.
- test in `studio.apollographql.com`

```
mutation Mutation($title: String!, $year: Int!, $genre: String) {
  createWebtoon(title: $title, year: $year, genre: $genre){
    title
    year
    genre
    id
    createdAt
  }
}
```

```bash
npx prisma studio
```

- Show/Edit Database in Browser: `localhost:5555`

<h2>Organize schema files</h2>

```bash
npm i @graphql-tools/schema @graphql-tools/merge @graphql-tools/load-files
```

- https://www.graphql-tools.com/docs/schema-merging#file-loading
- `export default` from database queries/mutation/typeDefs js files
- import into `schema.js` via `graphql-tools` to load files, merge, and make schema

<h2>Configure virtual environment</h2>

- install dotenv

```bash
npm i dotenv
```

- run `dotenv` at the top of your app (top of everything)
- `dotenv` doesn't use import statement because `import` wouldn't execute.
- write: `require('dotenv').config()`
- same as

```js
import dotenv from "dotenv";
dotenv.config();
```

</details>
