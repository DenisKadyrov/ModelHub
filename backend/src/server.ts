import express from 'express';
import cors from 'cors';
import { router } from './routes/users';
import { swaggerUi, specs } from './swagger';
import { errorHandler } from './middlewares/errorHandler';


const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));



app.use('/users', router);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
app.use(errorHandler);

export default app;
