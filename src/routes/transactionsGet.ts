import { Request, Response } from 'express';
import pool from '../db';
import { Transaction } from '../types/transaction';

const transactionsGet = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Transaction>('SELECT * FROM transactions');
    res.json({ transactions: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
};

export default transactionsGet;
