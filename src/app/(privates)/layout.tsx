import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

interface RootLayoutProps {
  children: React.ReactNode;
}
 
export default function PrivateLayout({children}: RootLayoutProps) {
  return (
    <>
    <Provider>
      <Navbar/>
      {children}
    </Provider>
      
    </>
  )
}

