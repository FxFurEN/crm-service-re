"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const SettingsPage = () => {
  return ( 
    <>
        <p className="text-2xl font-semibold text-center">
          ⚙️ Настройки
        </p>
        <div className="flex justify-center mt-8">
          <Link href="/settings/profile">
            <Button className="mr-4">Профиль</Button>
          </Link>
          <Link href="/settings//employees">
            <Button className="mr-4">Сотрудники</Button>
          </Link>
          <Link href="/settings//position">
            <Button className="mr-4">Должность</Button>
          </Link>
        </div>
    </>
   );
}
 
export default SettingsPage;