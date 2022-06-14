import { client } from "../client";

export default {
	Query: {
		webtoons: () => client.webtoon.findMany(),
		webtoon: (_, { id }) => client.webtoon.findUnique({ where: { id } })
	},
}