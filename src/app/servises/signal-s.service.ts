import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalSService {
  private showButton = signal(false);
  getShow(){
    return this.showButton;
  }
  setShow(value: boolean){
    this.showButton.set(value);
  }
}
