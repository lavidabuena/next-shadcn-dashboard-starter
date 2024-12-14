'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  addCategoryAsync,
  editCategoryAsync
} from '@/lib/features/category/categorySlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Category } from '@/types/category';
import { useToast } from '@/hooks/use-toast';
import { useAppDispatch } from '@/lib/features/hooks';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'カテゴリー名は2文字以上で入力してください。'
  })
});

interface CategoryFormProps {
  initialData: Category | null;
  pageTitle: string;
}

export default function CategoryForm({
  initialData,
  pageTitle
}: CategoryFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      if (initialData) {
        await dispatch(
          editCategoryAsync({
            id: initialData.id,
            ...values,
            updateAt: null
          })
        ).unwrap();
        toast({
          title: 'カテゴリーを更新しました',
          description: 'カテゴリーが正常に更新されました。'
        });
      } else {
        await dispatch(addCategoryAsync(values)).unwrap();
        toast({
          title: 'カテゴリーを作成しました',
          description: '新しいカテゴリーが正常に作成されました。'
        });
      }
      router.push('/dashboard/categorytag');
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: 'カテゴリーの保存に失敗しました。もう一度お試しください。',
        variant: 'destructive'
      });
      console.error('カテゴリーの保存に失敗しました:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{pageTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>カテゴリー名</FormLabel>
                    <FormControl>
                      <Input placeholder="カテゴリー名を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? '保存中...'
                  : initialData
                  ? 'カテゴリーを更新'
                  : 'カテゴリーを作成'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
