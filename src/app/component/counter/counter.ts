import { ChangeDetectionStrategy, Component, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Counter {
count=model<number>(0)
increment(){this.count.update(c => c + 1);}
decrement(){this.count.update(c => c - 1);}
}
