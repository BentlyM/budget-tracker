'use client';

import React from 'react';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { UserButton } from '@clerk/nextjs';
import { ThemeSwitcherBtn } from './ThemeSwitcherBtn';

const Navbar = () => {
  return (
    <>
      <DesktopNavBar />
    </>
  );
};

const items = [
  { label: 'Dashboard', link: '/' },
  { label: 'Transactions', link: '/transactions' },
  { label: 'Manage', link: '/manage' },
];

function DesktopNavBar() {
  return (
    <div className="hidden border-separate border-b bg-background md:flex justify-center">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center">
          <Logo />
          <div className="flex h-full items-center space-x-4">
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <ThemeSwitcherBtn />
          <UserButton />
        </div>
      </nav>
    </div>
  );
}

function NavbarItem({ link, label }: { link: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div>
      <div className="relative flex items-center">
        <Link
          href={link}
          className={cn(
            buttonVariants({
              variant: 'ghost',
            }),
            'flex justify-center text-lg text-muted-foreground hover:text-foreground',
            isActive && 'text-foreground'
          )}
        >
          {label}
        </Link>
        {isActive && (
          <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-x1 bg-foreground md:block"></div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
