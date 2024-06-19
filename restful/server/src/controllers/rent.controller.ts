import { Router } from 'express';
import { UserRequest } from '../types';
import prisma from '../config/prisma';
import { handleErrorResponse } from '../utils/errorHandler';

const rentRouter = Router();

rentRouter.post('/borrow/:bookId', async (req: UserRequest, res) => {
   const userId = req.user?.id;
   try {
      const bookId = req.params.bookId;
      const borrowUser = await prisma.student.findUnique({ where: { id: userId } });
      if (!borrowUser) return res.status(404).json({ message: 'User not found' });
      // const newRent = await prisma.rentBook.create({
      //    data: {
      //       studentId: userId,

      //    }
      // })
   } catch (error) {
      handleErrorResponse(res, error);
   }
});
