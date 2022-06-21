require("dotenv").config();
const express = require('express');
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";
// @ts-ignore
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

const PORT = process.env.PORT;

// 1. put jwt token inside context, which all resolvers can access
// 2. make context as function in order to put token in http header
async function startServer() {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req }) => {
			return {
				loggedInUser: await getUser(req.headers.authorization),
				protectedResolver
			}
		}
	
	});

	await server.start();
	const app = express();
	// This middleware should be added before calling `applyMiddleware`.
	app.use(graphqlUploadExpress());
	
	server.applyMiddleware({ app });
	await new Promise(r => app.listen({ port: PORT }, r));
	
  console.log(`Server is running on port ${PORT}`);
}

startServer();
