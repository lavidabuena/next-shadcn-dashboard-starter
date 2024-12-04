'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/DataTableColumnHeader';
import { Menu } from '@/types/menu';

export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: 'productName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="商品名" />
    )
  },
  {
    accessorKey: 'workingHours',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="作業時間" />
    ),
    cell: ({ row }) => `${row.getValue<number>('workingHours')} 分`
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="説明" />
    )
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="カテゴリ" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.getValue<string[]>('category').map((cat) => (
          <Badge key={cat} variant="outline">
            {cat}
          </Badge>
        ))}
      </div>
    ),
    filterFn: (row, id, value: string[]) => {
      const categories = row.getValue<string[]>(id);
      return value.some((val) => categories.includes(val));
    }
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="タグ" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.getValue<string[]>('tags').map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    ),
    filterFn: (row, id, value: string[]) => {
      const tags = row.getValue<string[]>(id);
      return value.some((val) => tags.includes(val));
    }
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
