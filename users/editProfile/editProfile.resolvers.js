import { client } from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolverFn = 
	async (
		_, 
		{firstName, lastName, username, email, password: newPassword, bio}, 
		{ loggedInUser, protectResolver } 
	) => {
		protectResolver(loggedInUser);

		let uglyPassword = null;
		if(newPassword) {
			uglyPassword = await bcrypt.hash(newPassword, 10);
		}
		const updatedUser = await client.user.update({
			where: { id: loggedInUser.id }, 
			data: {firstName, lastName, username, email, bio, ...(uglyPassword && {password: uglyPassword})}
		})

		// return type EditProfileResult
		if(updatedUser.id) return { ok: true }
		else return { ok: false, error: "Cannot Update Profile" }
	}

export default {
	Mutation: {
		editProfile: protectedResolver(resolverFn)		
	}
	
}