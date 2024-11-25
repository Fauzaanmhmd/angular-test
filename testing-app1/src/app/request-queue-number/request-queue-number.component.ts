import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css']
})
export class RequestQueueNumberComponent {
  visitorForm: FormGroup;
  queueNumber: string = 'A001';
  showPrintPopup: boolean = false;
  currentDate: string = '';

  private queueCount: number = 0;

  constructor(private fb: FormBuilder, private router: Router) {
    this.visitorForm = this.fb.group({
      name: ['', Validators.required],
      customerName: ['', Validators.required],
      address: ['', Validators.required],
      size: ['', [Validators.required, Validators.min(1)]],
    });

    const savedQueueCount = localStorage.getItem('queueCount');
    this.queueCount = savedQueueCount ? parseInt(savedQueueCount, 10) : 0;
    this.updateQueueNumber();
  }

  generateBarcode(queue: string): string {
    return `https://barcode.tec-it.com/barcode.ashx?data=${queue}&code=Code128&dpi=96`;
  }

  changePage(action: string) {
    if (action === 'request-queue-number') {
      this.queueCount++;
      localStorage.setItem('queueCount', this.queueCount.toString());
      this.updateQueueNumber();
      this.currentDate = new Date().toLocaleString();
      this.showPrintPopup = true;
    }
  }

  closePopup() {
    this.showPrintPopup = false;
  }

  printQueue() {
    const printContents = document.getElementById('printSection')?.innerHTML || '';
    const printWindow = window.open('', '_blank');
    printWindow?.document.write('<html><head><title>Print Queue</title></head><body>');
    printWindow?.document.write(printContents);
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
    this.queueCount++;
    localStorage.setItem('queueCount', this.queueCount.toString());
    this.updateQueueNumber();
    this.closePopup();
  }

  private updateQueueNumber() {
    this.queueNumber = `A${this.queueCount.toString().padStart(3, '0')}`;
  }

  redirectToRoot() {
    this.router.navigate(['/']);
  }
}
