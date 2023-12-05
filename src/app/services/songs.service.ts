import { HttpClient } from '@angular/common/http';
import { Injectable, inject,Injector } from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private injector = inject(Injector);
  private httpClient = inject(HttpClient);
  url = 'http://localhost:3500';

  getAll(){
    return this.httpClient.get<any[]>(this.url);
  }
  getById(id:string){
    return this.httpClient.get<any>(`${this.url}/${id}`);
  }
  getAllSignal(){
    return toSignal(this.httpClient.get<any[]>(this.url),{initialValue:[],injector:this.injector});
  }
  getByIdSignal(id){
    return toSignal(this.httpClient.get<any[]>(`${this.url}/${id}`),{initialValue:[],injector:this.injector});
  }
  songsCreate(datos){
    return this.httpClient.post<any[]>(`${this.url}/songsCreate`,datos);
  }
  updateSongs(datos){
    return this.httpClient.put<any[]>(`${this.url}/${datos}`,datos);
  }
}
