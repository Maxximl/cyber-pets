const express = require("express");
const config = require("config");
const { request } = require("express");
const sequelize = require("./utils/database");
const path = require("path");
// const database = require("./utils/dbConfig");
// const db = require("./utils/datab");

// let dataBase = require('./database.js')
// let dtm = dataBase.initDB()
const app = express();

app.use(express.json({ extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));
// app.use(express.urlencoded({ limit: "50mb" }));

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin/pets", require("./routes/admin.routes"));
app.use("/api/pets", require("./routes/pets.routes"));
app.use("/data", require("./routes/tables.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "public")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
  });
}
const PORT = config.get("port") || 5000;

async function start() {
  try {
    // await sequelize.sync();
    // db.then((client) => {
    //   client.query("SELECT * FROM `pets`", function (err, results, fields) {
    //     if (err) throw err;
    //     console.log(results);
    //     mysqlssh.close();
    //   });
    // }).catch((err) => {
    //   console.log(err);
    // });

    // await database;
    app.listen(PORT, () => console.log(`has been started on port ${PORT}`));
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
}

start();
