'use client';

import { Column } from '@tanstack/react-table';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDown,
  EyeOff
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === 'desc'
                ? `降順でソート済み。クリックで昇順に変更。`
                : column.getIsSorted() === 'asc'
                ? `昇順でソート済み。クリックで降順に変更。`
                : `ソートされていません。クリックで昇順に変更。`
            }
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            aria-label="昇順でソート"
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUpIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            昇順
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="降順でソート"
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDownIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            降順
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            aria-label="この列を非表示"
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOff
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            非表示
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
