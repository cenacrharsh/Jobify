//* middleware that helps handle errors that occur within asynchronous functions
import 'express-async-errors';

import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import cloudinary from 'cloudinary';
import helmet from 'helmet';
import expressMongoSanitize from 'express-mongo-sanitize';

import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

//! Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(expressMongoSanitize());

//! Public
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/dist')));

//! Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

//! Routes
app.get('/', (req, res) => {
    res.send('Jobify Backend');
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);

app.use('/api/v1/users', authenticateUser, userRouter);

app.use('/api/v1/auth', authRouter);

//> Direct users to index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

//> Not Found Route (gets triggered for routes that do not exist)
app.use('*', (req, res) => {
    res.status(404).json({
        msg: 'not found',
    });
});

//> Error Middleware (gets triggered by errors in our existing routes)
app.use(errorHandlerMiddleware);

//! Start Server
const PORT = process.env.PORT || 8000;

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DB Is Connected !!!');
    app.listen(PORT, () => {
        console.log('Server Running On Port ::', PORT);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
