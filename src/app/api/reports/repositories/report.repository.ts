import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IReportRepository } from './report.repository.interface';
import { Report, CreateReportDTO } from '../models/report.model';

export class ReportRepository implements IReportRepository {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  async findAll(limit: number, status?: string): Promise<Report[]> {
    let query = this.supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (status === 'unread') {
      query = query.eq('read', false).eq('archived', false);
    } else if (status === 'read') {
      query = query.eq('read', true).eq('archived', false);
    } else if (status === 'archived') {
      query = query.eq('archived', true);
    }
    
    const { data, error } = await query.limit(limit);
    
    if (error) {
      throw error;
    }
    
    return data;
  }

  async findById(id: string): Promise<Report | null> {
    const { data, error } = await this.supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  }

  async create(reportDto: CreateReportDTO): Promise<Report> {
    const { data, error } = await this.supabase
      .from('reports')
      .insert([
        { 
          url: reportDto.url, 
          element_text: reportDto.element_text, 
          note: reportDto.note, 
          created_at: reportDto.timestamp || new Date().toISOString(),
          read: false,
          archived: false
        }
      ])
      .select();
      
    if (error) {
      throw error;
    }
    
    return data[0];
  }

  async updateReadStatus(id: string, read: boolean): Promise<Report | null> {
    const { data, error } = await this.supabase
      .from('reports')
      .update({ read, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  }

  async updateArchiveStatus(id: string, archived: boolean): Promise<Report | null> {
    const { data, error } = await this.supabase
      .from('reports')
      .update({ archived, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  }
}