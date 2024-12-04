'use client';

import { useEffect, useState } from 'react';

import { columns } from './menu-tables/columns';
import { selectMenus, fetchMenus } from '@/lib/features/menu/menuSlice';
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';
import { MenuDataTable } from './menu-data-table';
import { Menu } from '@/types/menu';

export default function MenuListingPage() {
  const dispatch = useAppDispatch();
  const menuState = useAppSelector(selectMenus);
  const menus = menuState.menus;
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>(menus);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMenus(menus);
  }, [menus]);

  return <MenuDataTable columns={columns} data={filteredMenus} />;
}
