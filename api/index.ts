import express, { Request, Response } from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';
import transactionsGet from '../src/routes/transactionsGet';
import transactionsPost from '../src/routes/transactionsPost';

const app = express();
app.use(express.json());

app.get('/transactions', transactionsGet);
app.post('/transactions', transactionsPost);

// Exporta uma função handler para a Vercel
export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req as unknown as Request, res as unknown as Response);
}
