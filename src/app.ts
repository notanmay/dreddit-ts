import { Express, Request, Response } from 'express';
import express from "express";
import * as dotenv from 'dotenv';
import 'express-async-errors';
import { connectDB } from './db/connect';
import authRouter from './routes/userRouter';
import { authMiddleware } from './middleware/authMiddleware';
import postRouter from './routes/postRouter'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';

const app : Express = express();
dotenv.config();

app.use(express.json());
app.use('/api/v0/users', authRouter)
app.use('/api/v0/posts', authMiddleware as any, postRouter)


app.get('/', (req: Request, res: Response) => {
    res.send('dreddit-ts')
})

app.use(errorHandlerMiddleware as any)
const port: number =  3000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI!)
        app.listen(port, () => {
            console.log(`server is listening on port ${port}...`)
        });
    } catch (error) {
        console.log(error);
        
    }
}

start()