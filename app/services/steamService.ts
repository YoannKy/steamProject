export class SteamService {
  regex : RegExp; 
  promise: Promise;
  promise2: Promise;
  promise3: Promise;
  results: Array<Object> = [];
  games: Array<Object> = []; 


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
      this.results = response;
    });
  }

  loadCs(fichier: string) {
    return new Promise((resolve, reject) => {
      fetch('data/'+ fichier)
          .then(response => response.json())
          .then(response => {
            resolve(response); // resolve promise with response if it fetch succeded
          }).catch(() => {
            reject(); // reject promise if we catch a fetch error
          });
    });
  }
  loadCs2() {
    return new Promise((resolve, reject) => {
      fetch('data/cd2.json')
          .then(response => response.json())
          .then(response => {
            resolve(response); // resolve promise with response if it fetch succeded
          }).catch(() => {
            reject(); // reject promise if we catch a fetch error
          });
    });
  }
  search(search: string, offset: number, limit: number) {
    this.games = [];
    this.regex = new RegExp(search,"i");
    if(offset == 0) {
      for (var i = 0; i <= this.results.length - 1; i++) {
        if (this.regex.test(this.results[i].name)) {
          if (this.games.length <= limit) {
            this.games.push(this.results[i]);
          }
        }
      };
    } else {
      for (var i = offset; i <= this.results.length - 1; i++) {
        if (this.regex.test(this.results[i].name)) {
          if (this.games.length <= limit) {
            this.games.push(this.results[i]);
          }
        }
      };
    }
    return this.games;
  }

}