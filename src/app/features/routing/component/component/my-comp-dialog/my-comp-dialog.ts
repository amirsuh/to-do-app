import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-comp-dialog',
  imports: [],
  templateUrl: './my-comp-dialog.html',
  styleUrl: './my-comp-dialog.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MyCompDialog {
constructor() {
const username = 'karol'; // TypeScript infers: string
const userIds = [1, 2, 3]; // TypeScript infers: number[]
console.log(typeof username === 'string', 'username should be a string');
console.log(Array.isArray(userIds) && userIds.every(id => typeof id === 'number'), 'userIds should be an array of numbers');
type Status = 'active' | 'inactive' | 'pending';
let userStatus: Status = 'inactive'; // valid
console.log(userStatus === 'inactive', 'userStatus should be inactive');
}
}
