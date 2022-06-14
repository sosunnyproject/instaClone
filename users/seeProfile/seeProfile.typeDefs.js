import { gql } from "apollo-server";

// GRAPHQL SCHEMA
export default gql`
	
	type Query{
		seeProfile(username: String): User
	}

`