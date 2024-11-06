import express from 'express';
import transactionsGet from './routes/transactionsGet';
import transactionsPost from './routes/transactionsPost';
import cors from 'cors';

const allowedOrigins = ['https://dt-money-webproject.vercel.app', 'http://localhost:3000'];

const app = express();
app.use(express.json());
app.use(cors({
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

app.get('/transactions', transactionsGet);
app.post('/transactions', transactionsPost);

export default app;
