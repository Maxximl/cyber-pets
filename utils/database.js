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

  addPet({ nickName, shelterId, sexTypeId, petsSizeId, breedTypeId }) {
    this.db.serialize(() => {
      let stmt = this.db.prepare(
        "INSERT INTO Pets (nickName, sexTypeId, petsSizeId, breedTypeId) VALUES (?,?,?,?)"
      );
      stmt.run(nickName, sexTypeId, petsSizeId, breedTypeId);
      stmt.finalize();
      this.db.all("SELECT MAX(id) as petId FROM Pets", [], (err, rows) => {
        if (err) {
          console.log("Error", err);
          throw new Error("Error");
        }
        const { petId } = rows[0];
        console.log("Max index = ", petId);
        let respPrepare = this.db.prepare(
          "INSERT INTO responsible (petId,shelterId,operatingOrganizationId,animalCareWorkerFio) VALUES (?,?,?,?)"
        );
        respPrepare.run(petId, shelterId, "", "");
        respPrepare.finalize();
      });
    });
  }
}

exports.initDB = () => new OfflineDataManager();
