import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  viewChild,
  ViewChild,
} from '@angular/core';
import { RxjsandobservablesService } from './service/rxjsandobservables';
import { HttpClient } from '@angular/common/http';
import {
  combineLatest,
  concat,
  concatMap,
  debounceTime,
  filter,
  from,
  fromEvent,
  interval,
  map,
  merge,
  Observable,
  of,
  retry,
  skip,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-rxjsandobservables',
  imports: [CommonModule],
  templateUrl: './rxjsandobservables.html',
  styleUrl: './rxjsandobservables.scss',
})
export class Rxjsandobservables implements OnInit, OnDestroy {
  @ViewChild('showsInput', { static: true }) showsInput!: ElementRef;
  @ViewChild('showsInputText', { static: true }) showsInputText!: ElementRef;
  private readonly apiUrl: string = 'https://api.tvmaze.com/search/shows?q=';
  private readonly apiUrlforcat: string = 'https://api.artic.edu/api/v1/artworks/search?q=';
  http = inject(HttpClient);
  helloWorld: any = [];
  myObservable = new Observable((observer) => {
    observer.next('Hello');
    observer.next('World');
    observer.complete();
  });
  source$ = from([1, 2, 3, 4, 5]);
  source = from([1, 2, 3, 4, 5]);
  tapMapFilterTap: any = [];
  doubled = this.source.pipe(
    tap((val) => val),
    map((value) => value * 1),
    filter((data) => data % 2 !== 0),
    tap((val) => val)
  );
  map = map((values: any) => values * 2);
  source1 = of(1, 3);
  source2 = of(2, 4);
  filter = filter((val: number) => val % 2 == 0);
  diableRes: any = [];
  diuble$ = this.source$.pipe(this.map, this.filter);

  concatenatedData: any = [];
  concatenated = concat(this.source1, this.source2);

  doubles = map((val: number) => val * 2); // operator stored in variable
  logTaps = tap((val) => val);

  sources$ = from([1, 2, 3, 4, 5]);

  doubleds$ = this.sources$.pipe(this.doubles, this.logTaps);
  merged$: any = this.merged();
  result$!: Observable<any>;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    fromEvent(this.showsInput.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        switchMap((event: any) => {
          console.log((event.target as HTMLInputElement).value);
          const query = (event.target as HTMLInputElement).value;
          return this.http.get(`${this.apiUrl}${query}`);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error('Error fetching shows:', error),
      });

    fromEvent(this.showsInput.nativeElement, 'input')
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: any) => {
        const query = (event.target as HTMLInputElement).value;
        this.http.get(`${this.apiUrl}${query}`).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error('Error fetching shows:', error);
          }
        );
      });

    fromEvent(this.showsInput.nativeElement, 'input')
      .pipe(
        switchMap((event: any) => {
          const query = (event.target as HTMLInputElement).value;
          return this.http.get(`${this.apiUrl}${query}`);
        })
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error fetching shows:', error);
        }
      );

    fromEvent(this.showsInput.nativeElement, 'input')
      .pipe(debounceTime(500))
      .subscribe((event: any) => {
        const query = (event.target as HTMLInputElement).value;
        this.http.get(`${this.apiUrl}${query}`).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error('Error fetching shows:', error);
          }
        );
      });

    fromEvent(this.showsInput.nativeElement, 'input').subscribe((event: any) => {
      const query = (event.target as HTMLInputElement).value;
      this.http.get(`${this.apiUrl}${query}`).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error fetching shows:', error);
        }
      );
    });

    fromEvent(this.showsInputText.nativeElement, 'input').subscribe((event: any) => {
      const q = (event.target as HTMLInputElement).value;
      this.http
        .get(`${this.apiUrlforcat}${q}`)
        .pipe(
          tap((data) => console.log('Before mapping:', data)),
          map((user: any) => user.data),
          tap((data) => console.log(data))
        )
        .subscribe((res) => {
          // console.log(res);
        });
    });
    this.doubled.subscribe((res: any) => {
      // console.log('cdwdw', res);
      this.tapMapFilterTap.push(res);
    });
    this.myObservable.subscribe((myObserver) => {
      this.helloWorld.push(myObserver);
      // console.log(this.helloWorld, myObserver, 'helloWorld');
    });
    this.concatenated.subscribe((res) => {
      this.concatenatedData.push(res);
      // console.log(this.concatenatedData, res, 'concatenatedData');
    });
    this.diuble$.subscribe((res) => {
      this.diableRes.push(res);
      // console.log(this.diableRes, res, 'diableRes');
    });
    // this.merged().subscribe(val=>console.log(val))
    // this.keyUp().subscribe((result) => console.log(result));
    this.retryWith();
    this.result$ = this.combineLates();

    this.result$.subscribe((x) => console.log(x));
    //const source = interval(50);
    //const example = source.pipe(skip(300));
    const source = interval(1000);
    const timer$ = timer(5000);

    const example = source.pipe(takeUntil(timer$));
    example.subscribe((value) => console.log(value));
    //example.subscribe(value => console.log(value));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  merged() {
    // const stop$ = timer(3000)
    // const source$ = interval(500);
    // const result$ = source$.pipe(takeUntil(stop$));

    // const source1 = interval(1000).pipe(take(3));
    // const source2 = interval(500).pipe(take(6));

    //     const source1 = interval(1000).pipe(
    //   take(3),
    //   map(val => ({ stream: 'source1', value: val }))
    // );

    // const source2 = interval(500).pipe(
    //   take(6),
    //   map(val => ({ stream: 'source2', value: val }))
    // );

    //     return  merge(source1, source2);
    const source1$ = interval(1000).pipe(
      take(3),
      map((val) => ({ stream: 'source1', value: val }))
    );

    const source2$ = interval(500).pipe(
      take(6),
      map((val) => ({ stream: 'source2', value: val }))
    );

    const stop$ = timer(3000); // notifier for takeUntil if you want
    const result$ = source1$.pipe(takeUntil(stop$));

    return merge(source1$, source2$, result$);
  }

  // keyUp() {
  //   const input = document.getElementById('input') as HTMLInputElement;
  //   return  fromEvent(input, 'keyup').pipe(
  //     map((event: any) => event.target.value),
  //     debounceTime(300)
  //   );
  // }

  keyUp() {
    const input = document.getElementById('input') as HTMLInputElement;
    return fromEvent<KeyboardEvent>(input, 'keyup').pipe(
      debounceTime(300),
      map((event) => (event.target as HTMLInputElement).value)
    );
  }
  retryWith() {
    const request = ajax('https://api.example.com/data');
    const retryRequest = request.pipe(retry(1));

    retryRequest.subscribe(
      (result) => console.log(result),
      (error) => console.error('Retried 3 times, but still failed.')
    );
  }

  createClickIntervalStream() {
    const clicks$ = fromEvent(document, 'click');
    return clicks$.pipe(concatMap(() => interval(1000).pipe(take(3))));
  }
  combineLates() {
    const first = timer(1000, 1000);
    const second = interval(2000);
    const stop$ = timer(10000);

    return combineLatest([first, second]).pipe(
      takeUntil(stop$) // ✅ completes after 10s
    );
  }
}
