import { Breadcrumbs } from '@mantine/core';
import { RxSlash } from 'react-icons/rx';
import { Link } from 'react-router-dom';

interface Props {
   items: { title: string; href: string }[];
}
export default function CustomBreadcrumbs({ items }: Props) {
   const breadcrumbItems = items.map((item, index) => (
      <Link to={item.href} key={index} className="text-[#5D6E8B] text-base">
         {item.title}
      </Link>
   ));

   return (
      <Breadcrumbs separator={<RxSlash />} classNames={{ breadcrumb: ' font-semibold' }} mb="lg">
         {breadcrumbItems}
      </Breadcrumbs>
   );
}
