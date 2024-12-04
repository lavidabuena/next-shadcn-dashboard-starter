import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import OptionListingPage from './_components/option-listing';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

export const metadata = {
  title: 'Dashboard: オプション'
};

export default async function Page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="オプション"
            description="オプション項目を管理します。"
          />
          <Link
            href="/dashboard/option/new"
            className={buttonVariants({ className: 'text-xs md:text-sm' })}
          >
            <Plus className="mr-2 h-4 w-4" /> 新規追加
          </Link>
        </div>
        <Separator />
        <Suspense
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <OptionListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
