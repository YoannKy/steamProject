/// <reference path="../typings/tsd.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {SteamService} from 'services/steamService';

@Component({
  selector: 'app',
  appInjector: [SteamService]
})
@View({
  template: `
              <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
                <table id="datatable">
                <thead>
                    <tr>
                        <th></th>
                <th *ng-for="#result3 of results3">{{result3.name}}</th>
                <th *ng-for="#result4 of results4">{{result4.name}}</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>players_forever</th>
                <td id="players" *ng-for="#result3 of results3">{{result3.players_forever}}</td>
                <td id="players2" *ng-for="#result4 of results4">{{result4.players_forever}}</td>
                </tr>
                <tr>
                    <th>owners</th>
                <td>{{id}}</td>
                <td>{{id2}}</td>
                </tr>
                <tr>
                    <th>average_forever</th>
                <td id="id">93</td>
                <td id="id2">9098</td>
                </tr>
                <tr>
                    <th>median_forever</th>
                <td *ng-for="#result3 of results3">{{result3.median_forever}}</td>
                <td *ng-for="#result4 of results4">{{result4.median_forever}}</td>
                </tr>
                </tbody>
                </table>
              <input  class="form-control"  #name (keyup)="search(name.value)" type="text" placeholder="search a game..." />
              <ul>
                  <li (click)="details(result.appid)" *ng-for="#result of results">{{result.name}}</li>
                </ul>
              <button (click)="loadMore()">Load more</button>
              <p  *ng-for="#result3 of results3">{{result3.appid}}{{result3.name}}{{result3.players_forever}}</p>
              <p  *ng-for="#result4 of results4">{{result4.appid}}{{result4.name}}{{result4.players_forever}}</p>`,
              //<p  *ng-for="#result2 of results2">{{result2[730].data.name}}</p>`,
  directives: [NgFor]
})
class App {
  steamService: SteamService;
  request: number;
  results: Array<Object>;
  results2: Array<Object>;
  results3: Array<Object>;
  results4: Array<Object>;
  offset : number = 0;
  id : number;
  id2 : number;
  constructor(steamService: SteamService) {
    this.steamService = steamService;
    steamService.loadCs2().then(response => {
      this.results2 = response; // This first function is called if promise is fullfilled

    }, response => {
      console.warn("Games loading failed"); // This second function is called if promise is rejected
    });
    steamService.loadCs("cd.json").then(response => {
      this.results3 = response; // This first function is called if promise is fullfilled
      this.id = parseInt(response[0].owners);
    }, response => {
      console.warn("Games loading failed"); // This second function is called if promise is rejected
    });
    steamService.loadCs("tro.json").then(response => {
      this.results4 = response; // This first function is called if promise is fullfilled
      this.id2 = parseInt(response[0].owners);
    }, response => {
      console.warn("Games loading failed"); // This second function is called if promise is rejected
    });
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