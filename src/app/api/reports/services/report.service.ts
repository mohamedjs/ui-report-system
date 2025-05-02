import { IReportRepository } from '../repositories/report.repository.interface';
import { Report, CreateReportDTO } from '../models/report.model';

export class ReportService {
  constructor(private readonly reportRepository: IReportRepository) {}

  async getReports(limit: number, status?: string): Promise<Report[]> {
    return this.reportRepository.findAll(limit, status);
  }

  async getReportById(id: string): Promise<Report | null> {
    return this.reportRepository.findById(id);
  }

  async createReport(reportDto: CreateReportDTO): Promise<Report> {
    if (!reportDto.url) {
      throw new Error('URL is required');
    }
    return this.reportRepository.create(reportDto);
  }

  async updateReadStatus(id: string, read: boolean): Promise<Report | null> {
    return this.reportRepository.updateReadStatus(id, read);
  }

  async updateArchiveStatus(id: string, archived: boolean): Promise<Report | null> {
    return this.reportRepository.updateArchiveStatus(id, archived);
  }
}