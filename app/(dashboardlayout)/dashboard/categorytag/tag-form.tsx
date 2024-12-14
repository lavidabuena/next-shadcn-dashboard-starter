'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { addTagAsync, editTagAsync } from '@/lib/features/tag/tagSlice';
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
import { Tag } from '@/types/tag';
import { useAppDispatch } from '@/lib/features/hooks';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'タグ名は2文字以上で入力してください。'
  })
});

interface TagFormProps {
  initialData: Tag | null;
  pageTitle: string;
}

export default function TagForm({ initialData, pageTitle }: TagFormProps) {
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
          editTagAsync({
            id: initialData.id,
            ...values,
            updateAt: null
          })
        ).unwrap();
        toast({
          title: 'タグを更新しました',
          description: 'タグが正常に更新されました。'
        });
      } else {
        await dispatch(addTagAsync(values)).unwrap();
        toast({
          title: 'タグを作成しました',
          description: '新しいタグが正常に作成されました。'
        });
      }
      router.push('/dashboard/categorytag');
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: 'タグの保存に失敗しました。もう一度お試しください。',
        variant: 'destructive'
      });
      console.error('タグの保存に失敗しました:', error);
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
                    <FormLabel>タグ名</FormLabel>
                    <FormControl>
                      <Input placeholder="タグ名を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? '保存中...'
                  : initialData
                  ? 'タグを更新'
                  : 'タグを作成'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
