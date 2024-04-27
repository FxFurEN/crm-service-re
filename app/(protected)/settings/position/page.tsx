"use client";

import { useRouter } from 'next/navigation';
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import useRedirectIfUser from '@/hooks/use-redirect-User';

const PositionPage = () => {
  useRedirectIfUser();

  return ( 
    <>
        <p className="text-2xl font-semibold text-center">
          Должности
        </p>
    </>
   );
}
 
export default PositionPage;
