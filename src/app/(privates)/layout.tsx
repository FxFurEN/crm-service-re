import Navbar from "@/components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}
 
export default function PrivateLayout({children}: RootLayoutProps) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  )
}

