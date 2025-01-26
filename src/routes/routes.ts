import { Router } from 'express';
import { getTodos, handleEditPage, handleRoot } from '../controllers/root';
import {
  addTodo,
  deleteTodo,
  getSingleTodo,
  handleChangeTask,
  updateTodo,
} from '../controllers/crud';

const router = Router();

router.get('/', handleRoot);
router.get('/todo/:id', handleEditPage);
router.get('/todos', getTodos);
router.get('/todos/:id', getSingleTodo);
router.post('/create', addTodo);
router.delete('/delete/:id', deleteTodo);
router.patch('/update/:id', updateTodo);
router.patch('/change-task/:id', handleChangeTask);

export default router;
