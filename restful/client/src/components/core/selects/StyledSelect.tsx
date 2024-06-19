import { cn } from '@/utils/cn';
import { Select, SelectProps, SelectStylesNames } from '@mantine/core';
import { FaChevronDown } from 'react-icons/fa';

interface Props extends SelectProps {
   classNames?: { [key in SelectStylesNames]?: string };
}

/**
 * A custom select as design suggests
 * @param props Mantine Props
 * @author Ndungutse Charles
 */
const StyledSelect = (props: Props) => {
   const { classNames, radius, rightSection, ...rest } = props;
   const { input, label, ...otherCls } = classNames ?? {};
   return (
      <div>
         <Select
            classNames={{
               input: cn(input, ' border-0 border-b border-slate-900'),
               label: cn(label, ' font-semibold'),
               ...otherCls,
            }}
            radius={radius ?? 0}
            rightSection={rightSection ?? <FaChevronDown size={12} className=" text-slate-900" />}
            {...rest}
         />
      </div>
   );
};

export default StyledSelect;
