import { Request, Response } from 'express';
import { getDir } from '../libs/get-dir.js';
import path from 'path';
import pool from '../database/conn.js';

export const handleRoot = async (req: Request, res: Response) => {
  res.sendFile(path.join(getDir(), '..', '..', '/public/pages/index.html'));
};

export const handleEditPage = async (req: Request, res: Response) => {
  res.sendFile(path.join(getDir(), '..', '..', '/public/pages/edit.html'));
};

export const getTodos = async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const { rows }: any = await client.query('SELECT * FROM todos');
    res.status(200).json({
      ok: true,
      data: rows,
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      err: error?.message || 'Failed to get todos',
    });
  } finally {
    client.release();
  }
};
