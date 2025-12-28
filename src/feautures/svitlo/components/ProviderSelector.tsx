import type { Provider } from '@/shared/types/svitlo.types';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Zap } from 'lucide-react';

interface ProviderSelectorProps {
  value: Provider;
  onValueChange: (value: Provider) => void;
}

export const ProviderSelector = ({
  value,
  onValueChange,
}: ProviderSelectorProps) => {
  return (
    <div className="w-full">
      <Tabs
        value={value}
        onValueChange={(val) => onValueChange(val as Provider)}
        className="w-full"
      >
        <TabsList className="grid h-11 w-full grid-cols-2 border border-zinc-200 bg-white shadow-sm">
          <TabsTrigger
            value="dtek"
            className="flex items-center gap-2 transition-all data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:shadow-md"
          >
            <Zap className="h-4 w-4" />
            ДТЕК
          </TabsTrigger>
          <TabsTrigger
            value="tsek"
            className="flex items-center gap-2 transition-all data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:shadow-md"
          >
            <Zap className="h-4 w-4" />
            ЦЕК
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
