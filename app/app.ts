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
  steamService:  SteamService;
  request :      number;
  results :      Array<Object>;
  offset :       number = 0;
  research :     string;
  limit :        number = 10;
  showWait :     boolean;


  constructor(aSteamService: SteamService) {
    this.steamService = aSteamService;
    this.results = [];
    this.showWait = true;
  };

  search(search: string) {
    if(search.length >= 3) {
      this.offset = 0;
      this.research = search;
      clearTimeout(this.request);
      this.showWait = false;
      this.request = setTimeout(() => {
        this.results = this.steamService.search(this.research, this.offset, this.limit);
            this.showWait = true;

      }, 1000);
    } else {
      this.results = []
    }
  };

  loadMore() {
    this.offset+=10;
    this.results = this.steamService.search(this.research, this.offset,this.limit);
  };

  details(appid: string) {
    console.log(appid);
  };

  isEmpty(anArray: Array<Object>){
    return(anArray.length == 0)
  };
}
bootstrap(App, [routerInjectables]);
