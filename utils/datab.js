const mysqlssh = require("mysql-ssh");
const fs = require("fs");

const db = mysqlssh.connect(
  {
    host: "80.249.148.233",
    user: "root",
    privateKey: fs.readFileSync("C:/Users/Maxim/.ssh/id_rsa_vscale"),
  },
  {
    host: "localhost",
    user: "max",
    password: "K9f86m35fgh",
    database: "name",
  }
);

module.exports = db;
