import { Router } from 'express';
import todosRoutes from './todos';

const router = Router();

router.use('/todos', todosRoutes);

export default router;