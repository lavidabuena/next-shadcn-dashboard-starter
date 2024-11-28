import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import MenuViewPage from '../_components/menu-view-page';

export const metadata = {
  title: 'Dashboard : Menu View'
};

type PageProps = { params: { menuId: string } };

export default function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <MenuViewPage menuId={params.menuId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
