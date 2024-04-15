"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons"

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
import { stringToColor } from "@/lib/stringToColor";

export const UserButton = () => {
  const user = useCurrentUser();

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user?.image ? (
            <AvatarImage src={user.image} alt="User avatar" />
          ) : (
            <AvatarFallback style={{ backgroundColor: stringToColor(user?.name), color: 'white' }}>
              {user?.name ? getInitials(user.name) : <FaUser className="text-white" />}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
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

