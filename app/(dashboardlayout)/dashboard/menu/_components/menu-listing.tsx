'use client';

import { useEffect } from 'react';
import { MenuDataTable } from './menu-data-table';
import { columns } from './menu-tables/columns';
import { selectMenus, fetchMenus } from '@/lib/features/menu/menuSlice';
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';

export default function MenuListingPage() {
  const dispatch = useAppDispatch();
  const menuState = useAppSelector(selectMenus);
  const menus = menuState.menus;

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  return (
    <MenuDataTable columns={columns} data={menus} totalItems={menus.length} />
  );
}
