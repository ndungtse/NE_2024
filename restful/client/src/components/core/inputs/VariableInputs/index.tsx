import React, { Children } from 'react';
import VarInput from './VarInput';
import { cn } from '@/lib/utils/cn';
import { ActionIcon, Button } from '@mantine/core';
import { BiMinus } from 'react-icons/bi';

interface Props<T> {
   children: React.ReactNode;
   className?: string;
   rightSection?: React.ReactNode;
   leftSection?: React.ReactNode;
   addSection?: React.ReactNode;
   data: T[];
   onChange?: (value: T[]) => void;
}

export interface VarInputContextProps<T = any> {
   data: T;
   onChange: (value: T) => void;
}

export const VarInputContext = React.createContext<VarInputContextProps | null>(null);

/**
 * A variable input container which allows to add more inputs as you want effortlessly
 * @param props props of the component
 * @author Ndungutse Charles
 */
function VariableInputs<T = any>(props: Props<T>) {
   const { children, className, rightSection, leftSection, addSection, data, onChange } = props;
   const convertedChildren = Children.toArray(children) as React.ReactElement[];
   const varInputs = convertedChildren.filter((child) => child.type === VarInput);
   const [inputRows, setInputsRows] = React.useState(data);

   const addInput = () => {
      setInputsRows((prev) => [...prev, {} as any]);
   };

   const removeInput = (index: number) => {
      setInputsRows((prev) => prev.filter((_, i) => i !== index));
   };

   React.useEffect(() => {
      onChange?.(inputRows);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [inputRows]);

   return (
      <div className={cn(className, 'flex w-full gap-2 flex-col')}>
         {inputRows.map((r, i) => (
            <div key={i} className={cn('flex w-full gap-2')}>
               {leftSection}
               <div className="flex w-full gap-2">
                  {varInputs.map((input, index) => {
                     const inputData = r;
                     const onChange = (value: any) => {
                        window.log('value', value);
                        const newData = JSON.parse(JSON.stringify(inputRows)) as typeof inputRows;
                        newData[i] = value;
                        window.log('newData', newData);
                        window.log('oldData', inputRows);
                        setInputsRows(newData);
                     };
                     return (
                        <VarInputContext.Provider value={{ data: inputData, onChange }}>
                           <div key={index} className="flex gap-2 w-full">
                              {input}
                           </div>
                        </VarInputContext.Provider>
                     );
                  })}
               </div>
               <button onClick={() => removeInput(i)} className="p-0 flex items-end">
                  {rightSection ?? (
                     <ActionIcon variant="outline" color="#F20A0A">
                        <BiMinus />
                     </ActionIcon>
                  )}
               </button>
            </div>
         ))}
         {addSection ?? (
            <Button onClick={addInput} className="flex bg-primary text-white border-2 px-5 w-fit mx-auto flex-col text-2xl p-1.5">
               +
            </Button>
         )}
      </div>
   );
}

VariableInputs.Input = VarInput;

export default VariableInputs;
