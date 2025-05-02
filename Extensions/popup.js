function getReports() {
  fetch('http://localhost:3002/api/reports?limit=5', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('report-list');
      
      if (data.length === 0) {
        list.innerHTML = '<div class="no-reports">No reports found</div>';
        return;
      }

      list.innerHTML = data.map(report => {
        const date = new Date(report.updated_at);
        const formattedTime = date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        return `
          <li>
            <div class="report-text">${report.element_text || 'No text provided'}</div>
            <div class="report-time">${formattedTime}</div>
          </li>
        `;
      }).join('');
    })
    .catch(error => {
      const list = document.getElementById('report-list');
      list.innerHTML = '<div class="no-reports">Failed to load reports</div>';
      console.error('Error fetching reports:', error);
    });
}

// Initial load
getReports();

// Refresh every 30 seconds
setInterval(getReports, 30000);

