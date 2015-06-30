import {Component, View} from 'angular2/angular2';
import {SteamService} from 'services/steamService'

@Component({
  selector: 'details',
  appInjector: [SteamService]
})
@View({
  templateUrl: 'components/details/details.html'
})

export class Details {
	steamService:  SteamService;
	request :      number;
	results :      Array<Object>;
	appid : number = 57690;

	constructor(aSteamService: SteamService) {
	    this.steamService = aSteamService;
	    this.steamService.details(this.appid).then(response => {
        this.results = response;
console.debug(this.results); 
	     

}
