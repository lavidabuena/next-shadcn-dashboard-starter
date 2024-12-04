'use client';

import { useEffect, useState } from 'react';
import { Option } from '@/types/option';
import { columns } from './option-tables/columns';

import { selectOptions, fetchOptions } from '@/lib/features/option/optionSlice';
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';
import { OptionDataTable } from './option-data-table';

export default function OptionListingPage() {
  const dispatch = useAppDispatch();
  const optionState = useAppSelector(selectOptions);
  const options = optionState.options;
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  useEffect(() => {
    dispatch(fetchOptions());
  }, [dispatch]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return <OptionDataTable columns={columns} data={filteredOptions} />;
}
