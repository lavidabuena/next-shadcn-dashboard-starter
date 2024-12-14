import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import CategoryTagManagement from './category-tag-management';

export const metadata = {
  title: 'Dashboard: カテゴリー・タグ管理'
};

export default function CategoryTagPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Heading
          title="カテゴリー・タグ管理"
          description="カテゴリーとタグの管理を行います。"
        />
        <Separator />
        <CategoryTagManagement />
      </div>
    </PageContainer>
  );
}
