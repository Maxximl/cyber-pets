sqlite3 = require("sqlite3").verbose();
class OfflineDataManager {
  constructor() {
    console.log("constructor OfflineDataManager");
    this.db = new sqlite3.Database("./pets.sqlite");
  }

  readValue(tableName, where) {
    return new Promise((success, error) => {
      this.db.serialize(() => {
        let sql = `SELECT * FROM ${tableName} `;
        if (where) {
          sql += where;
        }
        //console.log(sql)
        this.db.all(sql, [], (err, rows) => {
          if (err) {
            error(err);
          }
          success(rows);
        });
      });
    });
  }
}

exports.initDB = () => new OfflineDataManager();
