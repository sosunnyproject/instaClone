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
