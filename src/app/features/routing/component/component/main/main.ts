import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from "../card/card";
import { Child } from "../child/child";
import { MyCompDialog } from "../my-comp-dialog/my-comp-dialog";
import { ChangecolorDirective } from '../directive/changecolor';
import { Admin } from "../../admin/admin";
import { CardTitle } from "../card-title/card-title";


@Component({
  selector: 'app-main',
  imports: [Card, Child, MyCompDialog, ChangecolorDirective,  CardTitle],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Main {

}
