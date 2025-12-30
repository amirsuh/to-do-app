import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'platform',
})
export class Singleton {
  varTocheckSingleton:number = 0
  private counter: number = 0;


  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  increment(): void {
    this.counter++;
  }
  getCounter(): number {
    return this.counter;
  }

}
