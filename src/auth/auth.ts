import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: string | JwtPayload
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
	try {
		console.log('token before split: ' + req.headers.authorization);
		const token: string | undefined = req.headers.authorization?.split(' ')[1];
		console.log('token after split: ' + token);

		if (token === undefined) {
			return res.status(401).json({ error: 'Unauthorized' });
		}
		const decodeToken = await jwt.verify(token, 'RANDOM-TOKEN') as JwtPayload;
		const user = await decodeToken;
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error!' });
	}
};

export default auth;