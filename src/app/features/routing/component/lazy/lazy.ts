import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-lazy',
  imports: [],
  templateUrl: './lazy.html',
  styleUrl: './lazy.scss',
})
export class Lazy {
  @Input() title: string = '';  // Title for the card
  @Input() description: string = '';  // Description for the card
  @Input() buttons: any[] = [];
}
