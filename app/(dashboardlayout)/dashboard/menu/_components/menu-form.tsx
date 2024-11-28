'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { addMenuAsync, editMenuAsync } from '@/lib/features/menu/menuSlice';
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
import { Textarea } from '@/components/ui/textarea';
import { TagInput } from '@/components/ui/tag-input';
import { useAppDispatch } from '@/lib/features/hooks';
import { Menu } from '@/types/menu';
import { formSchema } from '@/Schema/formMenuSchema';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface MenuFormProps {
  initialData: Menu | null;
  pageTitle: string;
}

export default function MenuForm({ initialData, pageTitle }: MenuFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: initialData?.productName || '',
      workingHours: initialData?.workingHours || 0,
      description: initialData?.description || '',
      category: initialData?.category || [],
      tags: initialData?.tags || [],
      price: initialData?.price || 0
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      if (initialData) {
        await dispatch(
          editMenuAsync({
            id: initialData.id,
            ...values,
            updateAt: null
          })
        ).unwrap();
        toast({
          title: 'メニューを更新しました',
          description: 'メニューが正常に更新されました。'
        });
      } else {
        await dispatch(addMenuAsync(values)).unwrap();
        toast({
          title: 'メニューを作成しました',
          description: '新しいメニューが正常に作成されました。'
        });
      }
      router.push('/dashboard/menu');
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: 'メニューの保存に失敗しました。もう一度お試しください。',
        variant: 'destructive'
      });
      console.error('メニューの保存に失敗しました:', error);
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
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>商品名</FormLabel>
                    <FormControl>
                      <Input placeholder="商品名を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workingHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>作業時間（分）</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="10"
                        min="0"
                        max="1440"
                        placeholder="作業時間を入力（10分単位）"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>説明</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="商品の説明を入力"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>カテゴリ</FormLabel>
                    <FormControl>
                      <TagInput
                        placeholder="カテゴリを追加"
                        tags={field.value}
                        setTags={(newCategories) =>
                          field.onChange(newCategories)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タグ</FormLabel>
                    <FormControl>
                      <TagInput
                        placeholder="タグを追加"
                        tags={field.value}
                        setTags={(newTags) => field.onChange(newTags)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>価格</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="100"
                        placeholder="価格を入力"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? '保存中...'
                  : initialData
                  ? 'メニューを更新'
                  : 'メニューを作成'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
