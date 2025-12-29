export type Provider = 'dtek' | 'tsek';
export type DsoId = 301 | 303;

export type Group =
  | '1.1'
  | '1.2'
  | '2.1'
  | '2.2'
  | '3.1'
  | '3.2'
  | '4.1'
  | '4.2'
  | '5.1'
  | '5.2'
  | '6.1'
  | '6.2';

export interface OutageInterval {
  start: number;
  end: number;
  type: 'Definite' | 'NotPlanned' | 'Possible';
}

export interface PlannedOutageSchedule {
  slots: OutageInterval[];
  date: string;
  status: 'ScheduleApplies' | 'WaitingForSchedule' | string;
}

export interface PlannedOutageGroup {
  today: PlannedOutageSchedule;
  tomorrow: PlannedOutageSchedule;
  updatedOn: string;
}

export type PlannedOutagesResponse = Record<Group, PlannedOutageGroup>;

export interface ProbableOutageSlots {
  [dayIndex: string]: OutageInterval[];
}

export interface ProbableOutageGroup {
  slots: ProbableOutageSlots;
}

export interface ProbableOutageDso {
  groups: Record<Group, ProbableOutageGroup>;
}

export interface ProbableOutagesResponse {
  [regionId: string]: {
    dsos: {
      [dsoId: string]: ProbableOutageDso;
    };
  };
}

export const getDsoId = (provider: Provider): DsoId => {
  return provider === 'dtek' ? 301 : 303;
};

export const getProvider = (dsoId: DsoId): Provider => {
  return dsoId === 301 ? 'dtek' : 'tsek';
};
