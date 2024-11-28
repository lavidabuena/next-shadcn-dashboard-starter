import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import MenuListingPage from './_components/menu-listing';
import MenuTableAction from './_components/menu-tables/menu-table-action';

export const metadata = {
  title: 'Dashboard: Menus'
};

export default async function Page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Menus"
            description="Manage menu items for your restaurant."
          />
          <Link
            href="/dashboard/menu/new"
            className={buttonVariants({ className: 'text-xs md:text-sm' })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <MenuTableAction />
        <Suspense
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <MenuListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
