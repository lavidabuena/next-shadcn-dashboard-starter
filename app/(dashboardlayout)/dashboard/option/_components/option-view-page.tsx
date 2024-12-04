'use client';
import { selectOptions } from '@/lib/features/option/optionSlice';
import { notFound } from 'next/navigation';
import OptionForm from './option-form';
import { useAppSelector } from '@/lib/features/hooks';

type TOptionViewPageProps = {
  optionId: string;
};

export default function OptionViewPage({ optionId }: TOptionViewPageProps) {
  const options = useAppSelector(selectOptions);
  let option = null;
  let pageTitle = '新規オプション作成';

  if (optionId !== 'new') {
    option = options.options.find((o: { id: string }) => o.id === optionId);
    if (!option) {
      notFound();
    }
    pageTitle = `オプション編集`;
  }

  return <OptionForm initialData={option} pageTitle={pageTitle} />;
}
