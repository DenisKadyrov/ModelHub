import express from 'express';
import { router } from './routes/users';
import { swaggerUi, specs } from './swagger';
import { errorHandler } from './middlewares/errorHandler';


const app = express();

app.use(express.json());

app.use('/users', router);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
app.use(errorHandler);

export default app;
