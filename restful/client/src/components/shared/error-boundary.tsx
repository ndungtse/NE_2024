import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
// import Logo from './logo';
import { notifications } from '@mantine/notifications';

class ErrorBoundary extends React.Component<
   { children: React.ReactNode },
   {
      hasError: boolean;
      handleReload: () => void;
      handleGoBack: () => void;
      error: Error | null;
   }
> {
   constructor(props: any) {
      super(props);
      this.state = {
         hasError: false,
         handleReload: () => {
            window.location.reload();
         },
         handleGoBack: () => {
            window.history.back();
         },
         error: null,
      };
   }

   static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
   }

   componentDidCatch(error: Error, errorInfo: any) {
      console.log(error, errorInfo);
      this.setState({ error });
      notifications.show({
         title: 'An error occured',
         message: error.message ?? 'An error occured, contact the development team for support',
         color: 'red',
         icon: <MdErrorOutline size={30} />,
      });
   }

   static handleReload() {
      window.location.reload();
   }

   render() {
      if (this.state.hasError) {
         return (
            <div className="flex items-center justify-center min-h-screen">
               <div className="flex flex-col gap-4 items-center">
                  {/* <Logo textClassName=" text-black" /> */}
                  <div className="flex items-center gap-2 w-fit">
                     <i className="text-red-500">
                        <MdErrorOutline size={30} />
                     </i>
                     <h1 className="text-4xl font-bold">An error occured </h1>
                  </div>
                  <p>
                     This action didn't go as planned, contact the{' '}
                     <a className=" underline underline-offset-8 cursor-pointer">development team</a> for support
                  </p>
                  <p>Error: {this.state.error?.message}</p>
                  <div className="flex items-center gap-2 w-fit">
                     <button className=" text-primary rounded-full w-fit px-6 py-2" onClick={this.state.handleReload}>
                        Reload
                     </button>
                     <button className="  bg-white rounded-full w-fit px-6 py-2" onClick={this.state.handleGoBack}>
                        Go back
                     </button>
                  </div>
               </div>
            </div>
         );
      }

      return this.props.children;
   }
}

export default ErrorBoundary;