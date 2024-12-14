import { Control } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface ClosedDaysCardProps {
  control: Control<any>;
}

const daysOfWeek = [
  { value: 0, label: '日曜日' },
  { value: 1, label: '月曜日' },
  { value: 2, label: '火曜日' },
  { value: 3, label: '水曜日' },
  { value: 4, label: '木曜日' },
  { value: 5, label: '金曜日' },
  { value: 6, label: '土曜日' }
];

export function ClosedDaysCard({ control }: ClosedDaysCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>定休日</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="closedDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>定休日を選択</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-4">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`day-${day.value}`}
                        checked={field.value.includes(day.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, day.value]);
                          } else {
                            field.onChange(
                              field.value.filter(
                                (value: number) => value !== day.value
                              )
                            );
                          }
                        }}
                      />
                      <label htmlFor={`day-${day.value}`}>{day.label}</label>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
