'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import {
  addOptionAsync,
  editOptionAsync
} from '@/lib/features/option/optionSlice';
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
import { Option } from '@/types/option';
import { useToast } from '@/hooks/use-toast';
import { useAppDispatch } from '@/lib/features/hooks';

const formSchema = z.object({
  optionName: z.string().min(2, {
    message: 'オプション名は2文字以上で入力してください。'
  }),
  workingHours: z.number().min(0).max(1440).multipleOf(10, {
    message:
      '作業時間は0分から1440分（24時間）までの10分単位で入力してください。'
  }),
  description: z.string().min(10, {
    message: '説明は10文字以上で入力してください。'
  }),
  price: z.number().min(0, {
    message: '価格は0以上の数値を入力してください。'
  })
});

interface OptionFormProps {
  initialData: Option | null;
  pageTitle: string;
}

export default function OptionForm({
  initialData,
  pageTitle
}: OptionFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      optionName: initialData?.optionName || '',
      workingHours: initialData?.workingHours || 0,
      description: initialData?.description || '',
      price: initialData?.price || 0
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      if (initialData) {
        await dispatch(
          editOptionAsync({
            id: initialData.id,
            ...values,
            updateAt: null
          })
        ).unwrap();
        toast({
          title: 'オプションを更新しました',
          description: 'オプションが正常に更新されました。'
        });
      } else {
        await dispatch(addOptionAsync(values)).unwrap();
        toast({
          title: 'オプションを作成しました',
          description: '新しいオプションが正常に作成されました。'
        });
      }
      router.push('/dashboard/option');
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: 'オプションの保存に失敗しました。もう一度お試しください。',
        variant: 'destructive'
      });
      console.error('オプションの保存に失敗しました:', error);
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
                name="optionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>オプション名</FormLabel>
                    <FormControl>
                      <Input placeholder="オプション名を入力" {...field} />
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
                        placeholder="オプションの説明を入力"
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
                  ? 'オプションを更新'
                  : 'オプションを作成'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
