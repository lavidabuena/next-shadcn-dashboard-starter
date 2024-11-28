'use client';

import { useState, useCallback, useMemo } from 'react';

export function useMenuTableFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tagsFilter, setTagsFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setTagsFilter('');
    setCategoryFilter('');
    setPage(1);
  }, []);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!tagsFilter || !!categoryFilter;
  }, [searchQuery, tagsFilter, categoryFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    tagsFilter,
    setTagsFilter,
    categoryFilter,
    setCategoryFilter
  };
}
