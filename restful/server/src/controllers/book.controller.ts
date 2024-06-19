import { Router, Request, Response } from 'express';
import prisma from '../config/prisma';
import ApiResponse from '../utils/ApiResponse';
import { handleErrorResponse } from '../utils/errorHandler';
import { authMiddleware } from '../middlewares/auth.middleware';
import { bookSchema } from '../validations/schemas';

const bookRouter = Router();

bookRouter.get('/', authMiddleware, async (req: Request, res: Response) => {
   /* #swagger.tags = ['Book'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
   try {
      const books = await prisma.book.findMany();
      res.status(200).json(new ApiResponse(books, 'Books fetched successfully', true));
   } catch (error: any) {
      handleErrorResponse(res, error);
   }
});

bookRouter.post('/', async (req: Request, res: Response) => {
   /* #swagger.tags = ['Book'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
   try {
      const { name, author, publisher, publicationYear, subject } = req.body;
      await bookSchema.parseAsync(req.body);
      const books = await prisma.book.create({
         data: {
            name,
            author,
            publicationYear,
            publisher,
            subject,
         },
      });
      res.status(200).json(new ApiResponse(books, 'Books fetched successfully', true));
   } catch (error: any) {
      handleErrorResponse(res, error);
   }
});

export default bookRouter;
