export class SteamService {
  regex : RegExp; 
  promise: Promise;
  games: Array<Object> = []; 
  results: Array<Object> = []; 
  indice : number;
  renember : Array<Object> = [];
  forbidden : RegExp = /beta|dlc|trailer|movie|teaser|demo|dedicated|test|sdk|character|steam|pack|costume|soundtrack/i;


  constructor() {
    this.promise = new Promise((resolve, reject) => {
      fetch('data/data.json')
      .then(response => response.json())
      .then(response => {
        resolve(response); // resolve promise with response if it fetch succeded
        }).catch(() => {
        reject(); // reject promise if we catch a fetch error
      });
    });

    this.promise.then(response => {
      this.results = response.slice();
      this.renember = response.slice();
     });  

  }

  search(search: string, offset : number, limit: number) {
    this.indice = 0;
    if (offset == 0) {
      this.results = this.renember.slice();
      this.games = [];
    } 
    this.regex = new RegExp(search,"i");
    for (var i = offset; i <= this.results.length - 1; i++) {
      if (this.regex.test(this.results[i].name) && !this.forbidden.test(this.results[i].name)) {
        if(this.indice <= limit) {
          this.games.push(this.results[i]);
          this.results.splice(i, 1);
          this.indice++;
        }
      }
    };
    return this.games;
  }

  details(appid: number) {
    return new Promise((resolve, reject) => {
      fetch('http://127.0.0.1://projets/steam/app.php?appID='+appid)
      .then(response => response.json())
      .then(response => {
        resolve(response); // resolve promise with response if it fetch succeded
        }).catch(() => {
        reject(); // reject promise if we catch a fetch error
      });
    });    
  }

}