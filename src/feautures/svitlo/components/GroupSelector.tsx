import type { Group } from '@/shared/types/svitlo.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

interface GroupSelectorProps {
  value: Group;
  onValueChange: (value: Group) => void;
  groups: Group[];
}

export const GroupSelector = ({
  value,
  onValueChange,
  groups,
}: GroupSelectorProps) => {
  return (
    <div className="w-full">
      <Select value={value} onValueChange={(val) => onValueChange(val as Group)}>
        <SelectTrigger className="w-full bg-white border-zinc-200 shadow-sm h-11 hover:bg-zinc-50 transition-colors">
          <SelectValue placeholder="Оберіть групу" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {groups.map((group) => (
            <SelectItem key={group} value={group}>
              Група {group}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
