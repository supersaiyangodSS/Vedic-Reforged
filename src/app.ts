import { config } from 'dotenv';
config();
import express, { Request, Response, Express, NextFunction } from 'express';
import connectDB from './config/database.js';
import AuthRouter from './routes/auth.js';
import cors from 'cors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dashboardRouter from '../src/routes/dashboard.js'
import flash from 'connect-flash';
import session, { SessionOptions } from 'express-session';
connectDB();

interface CustomRequest extends Request {
	userId?: string;
}

const app: Express = express ();
const expressSession: string | undefined = process.env.EXPRESS_SESSION_SECRET;
if (!expressSession) {
	console.log('EXPRESS_SESSION_SECRET environment variable is not defined.');
	process.exit(1);
}

const sessionSecret: string | undefined = process.env.SESSION_SECRET;
if (!sessionSecret) {
	console.log('SESSION_SECRET environment variable is not defined.');
	process.exit(1);
}

const options: SessionOptions = {
	secret: expressSession,
	resave: false,
	saveUninitialized: true
}

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors());
app.use(express.static('public'));
app.use(session(options))
app.use(flash())

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
	const token = req.cookies?.token;
	if (!token) return res.status(403).json({ auth: false, message: 'Invalid Token' });

	jwt.verify(token, sessionSecret, (err: jwt.VerifyErrors | null, decoded: any) => {
		if (err) return res.status(403).json({ auth: false, message: 'Invalid Token' });
		const decodedPayload = decoded as JwtPayload;
			req.userId = decodedPayload.id;
			next();
	})
}

app.get('/', (req: Request, res: Response) => {
	res.status(200).render('index');
});

app.use('/auth', AuthRouter);
app.use('/dashboard', verifyToken, dashboardRouter);

export { app, sessionSecret };
