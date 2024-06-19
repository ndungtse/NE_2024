import { Navigate } from 'react-router-dom';

const HomePage = () => {
   return (
      <div className=" font-poppins font-semibold">
         <Navigate to="/books" />
      </div>
   );
};

export default HomePage;
