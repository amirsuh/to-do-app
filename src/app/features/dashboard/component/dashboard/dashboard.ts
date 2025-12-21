import { Component, inject, OnInit } from '@angular/core';
import { RxjsandobservablesService } from '../../../rxjsandobservables/service/rxjsandobservables';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{
  userService = inject(RxjsandobservablesService)
  ngOnInit(): void {
     this.userService.getUserData().subscribe(users => {
      console.log('User Data from Component 1:', users);
    });
  }

}
