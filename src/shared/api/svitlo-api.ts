import {
  type DsoId,
  type PlannedOutagesResponse,
  type ProbableOutagesResponse,
} from '@/shared/types/svitlo.types';
import { axiosInstance } from './axios-instance';

export const getPlannedOutages = async (
  dsoId: DsoId,
): Promise<PlannedOutagesResponse> => {
  const response = await axiosInstance.get<PlannedOutagesResponse>(
    `planned-outages/${dsoId}`,
  );
  return response.data;
};

export const getProbableOutages = async (
  dsoId: DsoId,
): Promise<ProbableOutagesResponse> => {
  const response = await axiosInstance.get<ProbableOutagesResponse>(
    `probable-outages/${dsoId}`,
  );
  return response.data;
};
