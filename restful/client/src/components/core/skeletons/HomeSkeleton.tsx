import { Flex, Skeleton } from '@mantine/core';

const HomeSkeleton = () => {
   return (
      <div className="flex w-full gap-6 flex-col">
         <Flex justify={'space-between'} align={'center'}>
            <Skeleton h={60} w={200} />
            {/* <Skeleton h={40} w={40} radius={100} /> */}
         </Flex>
         <Flex gap={10} mt={10}>
            <Skeleton h={150} w={'100%'} />
            <Skeleton h={150} w={'100%'} />
            <Skeleton h={150} w={'100%'} />
         </Flex>
         <Flex gap={5} mt={10}>
            <Skeleton h={400} w={'100%'} />
            <Skeleton h={400} w={'100%'} />
         </Flex>
         <Skeleton h={300} mt={10} w={'100%'} />
      </div>
   );
};

export default HomeSkeleton;
