import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import myUserRoute from './routes/MyUserRoute';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() =>
	console.log('Connected to database!')
);

// Middleware - Converts body of any request we make to our API server to JSON
const app = express();
app.use(express.json());
app.use(cors());

// Endpoint
app.use('/api/my/user', myUserRoute);

app.listen(7001, () => {
	console.log('server started on localhost:7001');
});
