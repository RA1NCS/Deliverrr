import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import jwt from 'jsonwebtoken';
import User from '../models/user';

// Extend Express Request to include userId and auth0Id properties
declare global {
	namespace Express {
		interface Request {
			userId: string;
			auth0Id: string;
		}
	}
}

// Middleware to validate JWTs using Auth0 configurations
export const jwtCheck = auth({
	audience: process.env.AUTH0_AUDIENCE,
	issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
	tokenSigningAlg: 'RS256',
});

// Middleware to decode JWT, extract user identity, and verify existence in the database
export const jwtParse = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers;

	// Validate presence of authorization token
	if (!authorization || !authorization.startsWith('Bearer')) {
		return res.sendStatus(401);
	}

	// Extract the token from the header
	const token = authorization.split(' ')[1];

	try {
		// Decode token without verifying, and extract user identifier from token
		const decoded = jwt.decode(token) as jwt.JwtPayload;
		const auth0Id = decoded.sub;

		// Look up user in database by their Auth0 ID
		const user = await User.findOne({ auth0Id });
		if (!user) {
			return res.sendStatus(401);
		}

		// Attach user information to the request object for downstream use
		req.auth0Id = auth0Id as string;
		req.userId = user._id.toString();
		next();
	} catch (error) {
		return res.status(401).send(error);
	}
};
