import { CurrencyComboBox } from '@/components/CurrencyComboBox';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { currentUser, EmailAddress } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="container flex max-w-2x1 flex-col items-center justify-center gap-4">
      <div>
        <h1 className="text-center text-3x1">
          Welcome,{' '}
          <span className="m1-2 font-bold">
            {user.firstName ? user.firstName : 'anonymous'}!
          </span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          let &apos;s get started by setting up your currency
        </h2>
        <h3 className="mt-2 text-center text-sm text-mutated-foreground">
          You can change these settings at any time
        </h3>
      </div>
      <Separator />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Set Your Default currency for transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
      <Separator />
      <Button className="w-full" asChild>
        <Link href={'/'}>I&apos;m done! Take me to the Dashboard</Link>
      </Button>
      <div className="mt-8">
        <Logo />
      </div>
    </div>
  );
};

export default page;
