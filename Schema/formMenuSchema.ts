import * as z from 'zod';

export const formSchema = z.object({
  productName: z.string().min(2, {
    message: '商品名は2文字以上で入力してください。'
  }),
  workingHours: z.number().min(0).max(1440).multipleOf(10, {
    message:
      '作業時間は0分から1440分（24時間）までの10分単位で入力してください。'
  }),
  description: z.string().min(10, {
    message: '説明は10文字以上で入力してください。'
  }),
  category: z.array(z.string()).min(1, {
    message: '少なくとも1つのカテゴリを入力してください。'
  }),
  tags: z.array(z.string()).min(1, {
    message: '少なくとも1つのタグを入力してください。'
  }),
  price: z.number().min(0, {
    message: '価格は0以上の数値を入力してください。'
  })
});
