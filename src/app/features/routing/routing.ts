import { Component, signal } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatGridTile, MatGridList } from '@angular/material/grid-list';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
  MatCardSubtitle,
  MatCardActions,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NavigationCancel, Event, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Authservice } from '../../core/services/auth/authservice';

@Component({
  selector: 'app-routing',
  imports: [MatToolbar, CommonModule, MatProgressSpinner, RouterOutlet],
  templateUrl: './routing.html',
  styleUrl: './routing.scss',
})
export class Routing {
  routingEvents: any;
  loading: boolean = false;
  lastNav:any
   isOpenSignal =  signal(false);
  constructor(public router: Router,private auth: Authservice) {
    const navigation= this.router.lastSuccessfulNavigation;
    this.lastNav = this.router.lastSuccessfulNavigation;
    console.log(navigation());
    localStorage.setItem('user', 'username123')
    localStorage.setItem('role','admin')
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started:', event.url);
        this.routingEvents = event.url;
      }
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started:', event.url);
        this.loading = true;
      }
      if (event instanceof NavigationEnd) {
        console.log('Navigation ended:', event.url);
        this.loading = false;
      }
      if (event instanceof NavigationCancel) {
        console.warn('Navigation canceled:', event.reason);
        this.loading = false;
      }
      if (event instanceof NavigationError) {
        console.error('Navigation error:', event.error);
        this.loading = false;
      }
    });
  }

  navigateToUIPage(){
    this.router.navigate(['/materialdesigns', 42],{
  queryParams: { page: 1, size: 10 }
});
  }


    login() {
    this.auth.login({ email: 'test@test.com', password: '123456' })
      .subscribe(() => console.log('Logged in!'));
  }

  logout() {
    this.auth.logout();
  }

}
