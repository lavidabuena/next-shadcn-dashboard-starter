'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { useMenuTableFilters } from './use-menu-table-filters';

export default function MenuTableAction() {
  const {
    tagsFilter,
    setTagsFilter,
    categoryFilter,
    setCategoryFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useMenuTableFilters();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataTableSearch
        searchKey="productName"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableFilterBox
        filterKey="tags"
        title="タグ"
        options={[]} // タグのオプションをここに追加
        setFilterValue={setTagsFilter}
        filterValue={tagsFilter}
      />
      <DataTableFilterBox
        filterKey="category"
        title="カテゴリ"
        options={[]} // カテゴリのオプションをここに追加
        setFilterValue={setCategoryFilter}
        filterValue={categoryFilter}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
