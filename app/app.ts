/// <reference path="../typings/tsd.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {SteamService} from 'services/steamService';

@Component({
  selector: 'app',
  appInjector: [SteamService]
})

@View({
  template: `<div class="col-lg-12 well">
              <input  class="form-control"  #name (keyup)="search(name.value)" type="text" placeholder="search a game..." />
              <img [class.visible]="showWait" src="img/loading.gif" alt="Smiley face" height="100%" width="100%">
              <div [class.visible]="isEmpty(results)" class="col-lg-12">
                <ul [class.visible]="!showWait" class="list-group game-list">
                  <li class="list-group-item game-item"  (click)="details(result.appid)" *ng-for="#result of results">{{result.name}}</li>
                </ul>
                <button [class.visible]="!showWait" class="btn btn-primary" (click)="loadMore()">Load more</button>
              </div>
            </div>`,
  directives: [NgFor]
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
bootstrap(App);
