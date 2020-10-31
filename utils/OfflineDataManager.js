sqlite3 = require("sqlite3").verbose();
class OfflineDataManager {
  constructor() {
    console.log("constructor OfflineDataManager");
    this.db = new sqlite3.Database("./pets.sqlite");
    // this.createTable()
  }

  createTable() {
    this.db.serialize(() => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY, name TEXT,pass TEXT, userType INTEGER)"
      );
      this.db.run(
        "CREATE TABLE IF NOT EXISTS Partners \
							(id INTEGER, \
							 name TEXT, \
							 codeBarcode INTEGER, \
							 isFioReq INTEGER, \
							 isAdressReq INTEGER \
							 )"
      );
      this.db.run(
        "CREATE TABLE IF NOT EXISTS Payments (id INTEGER PRIMARY KEY, partnerId INTEGER, partnerName TEXT, totalBalance TEXT, datePaymentOn TEXT)"
      );
      this.db.run(
        "CREATE TABLE IF NOT EXISTS BarCodes \
							(id INTEGER PRIMARY KEY, name VARCHAR(50), \
							regExpString VARCHAR, \
							JsValidScript VARCHAR, \
							JsPreprocessScript VARCHAR)"
      );
    });
  }
  /// Users
  addUser(user) {
    this.db.serialize(() => {
      const stmt = this.db.prepare(
        "INSERT INTO Users (name,pass,userType) VALUES (?,?,?)"
      );
      stmt.run(user.name, user.pass, user.userType);
    });
  }
  /// Payments
  addPayment(payment) {
    this.db.serialize(() => {
      const stmt = this.db.prepare(
        "INSERT INTO Payments (partnerId,totalBalance,datePaymentOn) VALUES (?,?,?)"
      );
      stmt.run(payment.partnerId, payment.totalBalance, payment.datePaymentOn);
      stmt.finalize();
    });
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

//dtm.readValue().then( (row)=>console.log(row.id + ': ' + row.name) , (err) => {console.log('Error',err)})
