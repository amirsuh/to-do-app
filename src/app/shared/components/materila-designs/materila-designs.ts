import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StateService } from '../../../features/statemanagement/state-service';
import { CommonModule } from '@angular/common';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";

@Component({
  selector: 'app-materila-designs',
  imports: [MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatTableModule,
    MatListModule,
    MatChipsModule,
    MatMenuModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTooltipModule, CommonModule,
    MatSnackBarModule, MatGridList, MatGridTile],
  templateUrl: './materila-designs.html',
  styleUrl: './materila-designs.scss',
})
export class MaterilaDesigns {
  columns = ['name', 'role'];
cards = [
    { title: 'Card One', description: 'This is a material card.' },
    { title: 'Card Two', description: 'Responsive grid layout.' },
    { title: 'Card Three', description: 'Angular Material design.' }
  ];
  data = [
    { name: 'Alice', role: 'Developer' },
    { name: 'Bob', role: 'Designer' }
  ];
  user$;
  constructor(private userService:StateService){
    this.user$ = this.userService.user$;
  }
}
