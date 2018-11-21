import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// This is some boilerplate code for implemetning server side rendering

@Component({
  selector: 'ang-universal',
  templateUrl: './ang-universal.component.html',
  styleUrls: ['./ang-universal.component.scss']
})
export class AngUniversalComponent implements OnInit {

  res: any;

  constructor(
    private title: Title,
    private meta: Meta,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId,
    private transferState: TransferState
  ) { }


  ngOnInit() {
  }


  transfer() {
    const id = makeStateKey('state-key');

    if (this.transferState.get(id, null)) {
      const data = this.transferState.get(id, null);
      this.transferState.remove(id);
      this.res = of(data);

    } else {
      this.res = this.http.get(`http://localhost:3000/api/testroute`, { withCredentials: true }).pipe(
        tap((x: any) => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(id, x);
          }
        }));
    }
  }

  mataInformation() {
    // for SEO
    this.title.setTitle('some dynamic title');
    this.meta.addTag({ name: 'description', content: 'some content' });

    // for tweeter crawling
    this.meta.addTag({ name: 'twitter:card', content: 'summary' });
    this.meta.addTag({ name: 'twitter:site', content: '@AngularUniv' });
    this.meta.addTag({ name: 'twitter:title', content: 'some description' });
    this.meta.addTag({ name: 'twitter:description', content: 'some description' });
    this.meta.addTag({ name: 'twitter:text:description', content: 'some description' });
    this.meta.addTag({ name: 'twitter:image', content: 'https://avatars3.githubusercontent.com/u/16628445?v=3&s=200' });
  }

}
