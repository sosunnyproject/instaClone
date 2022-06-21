import { client } from "../../client";
import {createWriteStream} from "fs";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
// @ts-ignore
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

// console.log(process.cwd())

const resolverFn = 
	async (
		_, 
		{firstName, lastName, username, email, password: newPassword, bio, avatar}, 
		{ loggedInUser } 
	) => {
		let avatarUrl = null;
		// console.log(avatar)
		
		// File Upload: Avatar Image
		// Node feature: read uploaded file, write file data, save in local dir
		// find current dir path with process.cwd()
		if(avatar) {
			const { filename, createReadStream } = await avatar;
			const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
			const readStream = createReadStream();
			// save file with unique filename
			const writeStream = createWriteStream(
				process.cwd()+ "/uploads/" +  newFilename
			);
			readStream.pipe(writeStream)

			// make avatarUrl to save in DB
			avatarUrl = `http://localhost:4000/static/${newFilename}`;	
		}

		let uglyPassword = null;
		if(newPassword) {
			uglyPassword = await bcrypt.hash(newPassword, 10);
		}
		const updatedUser = await client.user.update({
			where: { id: loggedInUser.id }, 
			data: {firstName, 
				lastName, 
				username, 
				email, 
				bio, 
				...(avatarUrl && {avatar: avatarUrl}),
				...(uglyPassword && {password: uglyPassword})}
		})

		// return type EditProfileResult
		if(updatedUser.id) return { ok: true }
		else return { ok: false, error: "Cannot Update Profile" }
	}

export default {
	Upload: GraphQLUpload,

	Mutation: {
		editProfile: protectedResolver(resolverFn)		
	}
	
}