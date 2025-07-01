import express from 'express';
import { swaggerUi, specs } from './swagger'

const app = express();

app.get('/', (req, res) => {
    res.send('hello, world');
});

export default app;
