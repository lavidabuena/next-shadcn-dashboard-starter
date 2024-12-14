'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { BusinessHoursCard } from './business-hours-card';
import { MaxReservationsCard } from './max-reservations-card';
import { ClosedDaysCard } from './closed-days-card';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';
import { useToast } from '@/hooks/use-toast';
import {
  fetchReservationSetting,
  saveReservationSetting
} from '@/lib/features/recervation-setting/reservationSettingSlice';

const formSchema = z.object({
  businessHours: z.object({
    start: z.string(),
    end: z.string()
  }),
  maxReservationsPerHour: z.number().min(1),
  closedDays: z.array(z.number().min(0).max(6))
});

type ReservationSettingsFormValues = z.infer<typeof formSchema>;

export default function ReservationSettingsForm() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const settings = useAppSelector(
    (state: { reservationSetting: { settings: any } }) =>
      state.reservationSetting.settings
  );
  const status = useAppSelector(
    (state: { reservationSetting: { status: any } }) =>
      state.reservationSetting.status
  );
  const error = useAppSelector(
    (state: { reservationSetting: { error: any } }) =>
      state.reservationSetting.error
  );

  const form = useForm<ReservationSettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessHours: {
        start: '09:00',
        end: '17:00'
      },
      maxReservationsPerHour: 2,
      closedDays: [0, 6] // Sunday and Saturday
    }
  });

  useEffect(() => {
    dispatch(fetchReservationSetting())
      .unwrap()
      .catch((error: string) => {
        if (error !== 'No reservation settings found.') {
          toast({
            title: 'エラーが発生しました',
            description: error,
            variant: 'destructive'
          });
        }
      });
  }, [dispatch, toast]);

  useEffect(() => {
    if (settings) {
      form.reset({
        businessHours: settings.businessHours,
        maxReservationsPerHour: settings.maxReservationsPerHour,
        closedDays: settings.closedDays
      });
    }
  }, [settings, form]);

  async function onSubmit(data: ReservationSettingsFormValues) {
    try {
      await dispatch(saveReservationSetting(data)).unwrap();
      toast({
        title: '設定を保存しました',
        description: '予約設定が正常に更新されました。'
      });
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: '設定の保存に失敗しました。もう一度お試しください。',
        variant: 'destructive'
      });
    }
  }

  if (status === 'loading') {
    return <div>読み込み中...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {(!settings || Object.keys(settings).length === 0) && (
          <Card>
            <CardHeader>
              <CardTitle>予約設定が未設定です</CardTitle>
            </CardHeader>
            <CardContent>
              <p>以下のフォームから予約設定を行ってください。</p>
            </CardContent>
          </Card>
        )}
        <BusinessHoursCard control={form.control} />
        <MaxReservationsCard control={form.control} />
        <ClosedDaysCard control={form.control} />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? '保存中...' : '設定を保存'}
        </Button>
      </form>
    </Form>
  );
}
