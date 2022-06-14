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
`;