## Setup

- [ ] nodejs
- [ ] graphQL
- [ ] prisma
- [ ] apollo server
- [ ] React
- [ ] express
- [ ] styled component

<details>
<summary> Apollo, GraphQL, Babel setup  </summary>

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

</details>

## Backend Setup

- make `instaclone` database in your postgreSQL

<details>
<summary> Create Account </summary>

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

</details>

<details>
<summary> See Profile</summary>

- write `seeProfile` Query in `users.queries.js`

</details>

<details>
<summary> Login </summary>

```bash
npm i jsonwebtoken
```

로그인 방법

- token: when server is not connected to frontend, or in separate servers
- cookie, session: when server/frontend are on the same place

JWT

- issue a token and send it to the user: json web token
- don't put any private information in token
- not about secrecy, knowing who signed it

</details>

<details>
<summary> Edit Profile </summary>

- no properties are required
- prisma doesn't send undefined/null value
- need to bcrypt.hash new password
- use async and await, spread operator
- in resolvers, return correct type (as you wrote in typeDefs)
</details>

<details>
<summary> JWT TOKEN AUTHORIZATION </summary>

- example: 
	- when editing profile, the user has to send you its token to verify its identification
	- `jwt.verify(token, process.env.SECRET_KEY)` to check jwt
- BUT we're not going to write token on every mutation
- SEND TOKEN AUTOMATICALLY
	- Pass on JWT TOKEN inside HTTP-HEADER
	- screenshot apollo graphql studio
![httpheaders]("./static/headerhttp.png");

- HOW ?
	- graphql accepts 4 parameters: root, args, context, info
	- `context` is available in all resolvers
	- WHO is creating graphql ? APOLLO SERVER `server.js`
	- put jwt token inside context, which all resolvers can access
- BUT LET'S PUT IN HTTP HEADER
	- `context` can have function inside
	- [resoler - context](https://www.apollographql.com/docs/apollo-server/data/resolvers#the-context-argument)
	- WHEN YOU ARE TESTING
		- Studio ApolloGraphql: Add Authorization token in Headers section
		- The code will access that token via `req.headers.authorization`
		- inject auth jwt token into `context request`
- IMPROVE!
	- instead of keep verifying token, what we need is verifying user
	- `users.utils.js`
	- pass on `loggedInUser` info via `context` instead.

</details>

<details>
<summary> Improve, protect resolvers: currying(es6) </summary>
- currying
	- function returns another function
	- redux uses this
</details>

<details>
<summary> Add Bio/Avatar to User DB model</summary>

- we want to add bio, avatar to editProfile
- change
	- `prisma/schema.prisma`
	- bio: words (string), avatar: url to the image (string)
	- `user.typeDefs.js`: add bio, avatar
	- `editProfile typeDef & resolver`: add bio 
- run `npm run migrate` `npm run studio` check updated DB
- check `prisma studio` to see bio, avatar keys

</details>

<details>
<summary> Apollo Server: File Uploads</summary>
- [Apollo provides "file uplaods"](https://www.apollographql.com/docs/apollo-server/data/file-uploads/)
	- we need to use Apollo Schema
- currently, we're using Prisma Schema
- Let's allow Apollo Server to create Schema
- Unknown type "Upload" error:
	- `npm i apollo-server-express graphql-upload express`
	- graphql-upload import error: specifically import js class
		- [stackoverflow](https://stackoverflow.com/questions/72361047/error-no-exports-main-defined-in-graphql-upload-package-json)
		- edit `editProfile.resolvers` `editProfile.typeDefs` `server.js`
- if you upload file on Altair, console.log(avatar) on `editProfile.resolver`, you get this
```
Promise {
  {
    filename: 'D__Vk4qUYAAycbu.jpg',
    mimetype: 'image/jpeg',
    encoding: '7bit',
    createReadStream: [Function: createReadStream]
  }
}
```
- cool!
- next steps
	- user uploads to website, server uploads to AWS
	- practice: user uploads to website, save to directories, uploads to AWS
</details>

<hr />

## Study Backend Setup

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
