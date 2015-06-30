import {Component, View, NgFor} from 'angular2/angular2';
import {SteamService} from 'services/steamService';
import {Details} from 'components/details/details';

@Component({
  selector: 'features',
  appInjector: [SteamService]
})

@View({
  templateUrl: 'components/features/features.html',
  directives: [NgFor]
})


export class Features {
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
        console.debug(this.results);
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
