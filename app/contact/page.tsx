'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Check, ChevronRight, Circle, Send } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const formSchema = z.object({
  companyName: z.string().min(1, '会社名は必須です'),
  contactPerson: z.string().min(1, '担当者名は必須です'),
  phone: z.string().optional(),
  email: z.string().email('正しいメールアドレスを入力してください'),
  website: z.string().url('正しいURLを入力してください').optional(),
  inquiryType: z.string().min(1, 'お問い合わせ項目を選択してください'),
  message: z.string().min(10, 'お問い合わせ内容は10文字以上で入力してください'),
  privacyPolicy: z
    .boolean()
    .refine((val) => val === true, 'プライバシーポリシーに同意してください')
});

export default function Component() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      website: '',
      inquiryType: '',
      message: '',
      privacyPolicy: false
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const validatedData = await formSchema.parseAsync(values);
      console.log(validatedData);
      alert('フォームが正常に送信されました。');
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path) {
            form.setError(err.path[0] as keyof z.infer<typeof formSchema>, {
              type: 'manual',
              message: err.message
            });
          }
        });
      } else {
        console.error('An unexpected error occurred:', error);
        alert('予期せぬエラーが発生しました。もう一度お試しください。');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const steps = [
    {
      number: '01',
      title: 'お問い合わせ',
      description:
        '下記フォームに詳細をご記入ください。必須項目を漏れなく入力し、「入力内容を確認する」ボタンをクリックしてください。'
    },
    {
      number: '02',
      title: '日程調整',
      description:
        'お問い合わせ内容を確認後、2営業日以内に担当者からご連絡いたします。Meet等のオンラインツールを使用して打ち合わせの日程を調整します。'
    },
    {
      number: '03',
      title: '打ち合わせ当日',
      description:
        'オンラインミーティングで貴社の課題やご要望をヒアリングします。その場で具体的な解決策や次のステップをご提案いたします。'
    }
  ];

  return (
    <div className="container mx-auto  min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12">
      <div className="mb-8 flex w-full items-center justify-between py-12  md:py-28">
        <h2
          className="text-4xl font-bold tracking-tight md:text-[100px] md:tracking-tight"
          style={{
            fontFamily: 'Panchang-Bold, sans-serif'
          }}
        >
          Contact
        </h2>
      </div>
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900">お問い合わせ</h1>
          <p className="text-xl text-gray-600">
            アマネセンに興味をお持ちいただきありがとうございます。
            お見積りやサービスに関するお問い合わせ、ご相談はこちらから承っております。
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-blue-200 md:block" />
          <div className="grid gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start"
              >
                <div className="ml-12 md:ml-16">
                  <Card className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-2 bg-blue-500" />
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-xl text-blue-700">
                        <span className="mr-2 font-bold">{step.number}</span>
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                    {index < steps.length - 1 && (
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform md:hidden">
                        <ChevronRight className="h-6 w-6 rotate-90 text-blue-500" />
                      </div>
                    )}
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-center text-2xl font-bold text-gray-900">
                お問い合わせフォーム
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                必要事項をご記入の上、「入力内容を確認する」ボタンをクリックしてください。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            会社名 <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="個人の方は屋号名をご入力ください"
                              {...field}
                              className="bg-gray-50"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            ご担当者名 <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="例）石田 太郎"
                              {...field}
                              className="bg-gray-50"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>電話番号</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="例）070-8568-8084"
                              {...field}
                              className="bg-gray-50"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            メールアドレス{' '}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="例）info@example.com"
                              {...field}
                              className="bg-gray-50"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ホームページURL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="例）https://example.com/"
                            {...field}
                            className="bg-gray-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          お問い合わせ項目{' '}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-50">
                              <SelectValue placeholder="選択してください" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web">WEB制作について</SelectItem>
                            <SelectItem value="meo">MEO対策について</SelectItem>
                            <SelectItem value="other">その他</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          お問い合わせ内容{' '}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="お問い合わせ内容をご記入ください"
                            className="min-h-[120px] bg-gray-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="privacyPolicy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            個人情報の取り扱いについて、同意する
                          </FormLabel>
                          <FormDescription>
                            <a
                              href="/privacy-policy"
                              className="text-blue-600 hover:underline"
                            >
                              個人情報保護方針
                            </a>
                            をお読みのうえ、ご同意願います。
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          送信中...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Send className="mr-2 h-4 w-4" /> 入力内容を確認する
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
