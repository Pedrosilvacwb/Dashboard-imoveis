import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import propertyRouter from './routes/properties.routes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/propriedades', propertyRouter);

export default app;
