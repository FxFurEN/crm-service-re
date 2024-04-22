"use client";

import { useRouter } from 'next/navigation';
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";

const EmployeesPage = () => {
  const router = useRouter();
  const role = useCurrentRole();

  if (role === UserRole.USER) {
    router.back(); 
  }

  return ( 
    <>
        <p className="text-2xl font-semibold text-center">
          Сотрудники
        </p>
    </>
   );
}
 
export default EmployeesPage;
