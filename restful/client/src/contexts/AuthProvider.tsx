/* eslint-disable react-refresh/only-export-components */

import { AuthApi } from '@/utils/axios.config';
import { removeCookie } from '@/utils/funcs/cookies';
import { User } from '@/utils/types';
import React, { ReactNode, useContext, useEffect } from 'react';

export const authRoutes = ['/auth/login', '/auth/register'];

interface AuthContextProps {
   user: User | null;
   setUser: React.Dispatch<React.SetStateAction<any>>;
   getProfile: () => Promise<any>;
}

const AuthContext = React.createContext<AuthContextProps>({
   user: null,
   setUser: () => {},
   getProfile: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = React.useState<User | null>(null);
   const [loading, setLoading] = React.useState(true);
   const { pathname } = window.location;

   const getProfile = async () => {
      if (authRoutes.some((path) => pathname?.includes(path))) {
         setLoading(false);
         return;
      }
      try {
         // const decoded = decodeToken();
         // console.log('decoded token', decoded);
         const res = await AuthApi.get(`/students/me`);
         console.log('profile', res);
         setUser(res.data.data);
      } catch (error) {
         console.error('Error getting profile', error);
         removeCookie('token');
      }
      setLoading(false);
   };

   useEffect(() => {
      setLoading(true);
      getProfile();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   if (loading) {
      return <div className=" flex w-full h-screen justify-center items-center">Loading ...</div>;
   }

   return <AuthContext.Provider value={{ user, setUser, getProfile }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
