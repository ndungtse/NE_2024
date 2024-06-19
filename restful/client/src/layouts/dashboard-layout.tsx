import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/sidebar';
import { Suspense } from 'react';
import DashBoardSkeleton from '../components/core/skeletons/DashBoardSkeleton';
import Navbar from '../components/common/Navbar';

export default function DashboardLayout({ routes }: { routes?: any[] }) {
   return (
      <div className={'w-full h-screen overflow-y-auto flex flex-row bg-light'}>
         <Sidebar eRoutes={routes} />
         <div className=" flex flex-col w-full">
            <Navbar />
            <Suspense fallback={<DashBoardSkeleton />}>
               <div className="flex flex-1">
                  <Outlet />
               </div>
            </Suspense>
         </div>
      </div>
   );
}