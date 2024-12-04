'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/ui/table/data-table-view-options';
import { DataTableFacetedFilter } from '@/components/ui/table/data-table-faceted-filter';
import { Menu } from '@/types/menu';

interface DataTableToolbarProps {
  table: Table<Menu>;
  data: Menu[];
}

export function DataTableToolbar({ table, data }: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const getAllUniqueValuesWithCount = (key: 'category' | 'tags') => {
    if (!data || !Array.isArray(data)) return [];
    const valueCount = data.reduce(
      (acc, item) => {
        const values = item[key] || [];
        values.forEach((value) => {
          acc[value] = (acc[value] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    );
    return Object.entries(valueCount).map(([value, count]) => ({
      label: value,
      value: value,
      count: count
    }));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="商品名で検索..."
          value={
            (table.getColumn('productName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('productName')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('category') && (
          <DataTableFacetedFilter
            column={table.getColumn('category')}
            title="カテゴリ"
            options={getAllUniqueValuesWithCount('category')}
          />
        )}
        {table.getColumn('tags') && (
          <DataTableFacetedFilter
            column={table.getColumn('tags')}
            title="タグ"
            options={getAllUniqueValuesWithCount('tags')}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            リセット
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
