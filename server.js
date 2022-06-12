import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

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
		webtoon: Webtoon
	}
	type Mutation {
		createWebtoon(title: String!, year: Int!, genre: String): Webtoon
		deleteWebtoon(title: String!): Boolean
	}
`;

const resolvers = {
	Query: {
		webtoons: () => client.webtoon.findMany(),
		webtoon: () => ({"title": "hi", "year": 2021})
	},
	Mutation: {
		createWebtoon: (root, {title, year, genre}) => 
			client.webtoon.create({
				data: {
					title,
					year,
					genre,
				}
			}),
		deleteWebtoon: (_, { title }) => {
			console.log(title);
			return true;
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen()
	.then(() =>  console.log("Server is running on port 4000"));