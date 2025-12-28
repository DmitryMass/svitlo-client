import type { Group, Provider } from '@/shared/types/svitlo.types';
import { localStorageService } from '@/shared/utils/localStorage';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export type Day = 'today' | 'tomorrow';

export const useSvitloParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const provider =
    (searchParams.get('provider') as Provider) ||
    localStorageService.getProvider() ||
    'dtek';
  const group =
    (searchParams.get('group') as Group) ||
    localStorageService.getGroup() ||
    '1.1';
  const day =
    (searchParams.get('day') as Day) || localStorageService.getDay() || 'today';

  useEffect(() => {
    const urlProvider = searchParams.get('provider');
    const urlGroup = searchParams.get('group');
    const urlDay = searchParams.get('day');

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

  const setProvider = useCallback(
    (newProvider: Provider) => {
      localStorageService.saveProvider(newProvider);

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
      localStorageService.saveGroup(newGroup);

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
      localStorageService.saveDay(newDay);

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
