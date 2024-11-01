import { Request, Response } from 'express';
import pool from '../db';
import { transactionSchema, Transaction } from '../types/transaction';

const transactionsPost = async (req: Request, res: Response): Promise<void> => {
  const validation = transactionSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ error: 'Dados inválidos', details: validation.error.errors });
    return;
  }

  const { description, type, category, price } = validation.data;
  const createdAt = new Date().toISOString();

  try {
    const result = await pool.query<Transaction>(
      'INSERT INTO transactions (description, type, category, price, createdat) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [description, type, category, price, createdAt]
    );
    res.status(201).json({ message: 'Transação criada com sucesso', transaction: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
};

export default transactionsPost;
