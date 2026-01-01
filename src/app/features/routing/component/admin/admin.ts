import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Singleton } from '../../../../core/services/singleton/singleton';
import { CommonModule } from '@angular/common';
import { Main } from "../component/main/main";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, Main],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Admin implements OnDestroy{
  @Input() title: string = '';  // Title for the card
  @Input() description: string = '';  // Description for the card
  @Input() buttons: any[] = [];  // Array of buttons (can be of type {label: string, action: Function})
 private destroy$ = new Subject<void>();
  constructor(private single:Singleton){
    //Freeze Your Data (Yes, Really)
    const frozenData = Object.freeze({ name: 'Angular', version: 17 });
   single.increment()
   this.single.log('admin')
   console.log(this.single.varTocheckSingleton,single.getCounter())
   this.single.login('admin','admin').pipe(takeUntil(this.destroy$)).subscribe(res=>{
    console.log(res)
   },err => {
    // This runs on error
    console.error('Error:', err);
  },
  () => {
    // This runs when the observable completes (optional)
    console.log('Completed');
  })
  }

  ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
}
