import { ButtonReport } from '@/types/reports';

export class ReportService {
  /**
   * Fetches reports based on the provided filter
   * @param filter The filter to apply when fetching reports
   * @returns Promise with the fetched reports
   */
  async fetchReports(filter: 'all' | 'unread' | 'read' | 'archived'): Promise<ButtonReport[]> {
    try {
      const queryParams = filter !== 'all' ? `?status=${filter}` : '';
      const response = await fetch(`/api/reports${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch reports');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  }

  /**
   * Updates the status of a report
   * @param id The ID of the report to update
   * @param action The action to perform (markRead, markUnread, archive, unarchive)
   * @returns Promise with the updated report
   */
  async updateReportStatus(id: string, action: 'markRead' | 'markUnread' | 'archive' | 'unarchive'): Promise<ButtonReport> {
    let payload = {};
    
    if (action === 'markRead') {
      payload = { read: true };
    } else if (action === 'markUnread') {
      payload = { read: false };
    } else if (action === 'archive') {
      payload = { archived: true };
    } else if (action === 'unarchive') {
      payload = { archived: false };
    }
    
    const response = await fetch(`/api/reports/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update report');
    }
    
    return await response.json();
  }

  /**
   * Fetches a single report by ID
   * @param id The ID of the report to fetch
   * @returns Promise with the fetched report
   */
  async getReportById(id: string): Promise<ButtonReport> {
    const response = await fetch(`/api/reports/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch report');
    }
    
    return await response.json();
  }

  /**
   * Formats a date string to a more user-friendly format
   * @param dateString The date string to format
   * @returns Formatted date string
   */
  formatDate(dateString: string): string {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    } catch {
      return dateString;
    }
  }

  /**
   * Returns the appropriate CSS classes for a report's status badge
   * @param report The report to get the status color for
   * @returns CSS class string
   */
  getStatusColor(report: ButtonReport): string {
    if (report.archived) return 'bg-gray-200 text-gray-800';
    if (!report.read) return 'bg-blue-200 text-blue-800';
    return 'bg-green-200 text-green-800';
  }

  /**
   * Returns a human-readable status text for a report
   * @param report The report to get the status text for
   * @returns Status text
   */
  getStatusText(report: ButtonReport): string {
    if (report.archived) return 'Archived';
    if (report.read) return 'Read';
    return 'Unread';
  }

  /**
   * Extracts the domain from a URL
   * @param url The URL to extract the domain from
   * @returns The domain
   */
  getDomain(url: string): string {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  }
}

export const reportService = new ReportService(); 