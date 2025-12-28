// Provider types
export type Provider = 'dtek' | 'tsek';
export type DsoId = 301 | 303; // 301 = ДТЕК, 303 = ЦЕК

// Group types (1.1, 1.2, 2.1, 2.2, ... 6.1, 6.2)
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

// Outage interval
export interface OutageInterval {
  start: number; // minutes from start of day (0-1440)
  end: number; // minutes from start of day (0-1440)
  type: 'Definite' | 'NotPlanned' | 'Possible';
}

// Planned outages types
export interface PlannedOutageSchedule {
  slots: OutageInterval[];
  date: string; // ISO 8601 date
  status: 'ScheduleApplies' | string;
}

export interface PlannedOutageGroup {
  today: PlannedOutageSchedule;
  tomorrow: PlannedOutageSchedule;
  updatedOn: string; // ISO 8601 datetime
}

export type PlannedOutagesResponse = Record<Group, PlannedOutageGroup>;

// Probable outages types
export interface ProbableOutageSlots {
  [dayIndex: string]: OutageInterval[]; // "0", "1", "2", ... "6" (7 days)
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

// Helper function to map provider to dsoId
export const getDsoId = (provider: Provider): DsoId => {
  return provider === 'dtek' ? 301 : 303;
};

// Helper function to map dsoId to provider
export const getProvider = (dsoId: DsoId): Provider => {
  return dsoId === 301 ? 'dtek' : 'tsek';
};
