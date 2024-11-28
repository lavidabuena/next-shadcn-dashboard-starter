'use client';
import { selectMenus } from '@/lib/features/menu/menuSlice';
import { notFound } from 'next/navigation';
import MenuForm from './menu-form';
import { useAppSelector } from '@/lib/features/hooks';

type TMenuViewPageProps = {
  menuId: string;
};

export default function MenuViewPage({ menuId }: TMenuViewPageProps) {
  const menus = useAppSelector(selectMenus);
  let menu = null;
  let pageTitle = 'Create New Menu Item';

  if (menuId !== 'new') {
    menu = menus.menus.find((m) => m.id === menuId);
    if (!menu) {
      notFound();
    }
    pageTitle = `Edit Menu Item`;
  }

  return <MenuForm initialData={menu} pageTitle={pageTitle} />;
}
