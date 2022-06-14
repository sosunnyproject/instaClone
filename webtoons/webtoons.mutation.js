import { client } from "../client";

export default {
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
}
