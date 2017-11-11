import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite'
import {Platform} from 'ionic-angular';


@Injectable()
export class DatabaseProvider {

  constructor(public http: Http, private sqlite: SQLite, private platform: Platform) {
    // console.log('Hello DatabaseProvider Provider');
  }

  db: SQLiteObject;

  initDb() {
    this.sqlite.create({
      name: 'XsourceApp.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql('create table if not exists userInterestsCategories (id INT, name VARCHAR(25))', {})
          .then(() => alert('table created successfully'))
          .catch(e => alert(JSON.stringify(e)));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  insertUserCategories(userCategories) {
    for (let category of userCategories) {
      this.db.executeSql('insert into userInterestsCategories (id, name) values (?,?)', [category.id, category.name])
        .then(() => {
          alert('inserted successfully');
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        })
    }
  }

  // onDevice() {
  //   return !(this.platform.is('core') || this.platform.is('mobileweb'));
  // }

}
