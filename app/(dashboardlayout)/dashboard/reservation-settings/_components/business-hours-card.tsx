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

interface BusinessHoursCardProps {
  control: Control<any>;
}

export function BusinessHoursCard({ control }: BusinessHoursCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>営業時間</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <FormField
            control={control}
            name="businessHours.start"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>開始時間</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="businessHours.end"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>終了時間</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
