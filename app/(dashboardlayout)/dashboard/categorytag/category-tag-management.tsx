'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { CategoryManagement } from './category-management';
import { TagManagement } from './tag-management';

export default function CategoryTagManagement() {
  return (
    <Tabs defaultValue="category" className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="category">カテゴリー</TabsTrigger>
          <TabsTrigger value="tag">タグ</TabsTrigger>
        </TabsList>
        <div className="flex space-x-2">
          <Link href="/dashboard/categorytag/category/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> カテゴリー追加
            </Button>
          </Link>
          <Link href="/dashboard/categorytag/tag/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> タグ追加
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent value="category">
        <CategoryManagement />
      </TabsContent>
      <TabsContent value="tag">
        <TagManagement />
      </TabsContent>
    </Tabs>
  );
}
