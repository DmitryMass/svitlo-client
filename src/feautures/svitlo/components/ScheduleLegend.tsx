import { Lightbulb, Zap } from 'lucide-react';

export const ScheduleLegend = () => {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <h4 className="mb-3 text-sm font-semibold text-zinc-700">
        Умовні позначення:
      </h4>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-12 items-center justify-center rounded border-l-4 border-l-yellow-500 bg-yellow-100">
            <Zap className="h-4 w-4 text-yellow-600" />
          </div>
          <span className="text-sm text-zinc-700">Немає світла</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-12 items-center justify-center rounded border-l-4 border-l-emerald-500 bg-emerald-50">
            <Lightbulb className="h-4 w-4 text-emerald-600" />
          </div>
          <span className="text-sm text-zinc-700">Світло є</span>
        </div>
      </div>
    </div>
  );
};
