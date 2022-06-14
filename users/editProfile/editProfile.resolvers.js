import { client } from "../../client"

export default {
	Mutation: {
		editProfile: (_, {
			firstName,
			lastName,
			username,
			email,
			password
		}) => {
			console.log("edit profile mutations")
		}
	}
}