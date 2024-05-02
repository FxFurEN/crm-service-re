import Navbar from "./_components/navbar";
import { Navheader } from "./_components/navheader";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className="h-full w-full flex flex-col gap-y-10">
      <Navbar/>
      <Navheader />
        <main  className="mt-20">
        {children}
        </main>
    </div>
   );
}
 
export default ProtectedLayout;