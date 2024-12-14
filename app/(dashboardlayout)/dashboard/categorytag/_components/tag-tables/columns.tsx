'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Tag } from '@/types/tag';
import { CellAction } from './cell-action';
import { DataTableColumnHeader } from '@/components/ui/table/DataTableColumnHeader';

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="タグ名" />
    )
  },
  {
    accessorKey: 'createAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="作成日時" />
    ),
    cell: ({ row }) => row.getValue<Date>('createAt')?.toLocaleString()
  },
  {
    accessorKey: 'updateAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="更新日時" />
    ),
    cell: ({ row }) => row.getValue<Date>('updateAt')?.toLocaleString()
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
