const sqlite3 = require("sqlite3").verbose();
class OfflineDataManager {
  constructor() {
    console.log("constructor OfflineDataManager");
    this.db = new sqlite3.Database("C:\\tmp\\pets.sqlite", (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to the in-memory SQlite database.");
    });
  }

  readValue(tableName, where) {
    return new Promise((success, error) => {
      this.db.serialize(() => {
        let sql = `SELECT * FROM ${tableName} `;
        if (where) {
          sql += where;
        }
        console.log(sql);
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
