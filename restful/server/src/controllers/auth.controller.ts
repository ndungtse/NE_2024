import bcrypt from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import ApiResponse from '../utils/ApiResponse';
import { handleErrorResponse } from '../utils/errorHandler';
import { loginSchema, registerSchema } from '../validations/schemas';

const AuthRouter = Router();

AuthRouter.post('/register', async (req, res) => {
   /*
    #swagger.tags = ['Auth']
     */
   try {
      const { email, password, firstName, lastName } = req.body;
      await registerSchema.parseAsync(req.body);
      const emailExists = await prisma.student.findUnique({ where: { email } });
      if (emailExists) return res.status(400).json({ message: 'Email already registered' });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.student.create({
         data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
         },
      });
      res.status(201).json(new ApiResponse(user, 'Student created successfully', true));
   } catch (error: any) {
      handleErrorResponse(res, error);
   }
});

AuthRouter.post('/login', async (req, res) => {
   /*
  #swagger.tags = ['Auth']
  # swagger.description = "Login as Student"
    */
   try {
      const { email, password } = req.body;
      await loginSchema.parseAsync(req.body);
      const user = await prisma.student.findUnique({
         where: {
            email,
         },
      });
      if (!user) return res.status(404).json({ message: 'User not found' });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET!);
      res.status(200).json(new ApiResponse({ user, token }, 'Logged in successfully', true));
   } catch (error: any) {
      handleErrorResponse(res, error);
   }
});

// AuthRouter.get('/profile', async(req, res) => {

// })

export default AuthRouter;
