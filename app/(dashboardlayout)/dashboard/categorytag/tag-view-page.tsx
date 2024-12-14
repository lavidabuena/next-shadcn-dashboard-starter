'use client';

import { selectTags } from '@/lib/features/tag/tagSlice';
import { notFound } from 'next/navigation';
import TagForm from './tag-form';
import { useAppSelector } from '@/lib/features/hooks';

type TagViewPageProps = {
  tagId: string;
};

export default function TagViewPage({ tagId }: TagViewPageProps) {
  const tags = useAppSelector(selectTags);
  let tag = null;
  let pageTitle = '新規タグ作成';

  if (tagId !== 'new') {
    tag = tags.find((t: { id: string }) => t.id === tagId);
    if (!tag) {
      notFound();
    }
    pageTitle = `タグ編集: ${tag.name}`;
  }

  return <TagForm initialData={tag} pageTitle={pageTitle} />;
}
