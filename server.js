import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
	type Webtoon {
		title: String
		year: Int
	}
	type Query {
		webtoons: [Webtoon]
		webtoon: Webtoon
	}
	type Mutation {
		createWebtoon(title: String!): Boolean
		deleteWebtoon(title: String!): Boolean
	}
`;

const resolvers = {
	Query: {
		webtoons: () => [],
		webtoon: () => ({"title": "hi", "year": 2021})
	},
	Mutation: {
		createWebtoon: (root, args) => {
			console.log(args);
			return true;
		},
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