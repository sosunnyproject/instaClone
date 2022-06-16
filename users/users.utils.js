import { client } from "../client";
import jwt from "jsonwebtoken";

// check jwt token, get User
export const getUser = async(token) => {
	try { 
		if(!token) {
			return null;
		}
		const { id } = await jwt.verify(token, process.env.SECRET_KEY);
		const user = await client.user.findUnique({ where: { id } });
		if(user) {
			return user;
		}	else {
			return null;
		}
	} catch(err) {
		return null;
	}

};

export const protectedResolver = (ourResolver) => (root, args, context, info) => {
	
	if(!context.loggedInUser) {
		return {
			ok: false,
			error: "Please Log In"
		};
	}

	return ourResolver(root, args, context, info);
}

