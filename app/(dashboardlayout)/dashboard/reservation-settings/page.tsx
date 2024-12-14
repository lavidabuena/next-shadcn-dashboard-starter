import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import ReservationSettingsForm from './_components/reservation-settings-form';

export const metadata = {
  title: 'Dashboard: 予約設定'
};

export default function ReservationSettingsPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="予約設定"
            description="予約システムの基本設定を管理します。"
          />
        </div>
        <Separator />
        <Suspense fallback={<FormCardSkeleton />}>
          <ReservationSettingsForm />
        </Suspense>
      </div>
    </PageContainer>
  );
}
