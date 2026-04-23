import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router as userRouter } from './routes/users';
import { router as modelRouter } from './routes/models';
import { swaggerUi, specs } from './swagger';
import { errorHandler } from './middlewares/errorHandler';
import { config } from './config/config';


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true,
}));



app.use('/users', userRouter);
app.use('/models', modelRouter);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
app.use(errorHandler);

export default app;
