import React from 'react';
import { Anchor, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';

interface Props {
   children: React.ReactNode;
}

const AppProvider = ({ children }: Props) => {
   return (
      <MantineProvider
         theme={{
            colors: {
               brand: [
                  '#FFD6E0',
                  '#FFB2D1',
                  '#FF8EC2',
                  '#FF6AB3',
                  '#FF46A4',
                  '#FF2295',
                  '#1877F2',
                  '#1877F2',
                  '#1877F2',
                  '#C50E82',
                  '#AD1374',
               ],
            },
            primaryColor: 'brand',
            components: {
               Anchor: Anchor.extend({
                  defaultProps: {
                     underline: 'never',
                  },
               }),
            },
            // fontSizes: {
            //    xs: rem(10 + 8),
            //    sm: rem(11 + 8),
            //    md: rem(14 + 8),
            //    lg: rem(16 + 8),
            //    xl: rem(20 + 8),
            // },
         }}
         defaultColorScheme="light"
      >
         <Notifications position="top-right" />
         {children}
      </MantineProvider>
   );
};

export default AppProvider;
