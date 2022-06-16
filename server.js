require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import schema from "./schema";

// 1. put jwt token inside context, which all resolvers can access
// 2. make context as function in order to put token in http header
const server = new ApolloServer({
	schema,
	context: ({ req }) => {
		return {
			authorization: req.headers.authorization
		}
	}

});

const PORT = process.env.PORT;

server.listen(PORT)
	.then(() =>  console.log(`Server is running on port ${PORT}`));