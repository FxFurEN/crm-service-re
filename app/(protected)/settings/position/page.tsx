"use client";

import { useRouter } from 'next/navigation';
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";

const PositionPage = () => {
  const router = useRouter();
  const role = useCurrentRole();

  if (role === UserRole.USER) {
    router.back(); 
  }

  return ( 
    <>
        <p className="text-2xl font-semibold text-center">
          Должности
        </p>
    </>
   );
}
 
export default PositionPage;
