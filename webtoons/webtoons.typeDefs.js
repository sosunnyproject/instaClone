import { gql } from "apollo-server";

const typeDefs = gql`
	type Webtoon {
		id: Int!
		title: String!
		year: Int!
		genre: String
		createdAt: String!
		updatedAt: String!
	}
	type Query {
		webtoons: [Webtoon]
		webtoon(id: Int!): Webtoon
	}
	type Mutation {
		createWebtoon(title: String!, year: Int!, genre: String): Webtoon
		deleteWebtoon(id: Int!): Webtoon
		updateWebtoon(id: Int!, year: Int!): Webtoon
	}
`;

export default typeDefs;