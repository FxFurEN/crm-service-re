import Providers from "@/components/progress-provider";
import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className="h-full w-full flex flex-col gap-y-10">
      <Navbar/>
        <main  className="sm:ml-20">
        <Providers>{children}</Providers>
        </main>
    </div>
   );
}
 
export default ProtectedLayout;