'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { TransactionType } from '@/lib/types';
import { Category } from '@prisma/client';
import { PopoverContent } from '@radix-ui/react-popover';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import CreateCategoryDialog from './CreateCategoryDialog';
import { CommandGroup, CommandItem } from 'cmdk';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  type: TransactionType;
  value?: string; // Optional value prop
  onChange: (value: string) => void;
}

const CategoryPicker = ({ type, onChange, value: propValue }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(propValue || '');

  // Update local state when the prop value changes
  useEffect(() => {
    if (propValue !== value) {
      setValue(propValue || '');
    }
  }, [propValue]);

  const categoriesQuery = useQuery({
    queryKey: ['categories', type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  );

  const successCallback = useCallback(
    (category: Category) => {
      setValue(category.name);
      onChange(category.name); // Notify parent of change
      setOpen(false);
    },
    [onChange]
  );

  const handleCategorySelect = (category: Category) => {
    setValue(category.name);
    onChange(category.name); // Notify parent of change
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            'Select category'
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search category" />
          <CreateCategoryDialog type={type} successCallback={successCallback} />
          <CommandEmpty>
            <p>Category not found</p>
            <p className="text-xs text-muted-foreground">
              Tip: create a new category
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categoriesQuery.data &&
                categoriesQuery.data.map((category: Category) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => handleCategorySelect(category)}
                    className="flex items-center hover:opacity-50 cursor-pointer"
                  >
                    <CategoryRow category={category} />
                    <Check
                      className={cn(
                        'ml-auto w-4 h-4 opacity-0',
                        value === category.name && 'opacity-100'
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryPicker;

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  );
}
