"use client"

import React, { useState } from 'react'
import { VideoIcon, MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { menuItem } from '@/constants'
import { useSession, signOut } from "next-auth/react"

 
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
 const { data: session, status } = useSession()
  const isLoggedIn = status === "authenticated"
  return (
    <nav className=" shadow-sm sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black  backdrop-blur-md  border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side: Logo */}
          <div className="flex items-center">
            <VideoIcon className="h-8 w-8 text-purple-600  dark:text-purple-500" />

            <span className="ml-2 text-xl bg-gradient-to-r font-bold bg-clip-text  from-purple-600 to-indigo-600 dark:from-purple-400  dark:to-pink-500 text-transparent">
              NextAuth
            </span>
          </div>

          {/* Middle: Desktop navigation links */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItem.map((item,index)=>(
                <Link href={item.path} key={index} className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              {item.label}
            </Link>
            ))}
           
          </div>

          {/* Right side: Login, Sign Up, ThemeSwitcher */}
          <div className="flex items-center space-x-4">
            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {isLoggedIn ? (
                      <button 
                                className="w-full text-white px-4 py-2 rounded-md border border-white hover:bg-white hover:text-black transition"

                      onClick={() => signOut({ callbackUrl: '/login' })}>Log Out</button>

              ) : (
                <>
                 <Link href="/login">
            <button className="text-white px-4 py-2 rounded-md border border-white hover:bg-white hover:text-black transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="text-black px-4 py-2 rounded-md bg-white hover:bg-gray-200 transition">
              SignUp
            </button>
          </Link>
                </>
              )}
            </div>

            {/* Theme Switcher */}
            {/* <ThemeSwitcher /> */}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 focus:outline-none"
              >
                {isMenuOpen ? (
                  <XIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItem.map((item,index)=>(

                <Link href={item.path} key={index} className="  text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400   dark:hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium ">
              {item.label}
            </Link>
            ))}
           
            <div className="flex flex-col space-y-2 px-3 py-2">
               {isLoggedIn ? (
                      <button 
                      className="w-full text-white px-4 py-2 rounded-md border border-white hover:bg-white hover:text-black transition"
                      onClick={() => signOut({ callbackUrl: '/login' })}>LogOut</button>

              ) : (
                <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
        <button className="w-full text-white px-4 py-2 rounded-md border border-white hover:bg-white hover:text-black transition">
          Login
        </button>
      </Link>
       
      <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
        <button className="w-full text-black px-4 py-2 rounded-md bg-white hover:bg-gray-200 transition">
          Sign Up
        </button>
      </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar