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
		webtoon(id: Int!): Webtoon
	}
	type Mutation {
		createWebtoon(title: String!, year: Int!, genre: String): Webtoon
		deleteWebtoon(id: Int!): Webtoon
		updateWebtoon(id: Int!, year: Int!): Webtoon
	}
`;

const resolvers = {
	Query: {
		webtoons: () => client.webtoon.findMany(),
		webtoon: (_, { id }) => client.webtoon.findUnique({ where: { id } })
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
		deleteWebtoon: (_, { id }) => client.webtoon.delete({ where: { id } }),
		updateWebtoon: (_, { id, year }) => client.webtoon.update({ where: { id }, data: { year } })
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen()
	.then(() =>  console.log("Server is running on port 4000"));