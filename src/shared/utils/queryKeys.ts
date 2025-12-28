import type { DsoId } from '@/shared/types/svitlo.types';

export const queryKeys = {
  svitlo: {
    all: ['svitlo'] as const,
    planned: (dsoId: DsoId) =>
      [...queryKeys.svitlo.all, 'planned', dsoId] as const,
    probable: (dsoId: DsoId) =>
      [...queryKeys.svitlo.all, 'probable', dsoId] as const,
  },
};
