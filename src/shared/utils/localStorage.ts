import type { Group, Provider } from '@/shared/types/svitlo.types';
import type { Day } from '@/feautures/svitlo/hooks/useSvitloParams';

const STORAGE_KEYS = {
  PROVIDER: 'svitlo_provider',
  GROUP: 'svitlo_group',
  DAY: 'svitlo_day',
} as const;

interface SvitloPreferences {
  provider: Provider;
  group: Group;
  day: Day;
}

// Проверка валидности провайдера
const isValidProvider = (value: unknown): value is Provider => {
  return value === 'dtek' || value === 'tsek';
};

// Проверка валидности группы
const isValidGroup = (value: unknown): value is Group => {
  const validGroups = [
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
  return typeof value === 'string' && validGroups.includes(value);
};

// Проверка валидности дня
const isValidDay = (value: unknown): value is Day => {
  return value === 'today' || value === 'tomorrow';
};

export const localStorageService = {
  // Сохранить провайдера
  saveProvider: (provider: Provider): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROVIDER, provider);
    } catch (error) {
      console.error('Failed to save provider to localStorage:', error);
    }
  },

  // Получить провайдера
  getProvider: (): Provider | null => {
    try {
      const value = localStorage.getItem(STORAGE_KEYS.PROVIDER);
      return isValidProvider(value) ? value : null;
    } catch (error) {
      console.error('Failed to get provider from localStorage:', error);
      return null;
    }
  },

  // Сохранить группу
  saveGroup: (group: Group): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.GROUP, group);
    } catch (error) {
      console.error('Failed to save group to localStorage:', error);
    }
  },

  // Получить группу
  getGroup: (): Group | null => {
    try {
      const value = localStorage.getItem(STORAGE_KEYS.GROUP);
      return isValidGroup(value) ? value : null;
    } catch (error) {
      console.error('Failed to get group from localStorage:', error);
      return null;
    }
  },

  // Сохранить день
  saveDay: (day: Day): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.DAY, day);
    } catch (error) {
      console.error('Failed to save day to localStorage:', error);
    }
  },

  // Получить день
  getDay: (): Day | null => {
    try {
      const value = localStorage.getItem(STORAGE_KEYS.DAY);
      return isValidDay(value) ? value : null;
    } catch (error) {
      console.error('Failed to get day from localStorage:', error);
      return null;
    }
  },

  // Сохранить все настройки разом
  savePreferences: (preferences: SvitloPreferences): void => {
    localStorageService.saveProvider(preferences.provider);
    localStorageService.saveGroup(preferences.group);
    localStorageService.saveDay(preferences.day);
  },

  // Получить все настройки
  getPreferences: (): Partial<SvitloPreferences> => {
    return {
      provider: localStorageService.getProvider() ?? undefined,
      group: localStorageService.getGroup() ?? undefined,
      day: localStorageService.getDay() ?? undefined,
    };
  },

  // Очистить все настройки
  clearPreferences: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.PROVIDER);
      localStorage.removeItem(STORAGE_KEYS.GROUP);
      localStorage.removeItem(STORAGE_KEYS.DAY);
    } catch (error) {
      console.error('Failed to clear preferences from localStorage:', error);
    }
  },
};
