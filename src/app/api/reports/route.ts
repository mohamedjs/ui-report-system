import { NextResponse } from 'next/server';
import { ReportRepository } from './repositories/report.repository';
import { ReportService } from './services/report.service';
import { CreateReportDTO } from './models/report.model';

const reportService = new ReportService(new ReportRepository());

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const status = url.searchParams.get('status');
    
    const reports = await reportService.getReports(limit, status);
    return NextResponse.json(reports);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: CreateReportDTO = await request.json();
    
    const report = await reportService.createReport(body);
    return NextResponse.json(report, { status: 201 });
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.message === 'URL is required') {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
