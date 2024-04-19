"use client";

import { UserButton } from "@/components/auth/user-button";

export const Navheader = () => {

  return (
    <nav className="fixed bg-secondary flex justify-between items-center p-4  rounded-xl w-[100%] shadow-sm h-[3.5em]">
      <div className="flex gap-x-2 ml-20">
      </div>
      <UserButton />
    </nav>
  );
};
