import type { Group, Provider } from '@/shared/types/svitlo.types';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export type Day = 'today' | 'tomorrow';

export const useSvitloParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const provider = (searchParams.get('provider') as Provider) || 'dtek';
  const group = (searchParams.get('group') as Group) || '1.1';
  const day = (searchParams.get('day') as Day) || 'today';

  const setProvider = useCallback(
    (newProvider: Provider) => {
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
