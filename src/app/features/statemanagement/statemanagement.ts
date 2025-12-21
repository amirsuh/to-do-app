import { Component, inject, OnInit } from '@angular/core';
import { RxjsandobservablesService } from '../rxjsandobservables/service/rxjsandobservables';

@Component({
  selector: 'app-statemanagement',
  imports: [],
  templateUrl: './statemanagement.html',
  styleUrl: './statemanagement.scss',
})
export class Statemanagement implements OnInit{
  userService = inject(RxjsandobservablesService)
  ngOnInit(): void {
     this.userService.getUserData().subscribe(users => {
      console.log('User Data from Component 1:', users);
    });
  }

}
