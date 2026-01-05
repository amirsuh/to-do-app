export interface BatchModel {
  id: number;
  batchName: string;
  startDate: string; // ISO string for localStorage convenience
  endDate: string;
  isActive: boolean;
}
