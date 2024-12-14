'use client';

import { useEffect, useState } from 'react';

import { selectTags, fetchTags } from '@/lib/features/tag/tagSlice';
import { columns } from './_components/tag-tables/columns';
import { Tag } from '@/types/tag';
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';
import { DataTable } from './_components/tag-tables/data-table';

export function TagManagement() {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(selectTags);
  const [filteredTags, setFilteredTags] = useState<Tag[]>(tags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTags(tags);
  }, [tags]);

  return <DataTable columns={columns} data={filteredTags} />;
}
