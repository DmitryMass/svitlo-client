import { getProbableOutages } from '@/shared/api/svitlo-api';
import { RateLimitError } from '@/shared/api/axios-instance';
import type { DsoId } from '@/shared/types/svitlo.types';
import { queryKeys } from '@/shared/utils/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useProbableOutages = (dsoId: DsoId) => {
  return useQuery({
    queryKey: queryKeys.svitlo.probable(dsoId),
    queryFn: () => getProbableOutages(dsoId),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      if (error instanceof RateLimitError) {
        return false;
      }
      return failureCount < 2;
    },
    refetchInterval: 1000 * 60 * 5,
  });
};
