import { config } from 'dotenv';
config();
import express from 'express';
import connectDB from './config/database.js';
import AuthRouter from './routes/auth.js';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dashboardRouter from '../src/routes/dashboard.js';
import flash from 'connect-flash';
import session from 'express-session';
connectDB();
const app = express();
const expressSession = process.env.EXPRESS_SESSION_SECRET;
if (!expressSession) {
    console.log('EXPRESS_SESSION_SECRET environment variable is not defined.');
    process.exit(1);
}
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    console.log('SESSION_SECRET environment variable is not defined.');
    process.exit(1);
}
const options = {
    secret: expressSession,
    resave: false,
    saveUninitialized: true
};
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));
app.use(session(options));
app.use(flash());
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token)
        return res.status(403).json({ auth: false, message: 'Invalid Token' });
    jwt.verify(token, sessionSecret, (err, decoded) => {
        if (err)
            return res.status(403).json({ auth: false, message: 'Invalid Token' });
        const decodedPayload = decoded;
        req.userId = decodedPayload.id;
        next();
    });
};
app.get('/', (req, res) => {
    res.status(200).render('index');
});
app.use('/auth', AuthRouter);
app.use('/dashboard', verifyToken, dashboardRouter);
export { app, sessionSecret };
//# sourceMappingURL=app.js.map