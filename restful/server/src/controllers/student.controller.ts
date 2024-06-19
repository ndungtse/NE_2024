import { Router } from 'express';
import prisma from '../config/prisma';
import { UserRequest } from '../types';
import ApiResponse from '../utils/ApiResponse';
import { handleErrorResponse } from '../utils/errorHandler';

const studentRouter = Router();

studentRouter.get('/', async (req, res) => {
   /* #swagger.tags = ['Student'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
   try {
      const users = await prisma.student.findMany();
      res.status(200).json(new ApiResponse(users, 'Students fetched successfully', true));
   } catch (error: any) {
      handleErrorResponse(res, error);
   }
});

studentRouter.get('/me', async (req: UserRequest, res) => {
   /* #swagger.tags = ['Student'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
   try {
      const user = await prisma.student.findUnique({
         where: {
            id: req.user.id,
         },
         select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
         },
      });
      if (!user) return res.status(404).json(new ApiResponse(null, 'Student not found', false));
      res.status(200).json(new ApiResponse(user, 'Student fetched successfully', true));
   } catch (error: any) {
      handleErrorResponse(res, error);
   }
});

studentRouter.get('/:id', async (req, res) => {
   /* #swagger.tags = ['Student'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
   try {
      const user = await prisma.student.findUnique({
         where: {
            id: req.params.id,
         },
      });
      if (!user) return res.status(404).json(new ApiResponse(null, 'Student not found', false));
      res.status(200).json(new ApiResponse(user, 'Student fetched successfully', true));
   } catch (error: any) {
      handleErrorResponse(res, error);
   }
});

studentRouter.put('/:id', async (req, res) => {
   /* #swagger.tags = ['Student'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
   try {
      const { email, firstName, lastName } = req.body;
      const user = await prisma.student.update({
         where: {
            id: req.params.id,
         },
         data: {
            email,
            firstName,
            lastName,
         },
      });
      res.status(200).json(new ApiResponse(user, 'Student updated successfully', true));
   } catch (error: any) {
      handleErrorResponse(res, error);
   }
});

studentRouter.delete('/:id', async (req, res) => {
   /* #swagger.tags = ['Student'] */
   /* #swagger.security = [{
            "authToken": []
    }] */
   try {
      await prisma.student.delete({
         where: {
            id: req.params.id,
         },
      });
      res.status(200).json(new ApiResponse(null, 'Student deleted successfully', true));
   } catch (error: any) {
      handleErrorResponse(res, error);
   }
});

export default studentRouter;
