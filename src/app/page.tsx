'use client';

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { RefreshCw, Eye, Archive, MailCheck, Mail, MailX } from 'lucide-react';
import { reportService } from '@/lib/services/report-service';
import { ButtonReport } from '@/types/reports';

export default function Dashboard() {
  const [reports, setReports] = useState<ButtonReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [selectedReport, setSelectedReport] = useState<ButtonReport | null>(null);

  useEffect(() => {
    fetchReports();
  }, [filter]);

  async function fetchReports() {
    setLoading(true);
    try {
      const data = await reportService.fetchReports(filter);
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(id: string, action: 'markRead' | 'markUnread' | 'archive' | 'unarchive') {
    try {
      setLoading(true);
      
      await reportService.updateReportStatus(id, action);
      await fetchReports();
      
      // If we were viewing this report, refresh it
      if (selectedReport && selectedReport.id === id) {
        const updatedReport = await reportService.getReportById(id);
        setSelectedReport(updatedReport);
      }
      
    } catch (error) {
      console.error('Failed to update report:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Button Watcher Dashboard</h1>
          <Button onClick={fetchReports} className="flex items-center gap-2">
            <RefreshCw size={16} /> Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Button Reports</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant={filter === 'all' ? 'default' : 'outline'} 
                      size="sm" 
                      onClick={() => setFilter('all')}
                    >
                      All
                    </Button>
                    <Button 
                      variant={filter === 'unread' ? 'default' : 'outline'} 
                      size="sm" 
                      onClick={() => setFilter('unread')}
                    >
                      Unread
                    </Button>
                    <Button 
                      variant={filter === 'read' ? 'default' : 'outline'} 
                      size="sm" 
                      onClick={() => setFilter('read')}
                    >
                      Read
                    </Button>
                    <Button 
                      variant={filter === 'archived' ? 'default' : 'outline'} 
                      size="sm" 
                      onClick={() => setFilter('archived')}
                    >
                      Archived
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                  </div>
                ) : reports.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No reports found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Status</TableHead>
                          <TableHead>Website</TableHead>
                          <TableHead>Element</TableHead>
                          <TableHead>Reported</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reports.map((report) => (
                          <TableRow 
                            key={report.id} 
                            className={report.archived ? 'bg-gray-50' : report.read ? 'bg-green-50' : 'bg-blue-50'}
                            onClick={() => setSelectedReport(report)}
                          >
                            <TableCell>
                              <Badge className={reportService.getStatusColor(report)}>
                                {reportService.getStatusText(report)}
                              </Badge>
                            </TableCell>
                            <TableCell>{reportService.getDomain(report.url)}</TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {report.element_text || '[No text]'}
                            </TableCell>
                            <TableCell>{reportService.formatDate(report.created_at)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedReport(report);
                                  }}
                                >
                                  <Eye size={16} />
                                </Button>
                                {!report.read && !report.archived && (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUpdateStatus(report.id, 'markRead');
                                    }}
                                  >
                                    <Mail size={16} />
                                  </Button>
                                )}
                                {report.read && !report.archived && (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUpdateStatus(report.id, 'markUnread');
                                    }}
                                  >
                                    <MailCheck size={16} />
                                  </Button>
                                )}
                                {!report.archived && (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUpdateStatus(report.id, 'archive');
                                    }}
                                  >
                                    <Archive size={16} />
                                  </Button>
                                )}
                                {report.archived && (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUpdateStatus(report.id, 'unarchive');
                                    }}
                                  >
                                    <RefreshCw size={16} />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            {selectedReport ? (
              <Card>
                <CardHeader>
                  <CardTitle>Report Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <div className="mt-1">
                        <Badge className={reportService.getStatusColor(selectedReport)}>
                          {reportService.getStatusText(selectedReport)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">URL</h3>
                      <p className="mt-1 break-all">{selectedReport.url}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Element Text</h3>
                      <div className="mt-1 bg-gray-100 p-2 rounded">
                        {selectedReport.element_text || '[No text]'}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">User Note</h3>
                      <p className="mt-1 whitespace-pre-wrap">{selectedReport.note}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Reported At</h3>
                      <p className="mt-1">{reportService.formatDate(selectedReport.created_at)}</p>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex space-x-2">
                        {!selectedReport.read && !selectedReport.archived && (
                          <Button 
                            onClick={() => handleUpdateStatus(selectedReport.id, 'markRead')}
                            className="flex items-center gap-1"
                          >
                            <Mail size={16} /> Mark as Read
                          </Button>
                        )}
                        {selectedReport.read && !selectedReport.archived && (
                          <Button 
                            variant="outline"
                            onClick={() => handleUpdateStatus(selectedReport.id, 'markUnread')}
                            className="flex items-center gap-1"
                          >
                            <MailX size={16} /> Mark as Unread
                          </Button>
                        )}
                        {!selectedReport.archived && (
                          <Button 
                            variant="outline"
                            onClick={() => handleUpdateStatus(selectedReport.id, 'archive')}
                            className="flex items-center gap-1"
                          >
                            <Archive size={16} /> Archive
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8 text-gray-500">
                    <p>Select a report to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
