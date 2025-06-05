import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {Button} from '../components/ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'
import { checkUser } from '@/lib/checkUser'

const Header =async  () => {
  await checkUser();
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>
      <nav className='container mx-auto flex items-center justify-between py-4 px-4'>
        <Link href='/'>
          <Image src="/logo.png" alt="Logo" width={200} height={60} className='h-12 w-auto object-contain'/>
        </Link>  
        <div className='flex items-center gap-4'>
          <SignedIn>
            <Link href='/dashboard' className='text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2'>
              <Button variant={'outline'}><LayoutDashboard size={18}/> <span className='hidden md:inline'>Dashboard</span>
              </Button>
            </Link>
            <Link href='/dashboard' className='text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2'>
              <Button className='flex items-center gap-2'><PenBox size={18}/> <span className='hidden md:inline'>Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl={'/dashboard'}><Button variant={'outline'}>Sign In</Button></SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={
              {
                elements: {
                  avatarBox: 'h-10 w-10',
                  userButtonAvatarBox: 'h-20 w-20',
                }
              }
            }/>
          </SignedIn>
        </div>    
      </nav>
    </div>
  )
}

export default Header