import Navbar from "./_components/navbar";
import { Navheader } from "./_components/navheader";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
      <Navbar/>
      <Navheader />
      {children}
    </div>
   );
}
 
export default ProtectedLayout;