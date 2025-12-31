import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from "../card/card";
import { Child } from "../child/child";
import { MyCompDialog } from "../my-comp-dialog/my-comp-dialog";
import { ChangecolorDirective } from '../directive/changecolor';


@Component({
  selector: 'app-main',
  imports: [Card, Child, MyCompDialog,ChangecolorDirective],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Main {

}
