import { rem, Button } from '@mantine/core';
import { FaHome, FaSearch } from 'react-icons/fa';
import { SpotlightActionData, Spotlight, spotlight } from '@mantine/spotlight';

function MainSpotlight() {
   const actions: SpotlightActionData[] = [
      {
         id: 'home',
         label: 'Home',
         description: 'Get to home page',
         onClick: () => console.log('Home'),
         leftSection: <FaHome style={{ width: rem(24), height: rem(24) }} />,
      },
   ];
   return (
      <>
         <Button onClick={spotlight.open}>Open spotlight</Button>
         <Spotlight
            actions={actions}
            nothingFound="Nothing found..."
            highlightQuery
            searchProps={{
               leftSection: <FaSearch style={{ width: rem(20), height: rem(20) }} />,
               placeholder: 'Search...',
            }}
         />
      </>
   );
}
