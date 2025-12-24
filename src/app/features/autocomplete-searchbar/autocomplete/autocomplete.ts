import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteService } from '../service/autocomplete';
import {
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  forkJoin,
  from,
  mergeMap,
  of,
  ReplaySubject,
  Subject,
  switchMap,
  throttle,
  throttleTime,
} from 'rxjs';
import { catchError, concat, concatMap, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Autocomplete {
  searchText: string = '';
  resultsOfrecipes: WritableSignal<any> = signal<any>([]);
  resultsOfrecipesreactive: WritableSignal<any> = signal<any>([]);
  isFocus: boolean = false;
  searchSubject = new Subject<string>();
  recepeCache = new ReplaySubject<any[]>(1);
  recipeCacheMap = new Map<string, any[]>();
  searchTextReactive = new FormControl('');
  isReactiveFocus: boolean = false;
  constructor(private service: AutocompleteService) {
    this.searchTextReactive.valueChanges
      .pipe(
        debounceTime(500),
        // filter((res)=> !!res && res?.trim().length>3 ),
        switchMap((value) => {
          const text = value?.trim();

          // 🔹 empty input → load all recipes
          if (!text) {
            return this.service.searchRecipe(text);
          }

          // 🔹 short input → do nothing
          if (text.length <= 3) {
            return EMPTY;
          }

          // 🔹 valid search
          return this.service.searchRecipe(text);
        })
      )
      .subscribe((res: any) => {
        this.resultsOfrecipesreactive.set(res.recipes);
      });
  }
  ngOnInit() {
    // this.searchSubject
    //   .pipe(debounceTime(500), distinctUntilChanged(), throttleTime(500),)
    //   .subscribe((text: string) => {
    //     this.service
    //       .searchRecipe(text)
    //       .pipe(debounceTime(400), distinctUntilChanged())
    //       .subscribe((res: any) => {
    //         this.resultsOfrecipes.set(res.recipes);
    //         this.recepeCache.next(res.recipes)
    //         //.update(data=>[...res.recipes,data])

    //       })
    //   });

    //   getUserPosts(userId: number) {
    //   // First, fetch the user data
    //   return this.http.get(`${this.apiUrl}/users/${userId}`).pipe(
    //     mergeMap(user => {
    //       // Once we have the user, fetch their posts
    //       return this.http.get(`${this.apiUrl}/posts?userId=${userId}`).pipe(
    //         // Combine both the user data and posts into a single object
    //         map(posts => ({ user, posts }))
    //       );
    //     })
    //   );
    // }

    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        // Only continue if input is non-empty
        filter((text) => text.trim().length > 0),
        switchMap((text) => this.service.searchRecipe(text))
      )
      .subscribe((res: any) => {
        this.resultsOfrecipes.set(res.recipes);
        this.recepeCache.next(res.recipes);
      });
  }

  //  this.searchText.

  onChangeInput(event: any) {
    this.searchSubject.next(event);
    let text = event;
  }
  onBlur(type: string) {
    type == 'reactive' ? (this.isReactiveFocus = false) : (this.isFocus = false);
  }
  onFocus(type: string) {
    type == 'reactive' ? (this.isReactiveFocus = true) : (this.isFocus = true);
  }
}
