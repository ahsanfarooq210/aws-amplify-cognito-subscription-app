import React from 'react'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";
import { Aperture } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {LogOutIcon,UserIcon} from 'lucide-react'
import { useAppContext } from '@/context/AppContext';


const Header = () => {
  const {user,signout}=useAppContext()

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow dark:bg-gray-900">
    <Link to="/" className="flex items-center gap-2">
      <Aperture className="h-6 w-6 text-gray-900 dark:text-gray-100" />
      <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Acme Inc</span>
    </Link>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src='' />
          <AvatarFallback>{user?.signInDetails?.loginId[0]||"U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={signout} >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
  )
}

export default Header