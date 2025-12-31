import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-comp-dialog',
  imports: [],
  templateUrl: './my-comp-dialog.html',
  styleUrl: './my-comp-dialog.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MyCompDialog {

}
