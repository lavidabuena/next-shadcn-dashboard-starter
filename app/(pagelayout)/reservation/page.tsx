'use client';

import Head from 'next/head';
import { FC, useState, useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Timestamp,
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';
import { addReservationAsync } from '@/lib/features/reservation/reservationSlice';
import { Reservationlist } from '@/types/reservation';
import db from '../src/firebase/client';

const formSchema = z.object({
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

const Page: FC = () => {
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [canPrevWeek, setCanPrevWeek] = useState(true);
  const [canNextWeek, setCanNextWeek] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const dispatch = useAppDispatch();
  const reservationStatus = useAppSelector(
    (state: { reservations: { status: any } }) => state.reservations.status
  );
  const reservationError = useAppSelector((state) => state.reservations.error);
  const [existingReservations, setExistingReservations] = useState<
    Reservationlist[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: '',
      date: '',
      time: '',
      stylist: '',
      options: [],
      lastName: '',
      firstName: '',
      email: '',
      phone: ''
    },
    mode: 'onBlur'
  });

  const menuItems = useMemo(
    () => [
      { id: 'A', name: '施術コースA', price: 10000, duration: 60 },
      { id: 'B', name: '施術コースB', price: 15000, duration: 90 }
    ],
    []
  );

  const optionItems = useMemo(
    () => [
      { id: 'opt1', name: 'オプション1', time: 15, price: 2000 },
      { id: 'opt2', name: 'オプション2', time: 30, price: 3500 },
      { id: 'opt3', name: 'オプション3', time: 20, price: 2500 }
    ],
    []
  );

  const stylists = useMemo(
    () => [
      { id: 'none', name: '指定なし', price: 0 },
      { id: 'sty1', name: '山田 花子', price: 0 },
      { id: 'sty2', name: '佐藤 太郎', price: 1000 },
      { id: 'sty3', name: '鈴木 美咲', price: 500 }
    ],
    []
  );

  const monthNames = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月'
  ];
  const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

  const generateTimeSlots = (
    startTime: string,
    endTime: string,
    interval: number
  ) => {
    const times = [];
    const current = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);

    while (current <= end) {
      times.push(
        current.toLocaleTimeString('ja-JP', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      );
      current.setMinutes(current.getMinutes() + interval);
    }

    return times;
  };

  const allTimes = useMemo(() => generateTimeSlots('10:00', '20:00', 30), []);

  useEffect(() => {
    updateWeekDates(new Date());
  }, []);

  useEffect(() => {
    const selectedCourse = form.getValues('course');
    const selectedOptions = form.getValues('options');
    const selectedMenu = menuItems.find((item) => item.id === selectedCourse);
    if (selectedMenu) {
      let duration = selectedMenu.duration;
      selectedOptions.forEach((optionId) => {
        const option = optionItems.find((opt) => opt.id === optionId);
        if (option) {
          duration += option.time;
        }
      });
      const newAvailableTimes = allTimes.filter((time) => {
        const startTime = new Date(`2000-01-01T${time}`);
        const endTime = new Date(startTime.getTime() + duration * 60000);
        return endTime <= new Date(`2000-01-01T20:00`);
      });
      setAvailableTimes(newAvailableTimes);
      form.setValue('time', '');
      form.setValue('date', '');
    }
  }, [
    allTimes,
    form,
    menuItems,
    optionItems,
    form.watch('course'),
    form.watch('options')
  ]);

  const updateWeekDates = (startDate: Date) => {
    const dates = [];
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(startDate.setDate(diff));

    const today = new Date();
    const minDate = today;
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 3);

    setCanPrevWeek(monday > minDate);
    setCanNextWeek(monday < maxDate);

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    setWeekDates(dates);
  };

  const handlePrevWeek = () => {
    if (!canPrevWeek) return;
    const newStartDate = new Date(weekDates[0]);
    newStartDate.setDate(newStartDate.getDate() - 7);
    updateWeekDates(newStartDate);
  };

  const handleNextWeek = () => {
    if (!canNextWeek) return;
    const newStartDate = new Date(weekDates[0]);
    newStartDate.setDate(newStartDate.getDate() + 7);
    updateWeekDates(newStartDate);
  };

  const handleCourseChange = (courseId: string) => {
    form.setValue('course', courseId);
    form.setValue('time', '');
    form.setValue('date', '');
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const startDate = new Date(`${values.date}T${values.time}`);
    const durationMinutes = calculateTotalDuration();
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

    const newReservation = {
      customerName: `${values.lastName} ${values.firstName}`,
      staffName: stylists.find((s) => s.id === values.stylist)?.name || '',
      email: values.email,
      phone: values.phone,
      menu_id: values.course,
      option_id: values.options,
      totalPrice: calculateTotalPrice(),
      start: Timestamp.fromDate(startDate),
      end: Timestamp.fromDate(endDate)
    };

    try {
      await dispatch(addReservationAsync(newReservation)).unwrap();
      setShowThankYou(true);
    } catch (error) {
      toast({
        description: '予約の登録に失敗しました。もう一度お試しください。',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvailableTimesForDate = (date: Date) => {
    return availableTimes;
  };

  const createDateTime = (date: Date, time: string) => {
    return new Date(`${formatDate(date)}T${time}`);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const calculateTotalPrice = () => {
    let total = 0;
    const selectedCourse = menuItems.find(
      (item) => item.id === form.watch('course')
    );
    if (selectedCourse) {
      total += selectedCourse.price;
    }
    form.watch('options').forEach((optId) => {
      const option = optionItems.find((item) => item.id === optId);
      if (option) {
        total += option.price;
      }
    });
    const selectedStylist = stylists.find(
      (item) => item.id === form.watch('stylist')
    );
    if (selectedStylist) {
      total += selectedStylist.price;
    }
    return total;
  };

  const calculateTotalDuration = () => {
    let duration = 0;
    const selectedCourse = menuItems.find(
      (item) => item.id === form.watch('course')
    );
    if (selectedCourse) {
      duration += selectedCourse.duration;
    }
    form.watch('options').forEach((optId) => {
      const option = optionItems.find((item) => item.id === optId);
      if (option) {
        duration += option.time;
      }
    });
    return duration;
  };

  useEffect(() => {
    const now = new Date();
    const q = query(collection(db, 'Reservations'), where('start', '>', now));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reservations = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          staffName: data.staffName,
          start: data.start,
          end: data.end
        } as { staffName: string; start: Timestamp; end: Timestamp };
      });
      setExistingReservations(reservations);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pb-20">
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showThankYou ? (
        <Card className="mx-auto w-full max-w-3xl rounded-2xl bg-white py-24 text-black shadow-lg">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-2xl font-bold">予約完了</CardTitle>
          </CardHeader>
          <CardContent className="mt-6 text-center">
            <h2 className="mb-4 text-2xl font-bold">
              ご予約ありがとうございました。
            </h2>
            <p>予約内容の確認メールを送信しました。</p>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Card className="mx-auto w-full max-w-3xl rounded-2xl bg-white py-24 text-black shadow-lg">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="text-2xl font-bold">予約ページ</CardTitle>
            </CardHeader>
            <CardContent className="mt-6">
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2 text-lg font-semibold text-black">
                          メニュー
                        </FormLabel>
                        <Select
                          onValueChange={handleCourseChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                              <SelectValue placeholder="コースを選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {menuItems.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.name} - ¥{item.price.toLocaleString()} (
                                {item.duration}分)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="options"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base font-semibold text-black">
                            オプション
                          </FormLabel>
                        </div>
                        <FormField
                          control={form.control}
                          name="options"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.length === 0}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([]);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                指定なし
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        {optionItems.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="options"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.name} - ¥{item.price.toLocaleString()}{' '}
                                    ({item.time}分)
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stylist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2 text-lg font-semibold text-black">
                          スタイリスト
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                              <SelectValue placeholder="スタイリストを選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {stylists.map((stylist) => (
                              <SelectItem key={stylist.id} value={stylist.id}>
                                {stylist.name}{' '}
                                {stylist.price > 0
                                  ? `(+¥${stylist.price.toLocaleString()})`
                                  : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div>
                    <h2 className="mb-2 text-lg font-semibold text-black">
                      日時選択
                    </h2>
                    <div className="mb-4 flex items-center justify-between">
                      <Button
                        type="button"
                        onClick={handlePrevWeek}
                        size="icon"
                        disabled={!canPrevWeek}
                        className={`border border-blue-300 bg-white text-black hover:bg-blue-100 ${
                          !canPrevWeek ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {weekDates.length > 0 && (
                        <h3 className="text-center text-xl font-semibold text-black">
                          {`${weekDates[0].getFullYear()}年 ${
                            monthNames[weekDates[0].getMonth()]
                          } ${weekDates[0].getDate()}日 〜 ${
                            monthNames[
                              weekDates[weekDates.length - 1].getMonth()
                            ]
                          } ${weekDates[weekDates.length - 1].getDate()}日`}
                        </h3>
                      )}
                      <Button
                        type="button"
                        onClick={handleNextWeek}
                        size="icon"
                        disabled={!canNextWeek}
                        className={`border border-blue-300 bg-white text-black hover:bg-blue-100 ${
                          !canNextWeek ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    {weekDates.length > 0 && (
                      <div className="mx-2 mb-2 grid w-full max-w-full grid-cols-7 gap-1">
                        {weekDates.map((date, index) => {
                          const formattedDate = formatDate(date);
                          const today = new Date();
                          const maxDate = new Date(today);
                          maxDate.setMonth(maxDate.getMonth() + 3);

                          const isDateDisabled = date > maxDate;

                          return (
                            <div
                              key={index}
                              className="flex flex-col text-center"
                            >
                              <div className="h-8 p-0 text-sm font-medium text-black">
                                {dayNames[date.getDay()]}
                              </div>
                              <div
                                className={`h-10 w-full p-0 ${
                                  isDateDisabled
                                    ? 'text-gray-400'
                                    : 'text-black'
                                }`}
                              >
                                {date.getDate()}
                              </div>
                              {getAvailableTimesForDate(date).map((time) => {
                                const selectedDate = form.watch('date');
                                const selectedTime = form.watch('time');

                                const now = new Date();
                                const dateTime = createDateTime(date, time);

                                const isTimeDisabled =
                                  dateTime.getTime() <
                                    now.getTime() + 2 * 60 * 60 * 1000 ||
                                  isDateDisabled ||
                                  existingReservations.some((reservation) => {
                                    const reservationStart =
                                      reservation.start.toDate();
                                    const reservationEnd =
                                      reservation.end.toDate();
                                    return (
                                      dateTime >= reservationStart &&
                                      dateTime < reservationEnd
                                    );
                                  });

                                return (
                                  <Button
                                    key={time}
                                    type="button"
                                    onClick={() => {
                                      if (!isTimeDisabled) {
                                        form.setValue('date', formattedDate);
                                        form.setValue('time', time);
                                      }
                                    }}
                                    disabled={isTimeDisabled}
                                    className={`mb-1 w-full ${
                                      selectedDate === formattedDate &&
                                      selectedTime === time
                                        ? 'bg-blue-600 text-white'
                                        : isTimeDisabled
                                        ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                                        : 'border border-blue-300 bg-white text-black hover:bg-blue-100'
                                    }`}
                                  >
                                    {time}
                                  </Button>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <FormMessage className="text-red-500" />
                  </div>

                  <div>
                    <h2 className="mb-2 text-lg font-semibold text-black">
                      お客様情報
                    </h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">
                                姓 (名字){' '}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="border-blue-300 required:border-red-500 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">
                                名 (名前){' '}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="border-blue-300 required:border-red-500 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              メールアドレス{' '}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                className="border-blue-300 required:border-red-500 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              電話番号 <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                className="border-blue-300 required:border-red-500 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={
                      !form.formState.isValid ||
                      !form.watch('date') ||
                      !form.watch('time') ||
                      isSubmitting ||
                      reservationStatus === 'loading'
                    }
                  >
                    {isSubmitting || reservationStatus === 'loading' ? (
                      <>
                        <span className="mr-2 animate-spin">⏳</span>
                        送信中...
                      </>
                    ) : (
                      '予約する'
                    )}
                  </Button>
                  {reservationStatus === 'failed' && (
                    <p className="mt-2 text-red-500">
                      エラーが発生しました: {reservationError}
                    </p>
                  )}
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      )}

      {(form.watch('course') || (form.watch('date') && form.watch('time'))) && (
        <div className="sticky bottom-0 left-0 right-0 bg-gray-800/50 p-4 text-white shadow-lg backdrop-blur-sm">
          <div className="mx-auto max-w-3xl">
            <h3 className="mb-2 text-lg font-semibold">選択内容:</h3>
            {form.watch('course') && (
              <p className="mb-1">
                ①{' '}
                {
                  menuItems.find((item) => item.id === form.watch('course'))
                    ?.name
                }
              </p>
            )}
            {form.watch('options') && (
              <p className="mb-1">
                オプション:{' '}
                {form.watch('options').length === 0
                  ? 'なし'
                  : form
                      .watch('options')
                      .map(
                        (optId) =>
                          optionItems.find((item) => item.id === optId)?.name
                      )
                      .join(', ')}
              </p>
            )}
            {form.watch('stylist') && (
              <p className="mb-1">
                スタイリスト:{' '}
                {form.watch('stylist') === 'none'
                  ? '指定なし'
                  : stylists.find((item) => item.id === form.watch('stylist'))
                      ?.name}
              </p>
            )}
            {form.watch('date') && form.watch('time') && (
              <p className="mb-1">
                ② {form.watch('date')} {form.watch('time')} (合計:{' '}
                {calculateTotalDuration()}分)
              </p>
            )}
            <p className="mt-2 text-xl font-bold">
              合計金額: ¥{calculateTotalPrice().toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
