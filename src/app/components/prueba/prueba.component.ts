import { Component, OnDestroy, OnInit, ViewChild, inject, AfterViewInit,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalSService } from '../../servises/signal-s.service';
import {  ReactiveFormsModule,FormBuilder } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PdfServiceService } from '../../pdf-service.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDividerModule, MatIconModule, MatDatepickerModule, MatNativeDateModule,ReactiveFormsModule,MatExpansionModule,MatInputModule,MatTableModule,MatPaginatorModule, MatProgressBarModule,MatProgressSpinnerModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  colorIcon = '';
  clickedRows:any = {};
  progres= 10;
  pageSize = [5, 10, 20];
  loading = true;
  private signalServise = inject(SignalSService);
  private elementRef = inject(ElementRef);
  private _pdfService = inject(PdfServiceService);
  private formBuilder = inject(FormBuilder);
  dataPiker = this.formBuilder.group({
    start:[null],
    end:[null]
  });
  step = -1;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.signalServise.setShow(true);
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
  ngAfterViewInit() {
    this.auto()
    this.dataSource.paginator = this.paginator;
    !!this.elementRef.nativeElement.querySelector('#mat-paginator-page-size-label-0') &&
    (this.elementRef.nativeElement.querySelector('#mat-paginator-page-size-label-0').textContent = "Items Por Pagina:");
  }
  ngOnDestroy(): void {
    
    this.signalServise.setShow(false);
  }
  btnclick(item:string): void {
    console.log('object',item);
  }
  changeDate(){
    console.log(this.dataPiker.get('start')); 
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  clickTable(obj:any){
    this.clickedRows = obj;
  }
  focusInp(id=''){
    this.colorIcon = id;
  }
  filterTable(item:string){
    const fillDat = ELEMENT_DATA.filter(e=>e.name.toUpperCase().includes(item.toUpperCase()))
    this.dataSource = new MatTableDataSource<PeriodicElement>(fillDat);
    this.dataSource.paginator = this.paginator;
    if(fillDat.length > 5 && fillDat.length <= 10)this.pageSize = [5,10];
    else if(fillDat.length > 10)this.pageSize = [5,10,20];
    else this.pageSize = [5];
  }
  auto(){
    const clear = setTimeout(()=>{
      this.progres+=1;
      if(this.progres==100)clearTimeout(clear);
    },100);
  }
  generatePdf(){
    this._pdfService.generatePdf();
  }
}
