import { NextResponse } from 'next/server';
import { ReportRepository } from '../repositories/report.repository';
import { ReportService } from '../services/report.service';

const reportRepository = new ReportRepository();
const reportService = new ReportService(reportRepository);

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { read, archived } = body;
    
    if (read === undefined && archived === undefined) {
      return NextResponse.json(
        { message: 'Either read or archived status is required' },
        { status: 400 }
      );
    }
    
    let updatedReport = null;
    
    if (read !== undefined) {
      updatedReport = await reportService.updateReadStatus(id, read);
    }
    
    if (archived !== undefined) {
      updatedReport = await reportService.updateArchiveStatus(id, archived);
    }
    
    if (!updatedReport) {
      return NextResponse.json(
        { message: 'Report not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedReport);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const report = await reportService.getReportById(id);
    
    if (!report) {
      return NextResponse.json(
        { message: 'Report not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(report);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}