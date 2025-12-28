import { getDsoId } from '@/shared/types/svitlo.types';
import {
  ALL_GROUPS,
  getPlannedSlotsForGroup,
  getProbableSlotsForGroup,
  parseGroupsFromPlanned,
} from '@/shared/utils/parseGroups';
import { usePlannedOutages } from '../hooks/usePlannedOutages';
import { useProbableOutages } from '../hooks/useProbableOutages';
import { useSvitloParams } from '../hooks/useSvitloParams';
import { DaySelector } from './DaySelector';
import { GroupSelector } from './GroupSelector';
import { OutageTable } from './OutageTable';
import { ProviderSelector } from './ProviderSelector';

export const OutageSchedule = () => {
  const { provider, group, day, setProvider, setGroup, setDay } =
    useSvitloParams();
  const dsoId = getDsoId(provider);

  const {
    data: plannedData,
    isLoading: isPlannedLoading,
    isError: isPlannedError,
  } = usePlannedOutages(dsoId);

  const {
    data: probableData,
    isLoading: isProbableLoading,
    isError: isProbableError,
  } = useProbableOutages(dsoId);

  // Получаем список групп (приоритет - из данных, иначе дефолтный список)
  const availableGroups = plannedData
    ? parseGroupsFromPlanned(plannedData)
    : ALL_GROUPS;

  // Получаем индекс дня для probable outages (0 = сегодня, 1 = завтра)
  const dayIndex = day === 'today' ? 0 : 1;

  // Получаем слоты для выбранной группы
  const plannedSlots = getPlannedSlotsForGroup(plannedData, group, day);
  const probableSlots = getProbableSlotsForGroup(
    probableData,
    group,
    dsoId,
    dayIndex,
  );

  return (
    <div className="mx-auto w-full max-w-[630px] space-y-8 p-5">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold text-zinc-800">
          ⚡ Графік відключень світла
        </h1>
        <p className="text-lg text-zinc-600">Дніпро</p>
      </div>

      <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-700">
            Постачальник
          </label>
          <ProviderSelector value={provider} onValueChange={setProvider} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-700">
            Група відключень
          </label>
          <GroupSelector
            value={group}
            onValueChange={setGroup}
            groups={availableGroups}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-700">
            День
          </label>
          <DaySelector value={day} onValueChange={setDay} />
        </div>
      </div>

      <div className="space-y-6">
        <OutageTable
          title="Планові відключення"
          slots={plannedSlots}
          isLoading={isPlannedLoading}
          isError={isPlannedError}
          type="planned"
        />

        <OutageTable
          title="Можливі відключення"
          slots={probableSlots}
          isLoading={isProbableLoading}
          isError={isProbableError}
          type="probable"
        />
      </div>
    </div>
  );
};
