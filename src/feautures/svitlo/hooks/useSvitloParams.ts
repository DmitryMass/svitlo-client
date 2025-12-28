import type { Group, Provider } from '@/shared/types/svitlo.types';
import { localStorageService } from '@/shared/utils/localStorage';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export type Day = 'today' | 'tomorrow';

export const useSvitloParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Приоритет: URL params → localStorage → дефолтные значения
  const provider =
    (searchParams.get('provider') as Provider) ||
    localStorageService.getProvider() ||
    'dtek';
  const group =
    (searchParams.get('group') as Group) ||
    localStorageService.getGroup() ||
    '1.1';
  const day =
    (searchParams.get('day') as Day) ||
    localStorageService.getDay() ||
    'today';

  // Синхронизация URL с localStorage при первой загрузке
  useEffect(() => {
    const urlProvider = searchParams.get('provider');
    const urlGroup = searchParams.get('group');
    const urlDay = searchParams.get('day');

    // Если в URL нет параметров, но есть в localStorage, обновляем URL
    if (!urlProvider || !urlGroup || !urlDay) {
      const savedPreferences = localStorageService.getPreferences();

      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          if (!urlProvider && savedPreferences.provider) {
            newParams.set('provider', savedPreferences.provider);
          }
          if (!urlGroup && savedPreferences.group) {
            newParams.set('group', savedPreferences.group);
          }
          if (!urlDay && savedPreferences.day) {
            newParams.set('day', savedPreferences.day);
          }
          return newParams;
        },
        { replace: true },
      );
    }
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // Пустой массив зависимостей - выполняется только при монтировании

  const setProvider = useCallback(
    (newProvider: Provider) => {
      // Сохраняем в localStorage
      localStorageService.saveProvider(newProvider);

      // Обновляем URL
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set('provider', newProvider);
        return newParams;
      });
    },
    [setSearchParams],
  );

  const setGroup = useCallback(
    (newGroup: Group) => {
      // Сохраняем в localStorage
      localStorageService.saveGroup(newGroup);

      // Обновляем URL
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set('group', newGroup);
        return newParams;
      });
    },
    [setSearchParams],
  );

  const setDay = useCallback(
    (newDay: Day) => {
      // Сохраняем в localStorage
      localStorageService.saveDay(newDay);

      // Обновляем URL
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set('day', newDay);
        return newParams;
      });
    },
    [setSearchParams],
  );

  return { provider, group, day, setProvider, setGroup, setDay };
};
