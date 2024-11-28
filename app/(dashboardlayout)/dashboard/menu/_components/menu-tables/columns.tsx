'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Badge } from '@/components/ui/badge';
import { Menu } from '@/types/menu';

export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: 'productName',
    header: '商品名'
  },
  {
    accessorKey: 'workingHours',
    header: '作業時間'
  },
  {
    accessorKey: 'description',
    header: '説明'
  },
  {
    accessorKey: 'category',
    header: 'カテゴリ',
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.category.map((cat: string) => (
          <Badge key={cat} className="bg-blue-700 text-white">
            {cat}
          </Badge>
        ))}
      </div>
    )
  },
  {
    accessorKey: 'tags',
    header: 'タグ',
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.tags.map((cat: string) => (
          <Badge key={cat} className="bg-orange-500 text-white">
            {cat}
          </Badge>
        ))}
      </div>
    )
  },
  {
    accessorKey: 'price',
    header: '価格',
    cell: ({ row }) => `¥${row.original.price.toLocaleString()}`
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
