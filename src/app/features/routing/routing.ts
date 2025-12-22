import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatGridTile, MatGridList } from "@angular/material/grid-list";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardSubtitle, MatCardActions } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routing',
  imports: [MatToolbar,CommonModule, ],
  templateUrl: './routing.html',
  styleUrl: './routing.scss',
})
export class Routing {

}
