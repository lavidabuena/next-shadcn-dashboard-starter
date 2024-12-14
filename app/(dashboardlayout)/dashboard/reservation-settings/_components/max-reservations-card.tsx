import { Control } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface MaxReservationsCardProps {
  control: Control<any>;
}

export function MaxReservationsCard({ control }: MaxReservationsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>1時間あたりの予約数上限</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="maxReservationsPerHour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>最大予約数</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
