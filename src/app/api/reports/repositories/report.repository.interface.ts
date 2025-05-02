import { Report, CreateReportDTO } from '../models/report.model';

export interface IReportRepository {
  findAll(limit: number, status?: string): Promise<Report[]>;
  findById(id: string): Promise<Report | null>;
  create(report: CreateReportDTO): Promise<Report>;
  updateReadStatus(id: string, read: boolean): Promise<Report | null>;
  updateArchiveStatus(id: string, archived: boolean): Promise<Report | null>;
} 