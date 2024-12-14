'use client';

import { selectCategories } from '@/lib/features/category/categorySlice';
import { notFound } from 'next/navigation';
import CategoryForm from './category-form';
import { useAppSelector } from '@/lib/features/hooks';

type CategoryViewPageProps = {
  categoryId: string;
};

export default function CategoryViewPage({
  categoryId
}: CategoryViewPageProps) {
  const categories = useAppSelector(selectCategories);
  let category = null;
  let pageTitle = '新規カテゴリー作成';

  if (categoryId !== 'new') {
    category = categories.find((c: { id: string }) => c.id === categoryId);
    if (!category) {
      notFound();
    }
    pageTitle = `カテゴリー編集: ${category.name}`;
  }

  return <CategoryForm initialData={category} pageTitle={pageTitle} />;
}
