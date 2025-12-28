import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import type { Day } from '../hooks/useSvitloParams';
import { Calendar, CalendarClock } from 'lucide-react';

interface DaySelectorProps {
  value: Day;
  onValueChange: (value: Day) => void;
}

export const DaySelector = ({ value, onValueChange }: DaySelectorProps) => {
  return (
    <Tabs value={value} onValueChange={onValueChange as (value: string) => void}>
      <TabsList className="grid w-full grid-cols-2 bg-white border border-zinc-200 shadow-sm h-11">
        <TabsTrigger
          value="today"
          className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
        >
          <Calendar className="h-4 w-4" />
          <span>Сьогодні</span>
        </TabsTrigger>
        <TabsTrigger
          value="tomorrow"
          className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
        >
          <CalendarClock className="h-4 w-4" />
          <span>Завтра</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
