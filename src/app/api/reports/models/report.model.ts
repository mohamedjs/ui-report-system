export interface Report {
  id: number;
  url: string;
  element_text?: string;
  note?: string;
  created_at: string;
  read: boolean;
  archived: boolean;
}

export interface CreateReportDTO {
  url: string;
  element_text?: string;
  note?: string;
  timestamp?: string;
} 