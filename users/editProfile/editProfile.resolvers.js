import { client } from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
	Mutation: {
		editProfile: async (
			_, 
			{firstName, lastName, username, email, password: newPassword}, 
		 	{ Authorization } 
		) => {
			
			// check the user
			const { id } = await jwt.verify(Authorization, process.env.SECRET_KEY);
			// console.log(verifiedToken);

			let uglyPassword = null;
			if(newPassword) {
				uglyPassword = await bcrypt.hash(newPassword, 10);
			}
			const updatedUser = await client.user.update({
				where: { id }, 
				data: {firstName, lastName, username, email, ...(uglyPassword && {password: uglyPassword})}
			})

			// return type EditProfileResult
			if(updatedUser.id) return { ok: true }
			else return { ok: false, error: "Cannot Update Profile" }
		}
	}
}