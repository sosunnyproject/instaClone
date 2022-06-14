import { client } from "../../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export default {
	Mutation: {
		login: async(_, { username, password }) => {
			// find user with args.username
			const user = await client.user.findFirst({
				where: {username}
			});
			if(!user) return { ok: false, error: "User Not Found" };

			// check password with args.password
			const passwordOk = await bcrypt.compare(password, user.password);
			// console.log(passwordOk);
			if(!passwordOk) return { ok: false, error: "Incorrect Password" };

			// issue a token and send it to the user: json web token
			// don't put any private information in token
			// not about secrecy, knowing who signed it
			const token = await jwt.sign({ id: user.id },  process.env.SECRET_KEY);
			return { ok: true, token }
		}
	}
}