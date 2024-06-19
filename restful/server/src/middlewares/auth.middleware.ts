import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserRequest } from '../types';
import ApiResponse from '../utils/ApiResponse';

export const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
   const token = req.header('Authorization');
   if (!token) return res.status(401).json(new ApiResponse(null, 'Access Denied', false));
   //    console.log('token', token);
   try {
      const _tkn = token.split(' ')[1];
      const verified = jwt.verify(_tkn, process.env.TOKEN_SECRET!);
      req.user = verified;
      next();
   } catch (err) {
      res.status(400).json(new ApiResponse(null, 'Invalid Token', false));
   }
};
