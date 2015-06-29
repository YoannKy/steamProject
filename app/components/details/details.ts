import {Component, View, NgFor} from 'angular2/angular2';

@Component({
  selector: 'details'
})
@View({
  templateUrl: 'components/details/details.html',
  directives: [NgFor]
})

export class Details {
  gameDetails: Array<Object>;

  constructor() {
    this.gameDetails = [
      {
        title: 'Counter-Strike: Global Offensive',
        owners: 14469466,
        playersForever: 13908311
      }
    ];
  }
}
