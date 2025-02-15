"use client"

import Logo from "@/app/assets/svgs/logo";

import { Heart, LogOut, ShoppingBag } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContex";


export default function Navbar() {

  const { user, setIsLoading } = useUser()

  const handleLogOut = () => {
    logout()
    setIsLoading(true)
  }



  return (
    <header className="border-b w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <h1 className="text-2xl font-black flex items-center">
          <Logo />
          Next Mart
        </h1>
        <div className="max-w-md  flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
          />
        </div>
        <nav className="flex gap-2">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <Heart />
          </Button>
          <Button variant="outline" className="rounded-full p-0 size-10">
            <ShoppingBag />
          </Button>
          {user ? <>
            <Link href='/create-shop'>
              <Button variant="secondary" >
                Create Shop
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger><Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer bg-red-600 text-white" onClick={handleLogOut}>
                  <LogOut></LogOut>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </> : <Link href='/login'>
            <Button variant="secondary" >
              Login
            </Button>
          </Link>

          }
        </nav>
      </div>
    </header>
  );
}