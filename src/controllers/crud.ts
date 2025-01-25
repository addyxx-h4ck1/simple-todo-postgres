import { Request, Response } from 'express';
import pool from '../database/conn.js';

export const addTodo = async (req: Request, res: Response): Promise<any> => {
  const client = await pool.connect();
  try {
    const { todo } = req.body;

    if (!todo)
      return res.status(400).json({
        ok: false,
        err: 'Todo not provided',
      });

    const newTodo = await client.query('INSERT INTO todos (todo) VALUES($1)', [
      todo,
    ]);

    res.status(201).json({
      ok: true,
      msg: 'Todo Added!',
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      ok: false,
      err: error?.message || 'server error',
    });
  } finally {
    client.release();
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<any> => {
  const client = await pool.connect();
  const { id } = req.params;
  if (!id)
    return res.status(400).json({
      ok: false,
      err: 'Invalid todo ID',
    });

  try {
    const update = await client.query('DELETE FROM todos WHERE todo_id = $1', [
      id,
    ]);
    res.status(200).json({
      ok: true,
      msg: 'Task deleted!',
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      ok: false,
      err: error?.message || 'server error',
    });
  } finally {
    client.release();
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<any> => {
  const client = await pool.connect();
  const { id } = req.params;
  if (!id)
    return res.status(400).json({
      ok: false,
      err: 'Invalid todo ID',
    });

  try {
    const update = await client.query(
      'UPDATE todos SET completed = true WHERE todo_id = $1 ',
      [id],
    );
    res.status(200).json({
      ok: true,
      msg: 'Task Completed!',
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      ok: false,
      err: error?.message || 'server error',
    });
  } finally {
    client.release();
  }
};
