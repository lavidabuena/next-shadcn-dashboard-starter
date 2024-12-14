import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import TagViewPage from '../../tag-view-page';

export const metadata = {
  title: 'Dashboard : Tag View'
};

type PageProps = { params: { tagId: string } };

export default function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <TagViewPage tagId={params.tagId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
