'use client';

import { Button } from '../../../../components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { useUserStore } from '../../../../stores/userStore';

export function UserNav() {
  const { user } = useUserStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          {user?.username.charAt(0).toUpperCase()}
        </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
