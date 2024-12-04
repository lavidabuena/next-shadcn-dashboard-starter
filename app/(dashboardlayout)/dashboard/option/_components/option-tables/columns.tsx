'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';
import { Option } from '@/types/option';
import { DataTableColumnHeader } from '@/components/ui/table/DataTableColumnHeader';

export const columns: ColumnDef<Option>[] = [
  {
    accessorKey: 'optionName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="オプション名" />
    )
  },
  {
    accessorKey: 'workingHours',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="作業時間" />
    ),
    cell: ({ row }) => `${row.getValue<number>('workingHours')}分`
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="説明" />
    )
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="価格" />
    ),
    cell: ({ row }) => `¥${row.getValue<number>('price').toLocaleString()}`
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
