"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { User } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"; 

export const UserButton = () => {
  const [loading, setLoading] = useState(true); 
  const user = useCurrentUser();

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {loading ? ( 
            <Skeleton className="h-12 w-12 rounded-full" />
          ) : (
            <>
              {user?.image ? (
                <AvatarImage src={user.image} alt="User avatar" />
              ) : (
                <AvatarFallback>
                  {user?.name?.split(' ').map(n => n[0]).join('') ?? 'Default Name'}
                </AvatarFallback>
              )}
            </>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem asChild>
          <Link href="/settings/profile">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2"/>
              Профиль
            </div>
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Выйти
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
