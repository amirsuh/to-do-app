import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Signalservice {
  private count = signal(0)

  // double the count
  doublecount = computed(()=>this.count()*2)

  increment(){
    this.count.update(count=>count++)
  }

  decrement(){
    this.count.update(count=>count--)
  }
}
