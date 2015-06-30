/// <reference path="../typings/tsd.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Features} from 'components/features/features';
import {Details} from 'components/details/details';

@Component({
  selector: 'app'
})

@RouteConfig([
  { path: '/features', component: Features, as: 'features' },
  { path: '/details', component: Details, as : 'details'}
])
@View({
  templateUrl: 'app.html',
  directives: [NgFor, RouterOutlet, RouterLink]
})

class App {
 }
bootstrap(App, [routerInjectables]);
