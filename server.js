require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import schema from "./schema";

// 1. put jwt token inside context, which all resolvers can access
const server = new ApolloServer({
	schema,
	context: {
		Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU1MzY3MjY3fQ.rV4gMHbaXF-hp61Fq3p8RQL80CEvxwWn0Dadnq6QdEo"
	}
});

const PORT = process.env.PORT;

server.listen(PORT)
	.then(() =>  console.log(`Server is running on port ${PORT}`));