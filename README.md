## Setup

- [ ] nodejs
- [ ] graphQL
- [ ] prisma
- [ ] apollo server

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

### Prisma, PostgresQL

- https://www.prisma.io/
- ORM: you don't write sql. Talks to database. You write javascript. Prisma translates them into sql.
- Better to write in Typescript, if you can.
- Prisma will generate client which will talk to your database via Javascript code.

```
npm install prisma -D
npx prisma init
```

**Install postgresql database, admin**

- https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
- install (mac): https://postgresapp.com/
- install admin (windows): https://www.pgadmin.org/download/pgadmin-4-windows/
- connect your database url with prisma via `.env` file
- change `DATABASE_URL` in `.env` : username (db owner name), db name
