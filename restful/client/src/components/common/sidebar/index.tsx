import { showSidebarState } from '@/utils/atoms';
import { ActionIcon, Drawer } from '@mantine/core';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import NavbarItems from './navbar-items';
import { BiX } from 'react-icons/bi';

interface SideBarProps {
   eRoutes?: any[];
}

const Sidebar: FC<SideBarProps> = () => {
   const [opened, setOpened] = useRecoilState(showSidebarState);

   const close = () => setOpened(false);

   return (
      <>
         <Drawer classNames={{ body: 'h-full flex flex-col relative' }} opened={opened} onClose={close} size="xs" withCloseButton={false}>
            <ActionIcon variant='light' className="!absolute top-2 right-2" onClick={close}>
               <BiX size={30} />
            </ActionIcon>
            <NavbarItems />
            {/* </div> */}
         </Drawer>
         <div className="bg-white border-r sticky top-0  lg:min-w-[230px] min-w-full rounded-2xl py-4 lg:flex hidden flex-col">
            <NavbarItems />
         </div>
      </>
   );
};

// const WithSubRoutes: FC<{
//    route: any;
//    path: string;
//    opened: string;
//    setOpened: any;
// }> = ({ route, path, opened, setOpened }) => {
//    const isActiveLink = (linkPath: string) => path.startsWith(linkPath);
//    return (
//       <div key={route.name} className="w-full relative flex flex-col">
//          <Menu width={220} withArrow shadow="lg">
//             <Menu.Target>
//                <button
//                   className={`${isActiveLink(route.path)
//                      ? 'border-t border-l border-r gap-2 text-white rounded-t-xl bg-dark-blue border-medium-blue'
//                      : 'w-full flex flex-row gap-2 items-center px-4  rounded-t-xl hover:bg-dark-blue duration-300 bg-white text-[#008dd4]  hover:text-white'
//                      }
//                      w-full px-4 h-full whitespace-nowrap flex flex-row py-3`}
//                   onClick={() => setOpened(opened === route.name ? '' : route.name)}
//                >
//                   <route.icon size={route.iconSize ?? 20} />
//                   {route.name}
//                   <BiChevronUp
//                      size={25}
//                      className={`ml-auto duration-300 ${opened === route.name ? ' rotate-180' : ' rotate-0'} hover:rotate-180`}
//                   />
//                </button>
//             </Menu.Target>
//             <Menu.Dropdown p={0}>
//                {/*<div className="flex flex-col w-full hover:text-white">*/}
//                {route.routes?.map((subRoute: any, i: number) => (
//                   <Menu.Item p={0} key={i}>
//                      <Link
//                         to={subRoute.path}
//                         className={`${isActiveLink(subRoute.path)
//                            ? 'flex flex-row gap-5 items-center py-3 rounded-lg bg-color-a4 text-medium-blue '
//                            : 'flex flex-row gap-5 items-center py-3 rounded-lg text-[#008dd4] '
//                            } hover:bg-dark-blue hover:text-white px-4`}
//                      >
//                         <subRoute.icon size={subRoute.iconSize ?? 20} />
//                         <p className=" whitespace-nowrap transition-all duration-200">{subRoute.name}</p>
//                      </Link>
//                   </Menu.Item>
//                ))}
//                {/*</div>*/}
//             </Menu.Dropdown>
//          </Menu>
//       </div>
//    );
// };

export default Sidebar;