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
import { ScheduleLegend } from './ScheduleLegend';

export const OutageSchedule = () => {
  const { provider, group, day, setProvider, setGroup, setDay } =
    useSvitloParams();
  const dsoId = getDsoId(provider);

  const {
    data: plannedData,
    isLoading: isPlannedLoading,
    isError: isPlannedError,
    error: plannedError,
  } = usePlannedOutages(dsoId);

  const {
    data: probableData,
    isLoading: isProbableLoading,
    isError: isProbableError,
    error: probableError,
  } = useProbableOutages(dsoId);

  const availableGroups = plannedData
    ? parseGroupsFromPlanned(plannedData)
    : ALL_GROUPS;

  const dayIndex = day === 'today' ? 0 : 1;

  const plannedData_result = getPlannedSlotsForGroup(plannedData, group, day);
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
          slots={plannedData_result.slots}
          isLoading={isPlannedLoading}
          isError={isPlannedError}
          error={plannedError}
          type="planned"
          scheduleStatus={plannedData_result.status}
        />

        <OutageTable
          title="Можливі відключення"
          slots={probableSlots}
          isLoading={isProbableLoading}
          isError={isProbableError}
          error={probableError}
          type="probable"
        />

        <ScheduleLegend />
      </div>
    </div>
  );
};
