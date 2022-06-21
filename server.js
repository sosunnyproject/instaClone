require("dotenv").config();
import express from "express";  
import logger from "morgan";
import { ApolloServer } from "apollo-server-express"; // now we can use apollo server on top of express
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

	// our server is now exposed.
	const app = express();

	// so we install, npm i morgan: show all requests coming to our server
	// in our case, ApolloGraphql is pulling request to your backend to check any update on schema
	// similar to your browser's Network tab
	// logger should be
	// app.use(logger("tiny"));

	// expose our server to grab uploaded files
	// dir name(uploads) can be different from url (static)
	app.use("/static", express.static("uploads"));

	// This middleware should be added before calling `applyMiddleware`.
	app.use(graphqlUploadExpress());
	
	server.applyMiddleware({ app });
	
	// await new Promise(r => app.listen({ port: PORT }, r));

	app.listen({ port: PORT }, () => {
		console.log(`Server is running on port ${PORT}`);
	});
	
}

startServer();
