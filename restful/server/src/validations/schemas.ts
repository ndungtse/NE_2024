import { User } from '@prisma/client';
import { ZodError, z } from 'zod';

type genOmit = 'createdAt' | 'updatedAt';
type RegisterDto = Omit<User, genOmit | 'password' | 'verificationToken'>;

export const registerSchema = z.object({
   email: z.string({ required_error: 'Email is Required' }).email('Invalid Email'),
   firstName: z.string({ required_error: 'First Name is Required' }).min(3, 'First Name must be at least 3 characters long'),
   lastName: z.string({ required_error: 'Last Name is Required' }).min(3, 'Last Name must be at least 3 characters long'),
   password: z.string({ required_error: 'Password is Required' }).min(6, 'Password must be at least 6 characters long'),
});
export const loginSchema = z.object({
   email: z.string({ required_error: 'Email is Required' }).email('Invalid Email'),
   password: z.string({ required_error: 'Password is Required' }).min(6, 'Password must be at least 6 characters long'),
});
registerSchema.required();

export const bookSchema = z.object({
   name: z.string({ required_error: 'Name is Required' }),
   publisher: z.string({ required_error: 'Publisher is Required' }),
   author: z.string({ required_error: 'author is Required' }),
   publicationYear: z.string({ required_error: 'publication year is Required' }),
   subject: z.string({ required_error: 'Subject is Required' }),
});
