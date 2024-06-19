import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   name?: string;
   value?: string | number;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   type?: React.HTMLInputTypeAttribute;
   label?: string;
   error?: string;
   leftSection?: React.ReactNode;
   children?: React.ReactNode;
   className?: string;
   inputClassName?: string;
   alwaysFocused?: boolean;
   description?: string;
   labelClassName?: string;
}

/**
 * @param props
 * @author Ndungutse Charles
 */
const CustomInput = (props: CustomInputProps) => {
   const { label, error, leftSection, children, className, inputClassName, description, labelClassName, ...others } = props;
   const [showPassword, setShowPassword] = React.useState(false);
   const [type, setType] = React.useState(others.type);

   const handleShowPassword = () => {
      setShowPassword(!showPassword);
      setType(showPassword ? 'password' : 'text');
   };

   return (
      <div className="flex w-full text-slate-900 flex-col">
         <label htmlFor={others.id} className="font-semibold text-sm focus:text-primary">
            {label}
         </label>
         {children ?? (
            <div className=" flex gap-0 relative">
               <input
                  {...others}
                  id={others.id}
                  type={type}
                  className=" border-b w-full pr-8 border-slate-900 focus:border-primary outline-none duration-300  p-2 pt-1 pl-1"
               ></input>
               <div className="absolute right-2 top-0 h-full flex items-center">
                  {leftSection}
                  {others.type === 'password' &&
                     (showPassword ? (
                        <FaEyeSlash className="cursor-pointer text-gray-500 text-lg" onClick={handleShowPassword} />
                     ) : (
                        <FaEye className="cursor-pointer text-gray-500 text-lg" onClick={handleShowPassword} />
                     ))}
               </div>
            </div>
         )}
         {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
         {description && <div className="text-slate-500 text-sm mt-1">{description}</div>}
      </div>
   );
};

export default CustomInput;
