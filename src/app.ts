import express from 'express';
import transactionsGet from './routes/transactionsGet';
import transactionsPost from './routes/transactionsPost';

const app = express();
app.use(express.json());

app.get('/transactions', transactionsGet);
app.post('/transactions', transactionsPost);

export default app;
