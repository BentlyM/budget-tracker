'use client';

import React, { useState } from 'react';
import { UserSettings } from '@prisma/client';
import { differenceInDays, startOfMonth } from 'date-fns';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants';
import { toast } from 'sonner';
import StatsCards from './StatsCards';
import CategoriesStats from './CategoriesStats';

const Overview = ({ userSettings }: { userSettings: UserSettings }) => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      <div className="flex justify-center">
        <div className="container flex flex-warp items-end justify-between gap-2 py-6">
          <h2 className="flex items-center gap-3">Overview</h2>
          <div className="flex items-center gap-3">
            <DateRangePicker
              initialDateFrom={dateRange.from}
              initialDateTo={dateRange.to}
              showCompare={false}
              onUpdate={(values) => {
                const { from, to } = values.range;

                if (!from || !to) return;
                if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                  toast.error(
                    `the selected date range is to big. MAX allowed range is ${MAX_DATE_RANGE_DAYS} days`
                  );
                  return;
                }

                setDateRange({ from, to });
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container flex w-full flex-col gap-2">
          <StatsCards
            userSettings={userSettings}
            from={dateRange.from}
            to={dateRange.to}
          />

          <CategoriesStats
            userSettings={userSettings}
            from={dateRange.from}
            to={dateRange.to}
          />
        </div>
      </div>
    </>
  );
};

export default Overview;
