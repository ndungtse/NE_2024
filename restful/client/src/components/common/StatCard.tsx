import { IStatsCardProps } from '@/utils/types';

interface Props extends IStatsCardProps { }

const StatCard = ({ title, value, color }: Props) => {

   return (
      <div className="px-4 py-4 rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white ">
         <div className="flex flex-row gap-2 ">
            <div className="flex gap-x-4">
               <div
                  className="rounded-full h-18 w-2"
                  style={{
                     backgroundColor: color,
                  }}
               />
               <div className="flex flex-col gap-1">
                  <span
                     className="text-slate-600 font-bold text-lg "
                     style={{
                        color: color,
                     }}
                  >
                     {title}
                  </span>
                  <span
                     className="font-semibold text-3xl flex "
                     style={{
                        color: color,
                     }}
                  >
                     {String(value).toLocaleString()}
                  </span>
               </div>
            </div>
            <div
               className="p-1 rounded-md w-fit h-fit"
               style={{
                  backgroundColor: `${color}10`,
               }}
            ></div>
         </div>
      </div>
   );
};

export default StatCard;
