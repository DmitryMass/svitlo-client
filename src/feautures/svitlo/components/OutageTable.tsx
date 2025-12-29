import type { OutageInterval } from '@/shared/types/svitlo.types';
import { RateLimitError } from '@/shared/api/axios-instance';
import { formatTimeRange } from '@/shared/utils/time';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { AlertCircle, Lightbulb, Zap, Clock } from 'lucide-react';

interface OutageTableProps {
  title: string;
  slots: OutageInterval[];
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  type: 'planned' | 'probable';
  scheduleStatus?: string;
}

export const OutageTable = ({
  title,
  slots,
  isLoading,
  isError,
  error,
  type,
  scheduleStatus,
}: OutageTableProps) => {
  const isRateLimitError = error instanceof RateLimitError;

  if (isLoading) {
    return (
      <div className="w-full">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-800">
          {type === 'planned' ? (
            <Zap className="h-5 w-5 text-yellow-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-blue-500" />
          )}
          {title}
        </h3>
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-center text-zinc-500">Завантаження...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-800">
          {type === 'planned' ? (
            <Zap className="h-5 w-5 text-yellow-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-blue-500" />
          )}
          {title}
        </h3>
        {isRateLimitError ? (
          <Alert className="border-orange-200 bg-white shadow-sm">
            <Clock className="h-4 w-4 text-orange-600" />
            <AlertTitle className="font-semibold text-orange-800">
              Перевищено ліміт запитів
            </AlertTitle>
            <AlertDescription className="text-orange-700">
              {error.message ||
                'Ви перевищили ліміт запитів (50 на хвилину). Спробуйте через хвилину.'}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert
            variant="destructive"
            className="border-red-200 bg-white shadow-sm"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Помилка API</AlertTitle>
            <AlertDescription>
              Тимчасова помилка при отриманні даних. Спробуйте пізніше.
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  const getCellClass = (status: OutageInterval['type']) => {
    switch (status) {
      case 'Definite':
        return 'bg-yellow-100 border-l-4 border-l-yellow-500 text-yellow-900 font-medium';
      case 'Possible':
        return 'bg-blue-100 border-l-4 border-l-blue-500 text-blue-900 font-medium';
      case 'NotPlanned':
      default:
        return 'bg-emerald-50 border-l-4 border-l-emerald-500 text-emerald-900';
    }
  };

  const getStatusContent = (status: OutageInterval['type']) => {
    switch (status) {
      case 'Definite':
        return {
          icon: <Zap className="h-4 w-4 text-yellow-600" />,
          text: 'Немає світла',
        };
      case 'Possible':
        return {
          icon: <AlertCircle className="h-4 w-4 text-blue-600" />,
          text: 'Можливо немає світла',
        };
      case 'NotPlanned':
      default:
        return {
          icon: <Lightbulb className="h-4 w-4 text-emerald-600" />,
          text: 'Світло є',
        };
    }
  };

  const hasData = slots.length > 0;

  return (
    <div className="w-full">
      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-800">
        {type === 'planned' ? (
          <Zap className="h-5 w-5 text-yellow-500" />
        ) : (
          <AlertCircle className="h-5 w-5 text-blue-500" />
        )}
        {title}
      </h3>

      {scheduleStatus === 'WaitingForSchedule' && (
        <Alert className="mb-4 border-sky-200 bg-sky-50 shadow-sm">
          <AlertCircle
            className="h-5 w-5 text-blue-500"
            color="oklch(62.3% 0.214 259.815)"
          />
          <AlertDescription className="text-sky-700">
            Інформація не є остаточною. Планується відключення у зазначений час,
            але графік ще не підтверджено.
          </AlertDescription>
        </Alert>
      )}

      {!hasData ? (
        <Alert className="border-zinc-200 bg-white shadow-sm">
          <Lightbulb className="h-4 w-4 text-emerald-600" />
          <AlertTitle className="text-zinc-800">Немає даних</AlertTitle>
          <AlertDescription className="text-zinc-600">
            Відключень для цієї групи не заплановано
          </AlertDescription>
        </Alert>
      ) : (
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-zinc-200 bg-linear-to-r from-zinc-50 to-zinc-100">
                <TableHead className="text-base font-semibold text-zinc-700">
                  Період
                </TableHead>
                <TableHead className="text-base font-semibold text-zinc-700">
                  Статус
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slots.map((slot, index) => {
                const { icon, text } = getStatusContent(slot.type);
                const timeRange = formatTimeRange(slot.start, slot.end);

                return (
                  <TableRow
                    key={index}
                    className="border-b border-zinc-100 transition-colors hover:bg-zinc-50/80"
                  >
                    <TableCell className="text-base font-semibold text-zinc-900">
                      {timeRange}
                    </TableCell>
                    <TableCell className={getCellClass(slot.type)}>
                      <div className="flex items-center gap-2 py-1">
                        {icon}
                        <span className="font-medium">{text}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
