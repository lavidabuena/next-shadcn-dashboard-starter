import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import OptionViewPage from '../_components/option-view-page';

export const metadata = {
  title: 'Dashboard : Option View'
};

type PageProps = { params: { optionId: string } };

export default function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <OptionViewPage optionId={params.optionId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
