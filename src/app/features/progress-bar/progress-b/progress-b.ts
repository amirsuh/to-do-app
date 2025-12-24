import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-progress-b',
  imports: [],
  templateUrl: './progress-b.html',
  styleUrl: './progress-b.scss',
})
export class ProgressB {
progessCount = input<number>();
}
