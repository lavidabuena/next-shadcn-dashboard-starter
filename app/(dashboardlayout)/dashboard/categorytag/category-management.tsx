'use client';

import { useEffect, useState } from 'react';
import {
  selectCategories,
  fetchCategories
} from '@/lib/features/category/categorySlice';
import { columns } from './_components/category-tables/columns';
import { Category } from '@/types/category';
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';
import { DataTable } from './_components/category-tables/data-table';

export function CategoryManagement() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [filteredCategories, setFilteredCategories] =
    useState<Category[]>(categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  return <DataTable columns={columns} data={filteredCategories} />;
}
