/// <reference path="../typings/tsd.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';
import {SteamService} from 'services/steamService';

import {Comparison} from 'components/comparison/comparison';
import {List} from 'components/list/list';
import {Features} from 'components/features/features';

@Component({
  selector: 'app',
  appInjector: [SteamService]
})
@RouteConfig([
  { path: '/comparison', component: Comparison, as: 'comparison' },
  { path: '/list', component: List, as: 'list' },
  { path: '/features', component: Features, as: 'features' }
])
@View({
  templateUrl: 'app.html',
  directives: [NgFor, RouterOutlet, RouterLink]
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
bootstrap(App, [routerInjectables]);
