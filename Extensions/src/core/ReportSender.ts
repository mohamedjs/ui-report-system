import { TextExtractor } from "../utils/TextExtractor";
import { SpinnerInjector } from "../styles/SpinnerInjector";

export interface Report {
  url: string;
  element_text: string;
  note: string;
  timestamp: string;
}

export class ReportSender {
  async send(target: Element, noteText: string, form: HTMLElement): Promise<void> {
    const report: Report = {
      url: window.location.href,
      element_text: TextExtractor.extractFirstVisibleText(target),
      note: noteText,
      timestamp: new Date().toISOString()
    };

    const submitButton = form.querySelector('button:last-child') as HTMLButtonElement;
    this.showLoading(submitButton);

    try {
      const response = await fetch('http://localhost:3002/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });

      if (!response.ok) throw new Error('Failed to submit report');

      document.body.removeChild(form);
    } catch (error) {
      console.error('Error submitting report:', error);
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Report';
      alert('Failed to submit report. Please try again.');
    }
  }

  private showLoading(button: HTMLButtonElement): void {
    button.disabled = true;
    new SpinnerInjector().inject();
    button.innerHTML = '<span style="display: inline-block; width: 16px; height: 16px; border: 2px solid #fff; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite;"></span> Submitting...';
  }
}