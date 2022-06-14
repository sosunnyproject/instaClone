import { client } from "../../client"
import bcrypt from "bcrypt"

export default {
	Mutation: {
		createAccount: async (_, {
			firstName,
			lastName,
			username,
			email,
			password
		}) => {
			// check if username or email already on DB.
			// findFirst returns Promise, so we need async/await
			try {
				const existingUser = await client.user.findFirst({
					where: {
						OR: [
							{username},
							{email}
						]
					}
				});
				// console.log(existingUser);
				if(existingUser) {
					throw new Error("This username/email is already taken");
				}

				// hash password
				const uglyPassword = await bcrypt.hash(password, 10);
				// console.log(uglyPassword);
				// save and return User
				return client.user.create({
					data: {
						username,
						email,
						firstName,
						lastName,
						password: uglyPassword
					}
				});
			} catch(e) {
				return e;
			}
		}
	}
}