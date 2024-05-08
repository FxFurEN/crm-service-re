"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import Link from "next/link";

const SettingsPage = () => {
  return ( 
    <>
        <p className="text-2xl font-semibold text-center">
          ⚙️ Настройки
        </p>
        <div className="flex flex-col sm:flex-row justify-center mt-8">
          <Link href="/settings/profile">
            <Button className="mr-4 mb-4 sm:mb-0">Профиль</Button>
          </Link>
          <RoleGate allowedRole={UserRole.ADMIN}>
              <Link href="/settings/employees">
                  <Button className="mr-4 mb-4 sm:mb-0">Сотрудники</Button>
              </Link>
              <Link href="/settings/documents">
                  <Button className="mr-4 mb-4 sm:mb-0">Документы</Button>
              </Link>
              <Link href="/settings/stages">
                  <Button className="mr-4 mb-4 sm:mb-0">Статусы</Button>
              </Link>
          </RoleGate>
        </div>
    </>
   );
}
 
export default SettingsPage;