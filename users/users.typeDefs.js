import { gql } from "apollo-server";

// GRAPHQL SCHEMA
export default gql`
	type User {
		id: String!
		firstName: String!
		lastName: String
		username: String!
		email: String!
	}
	type LoginResult {
		ok: Boolean!
		error: String
		token: String
	}
	type Mutation {
		createAccount(
			firstName: String!
			lastName: String
			username: String!
			email: String!
			password: String!
		): User
		login(
			username: String!
			password: String!
		): LoginResult!
	}

	type Query{
		seeProfile(username: String): User
	}

`;