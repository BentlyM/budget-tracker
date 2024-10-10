import { currentUser } from '@clerk/nextjs/server';
import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import CreateTransactionDialog from './_components/CreateTransactionDialog';
import Overview from './_components/Overview';
import History from './_components/History';

const Page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect('/wizard');
  }
  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card flex justify-center">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3x1 font-bold">
            Hello, {user.firstName || 'anonymous'}!
          </p>

          <div className="flex items-center gap-3">
            <CreateTransactionDialog
              trigger={
                <Button
                  variant={'outline'}
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white hover:from-emerald-500 hover:to-emerald-700"
                >
                  New income
                </Button>
              }
              type="income"
            />
            <CreateTransactionDialog
              trigger={
                <Button
                  variant={'outline'}
                  className="bg-gradient-to-r from-rose-400 to-rose-600 text-white hover:from-rose-500 hover:to-rose-700"
                >
                  New expense
                </Button>
              }
              type="expense"
            />
          </div>
        </div>
      </div>

      <Overview userSettings={userSettings} />
      <History userSettings={userSettings} />
    </div>
  );
};

export default Page;
