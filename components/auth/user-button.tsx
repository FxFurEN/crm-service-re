"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation";

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

export const UserButton = () => {
  const user = useCurrentUser();
  const router = useRouter();

  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    } else {
      return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
    }
  };
  

  const redirectToProfile = () => {
    router.push("/settings/profile");
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user?.image ? (
            <AvatarImage src={user.image} alt="User avatar" />
          ) : (
            <AvatarFallback style={{ backgroundColor: 'white' }}>{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem onClick={redirectToProfile}>
            <User className="h-4 w-4 mr-2"/>
            Профиль
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

