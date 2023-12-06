import { Component, OnDestroy, OnInit, ViewChild, inject, AfterViewInit,ElementRef, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalSService } from '../../services/signal-s.service';
import {  ReactiveFormsModule,FormBuilder, Validators, FormControl } from '@angular/forms';
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
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SongsService } from '../../services/songs.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
let data:any={}
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
  imports: [MatDialogModule,CommonModule,MatButtonModule, MatDividerModule, MatIconModule, MatDatepickerModule, MatNativeDateModule,ReactiveFormsModule,MatExpansionModule,MatInputModule,MatTableModule,MatPaginatorModule, MatProgressBarModule,MatProgressSpinnerModule,MatSlideToggleModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(public dialog: MatDialog, private elementRef: ElementRef, private _pdfService: PdfServiceService, private formBuilder: FormBuilder, private matSnackBar: MatSnackBar, private songsService: SongsService) {}
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  colorIcon = '';
  songsSignal!:Signal<any>;
  clickedRows:any = {};
  myControl = new FormControl('');
  filteredOptions:any[] = [];
  progres= 10;
  pageSize = [5, 10, 20];
  loading = true;
  private saubForm:Subscription;
  private signalServise = inject(SignalSService);
  dataPiker = this.formBuilder.group({
    start:[null],
    end:[null]
  });
  formSongs = this.formBuilder.group({
    title:['', Validators.required],
    artist:['', Validators.required],
    genre:['', Validators.required],
    album:['', Validators.required],
    duration:['', Validators.required],
    year:['', Validators.required],
    trackNumber:['', Validators.required],
    isExplicit:[true]
  });
  step = -1;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.signalServise.setShow(true);
    this.songsSignal = this.songsService.getAllSignal();
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
    !!this.saubForm && !this.saubForm.closed && this.saubForm.unsubscribe();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const id = data._id;
        const datos = structuredClone(data);
        delete datos._id;
        this.saubForm = this.songsService.updateSongs({id,datos}).subscribe({
          next:(data) => {
            console.log(data);
          },
          error:(err) => {
            console.log(err);
          }
        })
      }
    });
  }
  inputSelected(): void {
    const inpSong = this.myControl.value;
    if(!!inpSong){
      this.filteredOptions = this.songsSignal().filter(e=>
        e.title.toUpperCase().includes(inpSong.toUpperCase()) ||
        e.artist.toUpperCase().includes(inpSong.toUpperCase()) 
      );
    }
    else{
      this.filteredOptions = [];
    }
  }
  clickSelected(obj:any): void {
    this.myControl.setValue(`${obj.title} - ${obj.artist}`);
    data = obj;
    this.filteredOptions = [];
    this.openDialog();
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
  isNumeric(event:Event):void{
    const valor = event.target['getAttribute']('formcontrolname');
    !!valor && this.formSongs.get(valor).setValue(event.target['value'].replace(/\D/g, ''));
  };
  isCaracter(event:Event):void{
    const valor = event.target['getAttribute']('formcontrolname');
    !!valor && this.formSongs.get(valor).setValue(event.target['value'].replace(/[^a-zA-Z ñÑ]/g, '').toUpperCase());
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
  send(){
    if(this.formSongs.status == 'INVALID'){
      this.matSnackBar.open('Tiene Campos Vacios', 'cerrar',{duration:3000});
    }
    else{
      this.songsService.songsCreate(this.formSongs.value).subscribe({
        next:(res)=>{
          this.formSongs.reset();
          console.log(res);
          this.matSnackBar.open('Guardado Correctamente', 'cerrar',{duration:3000});
          this.formSongs.get('isExplicit').setValue(true);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }
};
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule,ReactiveFormsModule,MatSlideToggleModule],
})
export class DialogContentExampleDialog {
  formSongEdit = this.formBuilder.group({
    title:[data.title, Validators.required],
    artist:[data.artist, Validators.required],
    genre:[data.genre, Validators.required],
    album:[data.album, Validators.required],
    duration:[data.duration, Validators.required],
    year:[data.year, Validators.required],
    trackNumber:[data.trackNumber, Validators.required],
    isExplicit:[data.isExplicit]
  });
  
  constructor(private formBuilder: FormBuilder) {}
  isNumeric(event:Event):void{
    const valor = event.target['getAttribute']('formcontrolname');
    !!valor && this.formSongEdit.get(valor).setValue(event.target['value'].replace(/\D/g, ''));
  };
  isCaracter(event:Event):void{
    const valor = event.target['getAttribute']('formcontrolname');
    !!valor && this.formSongEdit.get(valor).setValue(event.target['value'].replace(/[^a-zA-Z ñÑ]/g, '').toUpperCase());
  }
  edit(){
    data.title = this.formSongEdit.get('title').value;
    data.artist = this.formSongEdit.get('artist').value;
    data.genre = this.formSongEdit.get('genre').value;
    data.album = this.formSongEdit.get('album').value;
    data.duration = +this.formSongEdit.get('duration').value;
    data.year = +this.formSongEdit.get('year').value;
    data.trackNumber = +this.formSongEdit.get('trackNumber').value;
    data.isExplicit = this.formSongEdit.get('isExplicit').value;
  }
}
