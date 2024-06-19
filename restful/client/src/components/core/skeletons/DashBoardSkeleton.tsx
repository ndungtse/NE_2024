import { Flex, Skeleton } from '@mantine/core';

/**
 * Renders a skeleton component for the dashboard.
 *
 * @return {JSX.Element} The skeleton component for the dashboard.
 */
const DashBoardSkeleton = () => {
   return (
      <div className="flex w-full gap-6 flex-col">
         <Flex justify={'space-between'} align={'center'}>
            <Skeleton h={60} w={200} />
            {/* <Skeleton h={40} w={40} radius={100} /> */}
         </Flex>
         <Skeleton h={800} mt={10} w={'100%'} />
      </div>
   );
};

export default DashBoardSkeleton;
