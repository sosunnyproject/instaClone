import { gql } from "apollo-server";

// GRAPHQL SCHEMA
export default gql`
	type LoginResult {
		ok: Boolean!
		error: String
		token: String
	}
	type Mutation {
		login(
			username: String!
			password: String!
		): LoginResult!
	}
`;