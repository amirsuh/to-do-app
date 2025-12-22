import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe({
      next: (data) => {
        console.log(data); // handle resolved data here
      },
      complete: () => {
        console.log('Route data observable completed');
      },
    });
  }
}
