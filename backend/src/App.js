import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import assignmentRoutes from './routes/assignmentsRoutes.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import { arcjetMiddleWare } from '#middleware/arcjet.middleware.js';

const app = express();
app.use(helmet());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  morgan('combined', { stream: { write: message => logger.info(message) } })
);

app.get('/', (req, res) => {
  logger.info('Hello from Assignmate');
  res.status(200).json({ message: 'Hello from Assignmate' });
});

app.get('/test-cookie', (req, res) => {
  console.log(req.cookies);

  res.json({
    cookies: req.cookies,
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'API is still running...',
  });
});
// app.use(arcjetMiddleWare);

app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);

export default app;
