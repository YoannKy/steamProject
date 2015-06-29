/// <reference path="../typings/tsd.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {SteamService} from 'services/steamService';

@Component({
  selector: 'app',
  appInjector: [SteamService]
})
@View({
  template: ` <input  class="form-control"  #name (keyup)="search(name.value)" type="text" placeholder="search a game..." />
              <ul>
                  <li (click)="details(result.appid)" *ng-for="#result of results">{{result.name}}</li>
                </ul>
              <button (click)="loadMore()">Load more</button>`,
  directives: [NgFor]
})
class App {
  steamService: SteamService;
  request: number;
  results: Array<Object>;
  offset : number = 0;
  constructor(steamService: SteamService) {
    this.steamService = steamService;
  }

  search(search: string, anOffset = 0,aLimit = 10) {
    if(search.length > 3) {
      this.offset= 0;
      clearTimeout(this.request);
      this.request = setTimeout(() => {
        this.results = this.steamService.search(search, anOffset, aLimit);
      }, 1000);
    }
  }

  loadMore() {
    this.offset+=10;
    console.log(this.offset);
  }

  details(appid: string) {
    console.log(appid);
  }

  details()

}
bootstrap(App);
