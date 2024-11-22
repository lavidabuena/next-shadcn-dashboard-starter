import * as z from 'zod';

export const formSchema = z.object({
  course: z.string({
    required_error: 'コースを選択してください。'
  }),
  date: z.string({
    required_error: '日付を選択してください。'
  }),
  time: z.string({
    required_error: '時間を選択してください。'
  }),
  stylist: z.string({
    required_error: 'スタイリストを選択してください。'
  }),
  options: z.array(z.string()).default([]),
  lastName: z.string().min(1, '姓を入力してください。'),
  firstName: z.string().min(1, '名を入力してください。'),
  email: z.string().email('有効なメールアドレスを入力してください。'),
  phone: z.string().min(1, '電話番号を入力してください。')
});
