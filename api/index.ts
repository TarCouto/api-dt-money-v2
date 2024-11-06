import express, { Request, Response } from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';
import transactionsGet from '../src/routes/transactionsGet';
import transactionsPost from '../src/routes/transactionsPost';
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

// Exporta uma função handler para a Vercel
export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req as unknown as Request, res as unknown as Response);
}
