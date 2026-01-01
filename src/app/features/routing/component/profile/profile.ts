import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Singleton } from '../../../../core/services/singleton/singleton';
import { debounceTime, filter, map, Observable, Subject } from 'rxjs';
import { Product } from '../model.ts/product.model';
import { UserProfile } from '../model.ts/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhonePipe } from '../../../../shared/pipes/phone/phonepipe-pipe';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, PhonePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  productList$?: Observable<Product[]>;
  filteredList$?: Observable<Product[]>;
  searchText: string = '';
  searchSubject = new Subject<string>();
  sortColumn: keyof Product = 'title'; // default sort
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private route: ActivatedRoute, private single: Singleton) {

    this.route.data.subscribe({
      next: (data) => {
        console.log(data); // handle resolved data here
      },
      complete: () => {
        console.log('Route data observable completed');
      },
    });
    this.productList$ = this.single.getPrdoctList();
    this.searchSubject
      .pipe(
        debounceTime(500),
        map((searchTxt) => (searchTxt || '').toLowerCase())
      )
      .subscribe((searchTxt) => {
        this.filteredList$ = this.productList$?.pipe(
          map((items) =>
            items
              .filter((item) => {
                const brand = (item.brand || '').toLowerCase();
                const title = (item.title || '').toLowerCase();
                const description = (item.description || '').toLowerCase();

                return (
                  brand.includes(searchTxt) ||
                  title.includes(searchTxt) ||
                  description.includes(searchTxt)
                );
              })
              .sort((a, b) => this.sortItems(a, b))
          )
        );
      });

    this.single
      .fetch<Product>('https://dummyjson.com/products')
      .subscribe((user) => console.log(user));
  }

  onSearchChange(event: any) {
    let text = event ? event : this.searchText;
    this.searchSubject.next(text);
    //  let searchTxt = event
    //  this.filteredList$ = this.productList$?.pipe(map(items=>items.filter(item => {
    //     const brand = (item.brand || '').toLowerCase();
    //     const title = (item.title || '').toLowerCase();
    //     const description = (item.description || '').toLowerCase();

    //     return brand.includes(searchTxt) ||
    //            title.includes(searchTxt) ||
    //            description.includes(searchTxt);
    //   })))
  }

  sortItems(a: Product, b: Product) {
    const vA = a[this.sortColumn];
    const vB = b[this.sortColumn];
    if (vA < vB) return this.sortDirection === 'asc' ? -1 : 1;
    if (vA < vB) return this.sortDirection === 'asc' ? 1 : -1;
    return 0;
  }

  toggleSort(colum: keyof Product) {
    if ((this.sortColumn = colum)) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = colum;
      this.sortDirection = 'asc';
    }

    // Trigger a re-evaluation of filteredList$
    this.searchSubject.next(this.searchText);
  }


  learnTypeScript() {
        //learning types in TS START
    //some of properties needed for form
    type ProfileForm = Partial<UserProfile>;
    const initialForm: Readonly<UserProfile> = {
      username: 'alexdev',
      email: 'alex@example.com',
      bio: '',
    };
    //initialForm.username = '' // Error: Cannot assign to 'username' because it is a read-only property.

    // Create a new mutable object using the spread syntax #1
    const mutableForm: UserProfile = { ...initialForm };
    mutableForm.username = 'newusername';
    // Create a new mutable object using Object.assign #2
    const mutableFormWithAssign: UserProfile = Object.assign({}, initialForm);
    mutableFormWithAssign.username = 'anotheruser'; // Works fine
    //learning types in TS END
  }

  getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

    isUser(obj: any): obj is any {
  return typeof obj?.id === 'number' && typeof obj.name === 'string';
}

  asapScheduler(){


// Usage:
const user = {
  id: 1,
  name: 'Alex'
};

if (this.isUser(user)) {
  // TypeScript infers user as User here
}
  }
}
