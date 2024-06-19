import { Router } from 'express';
import AuthRouter from './controllers/auth.controller';
import userRouter from './controllers/user.controller';
import { authMiddleware } from './middlewares/auth.middleware';
import studentRouter from './controllers/student.controller';
import bookRouter from './controllers/book.controller';

const router = Router();

router.use('/api/auth', AuthRouter);
router.use('/api/user', authMiddleware, userRouter);
router.use('/api/students', authMiddleware, studentRouter);
router.use('/api/books', bookRouter);

export default router;
