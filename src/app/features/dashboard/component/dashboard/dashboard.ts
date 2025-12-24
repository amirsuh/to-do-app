import { Component, inject, OnInit, signal } from '@angular/core';
import { RxjsandobservablesService } from '../../../rxjsandobservables/service/rxjsandobservables';
import { ProgressB } from "../../../progress-bar/progress-b/progress-b";

@Component({
  selector: 'app-dashboard',
  imports: [ProgressB],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{
  userService = inject(RxjsandobservablesService)
  count =signal<number>(70)
  ngOnInit(): void {
     this.userService.getUserData().subscribe(users => {
      console.log('User Data from Component 1:', users);
    });
  }

}
