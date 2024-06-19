import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, rem } from '@mantine/core';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { FlipWords } from '@/components/ui/flip-words';
import { api } from '@/utils/axios.config';
import { notifications } from '@mantine/notifications';
import { getResError } from '@/utils/funcs';
import { useState } from 'react';

const Register = () => {
   const form = useForm({
      mode: 'controlled',
      initialValues: {
         email: '',
         firstName: '',
         lastName: '',
         password: '',
      },
      validate: {
         email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
         password: (value) => (value.length < 6 ? 'Password must be at least 6 characters long' : null),
         firstName: (value) => (value.trim() == '' ? 'FirstName is required' : null),
         lastName: (value) => (value.trim() == '' ? 'LastName is required' : null),
      },
   });
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const onSubmit = async (values: typeof form.values) => {
      console.log(values);
      setLoading(true);
      try {
         const res = await api.post('/auth/register', values);
         const data = res.data;
         notifications.show({
            message: data.message,
            color: 'green',
         });
         navigate('/auth/login');
      } catch (error) {
         console.log(error);
         notifications.show({
            message: getResError(error),
            color: 'red',
         });
      }
      setLoading(false);
   };

   const words = ['Enhance yours', 'Dream Big', 'Discover More', 'Lend Books'];

   return (
      <div className=" w-full flex md:flex-row flex-col min-h-screen">
         <div className="md:w-1/2 w-full md:min-h-screen overflow-hidden flex-1 p-2 items-center justify-center flex flex-col relative">
            <div className="w-[379px] h-[379px] left-0 top-[765px] absolute bg-indigo-500 rounded-full blur-[550px]" />
            <div className="w-[379px] h-[379px] left-[585px] top-[-136px] absolute bg-indigo-500 rounded-full blur-[550px]" />
            <span className=" text-4xl leading-relaxed max-w-2xl">
               <FlipWords className=" font-bold !text-primary" words={words} /> now with our library management system!
            </span>
         </div>
         <div className="md:w-1/2 w-full flex flex-col min-h-screen justify-center items-center">
            <form
               onSubmit={form.onSubmit((values) => onSubmit(values))}
               className="flex gap-y-3 w-full max-w-lg flex-col px-14 rounded-lg bg-white p-8"
            >
               <h1 className=" text-start text-2xl font-semibold">Create An account</h1>
               <TextInput
                  size="md"
                  withAsterisk
                  label="FirstName"
                  className="mt-3"
                  placeholder="FirrstName"
                  {...form.getInputProps('firstName')}
                  key={form.key('firstName')}
               />
               <TextInput
                  size="md"
                  withAsterisk
                  label="LastName"
                  className="mt-3"
                  placeholder="LastName"
                  {...form.getInputProps('lastName')}
                  key={form.key('lastName')}
               />
               <TextInput
                  size="md"
                  withAsterisk
                  label="Email"
                  className="mt-3"
                  placeholder="Email"
                  {...form.getInputProps('email')}
                  key={form.key('email')}
               />
               <PasswordInput
                  size="md"
                  withAsterisk
                  visibilityToggleIcon={({ reveal }) => (reveal ? <FaEye /> : <FaEyeSlash />)}
                  type="password"
                  label="Password"
                  className="mt-2"
                  placeholder="Password"
                  {...form.getInputProps('password')}
                  key={form.key('password')}
               />
               <Button mt={rem(28)} loading={loading} disabled={loading} className="py-2" size="md" type="submit">
                  Create Account
               </Button>
               <p className="text-center mt-11">
                  Already have an account?{' '}
                  <Link className=" text-primary" to="/auth/login">
                     Login
                  </Link>
               </p>
            </form>
         </div>
      </div>
   );
};

export default Register;
