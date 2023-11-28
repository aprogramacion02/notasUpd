import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, ActivatedRoute} from '@angular/router';
import { PdfServiceService } from './pdf-service.service';
import { SignalSService } from './servises/signal-s.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, MatButtonModule, MatDividerModule, MatIconModule,MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private activatedRouter = inject(ActivatedRoute);
  private _pdfService = inject(PdfServiceService);
  private signalService = inject(SignalSService);
  getSign!:Signal<any>;
  title = 'notasUpd';
  ngOnInit(): void {
    this.getSign = this.signalService.getShow();
  }
  changeTitle(){
    this.title = this._pdfService.getHola();
  }
  jsonData = { name: 'John Doe', age: 30, city:'Example City' };
  generatePdf() {
    this._pdfService.generatePdf();
  }
  generatePdf1() {
    this._pdfService.generatePdf1(this.jsonData);
  }
}