import type {
  Group,
  OutageInterval,
  PlannedOutagesResponse,
  ProbableOutagesResponse,
} from '@/shared/types/svitlo.types';

/**
 * Извлекает список групп из ответа API плановых отключений
 * @param data - ответ от API плановых отключений
 * @returns массив уникальных групп
 */
export const parseGroupsFromPlanned = (
  data: PlannedOutagesResponse,
): Group[] => {
  return Object.keys(data) as Group[];
};

/**
 * Извлекает список групп из ответа API возможных отключений
 * @param data - ответ от API возможных отключений
 * @param dsoId - ID провайдера
 * @returns массив уникальных групп
 */
export const parseGroupsFromProbable = (
  data: ProbableOutagesResponse,
  dsoId: number,
): Group[] => {
  const regionData = data['3'];
  if (!regionData) return [];

  const dsoData = regionData.dsos[dsoId.toString()];
  if (!dsoData) return [];

  return Object.keys(dsoData.groups) as Group[];
};

/**
 * Получает слоты отключений для конкретной группы из плановых отключений
 * @param data - ответ от API
 * @param group - группа отключений
 * @param day - день (today или tomorrow)
 * @returns массив интервалов отключений
 */
export const getPlannedSlotsForGroup = (
  data: PlannedOutagesResponse | undefined,
  group: Group,
  day: 'today' | 'tomorrow' = 'today',
): OutageInterval[] => {
  if (!data || !data[group]) return [];
  return data[group][day].slots;
};

/**
 * Получает слоты отключений для конкретной группы на сегодня из возможных отключений
 * @param data - ответ от API
 * @param group - группа отключений
 * @param dsoId - ID провайдера
 * @param dayIndex - индекс дня (0 = сегодня, 1 = завтра, и т.д.)
 * @returns массив интервалов отключений
 */
export const getProbableSlotsForGroup = (
  data: ProbableOutagesResponse | undefined,
  group: Group,
  dsoId: number,
  dayIndex: number = 0,
): OutageInterval[] => {
  if (!data) return [];

  const regionData = data['3'];
  if (!regionData) return [];

  const dsoData = regionData.dsos[dsoId.toString()];
  if (!dsoData) return [];

  const groupData = dsoData.groups[group];
  if (!groupData) return [];

  return groupData.slots[dayIndex.toString()] || [];
};

export const ALL_GROUPS: Group[] = [
  '1.1',
  '1.2',
  '2.1',
  '2.2',
  '3.1',
  '3.2',
  '4.1',
  '4.2',
  '5.1',
  '5.2',
  '6.1',
  '6.2',
];
