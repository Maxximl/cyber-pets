const mysql = require("mysql2");
const { Client } = require("ssh2");
const path = require("path");

// define connection config for the database
const dbServer = {
  host: process.env.DB_HOST,
  port: 3306,
  user: "max",
  password: "K9f86m35fgh",
  database: "name",
};
// define connection config for the ssh tunnel
const tunnelConfig = {
  host: "80.249.148.233",
  port: 22,
  username: "root",
  privateKey: require("fs").readFileSync(
    "C:\\Users\\Maxim\\.ssh\\id_rsa_vscale"
  ),
};

const forwardConfig = {
  srcHost: "127.0.0.1", // any valid address
  srcPort: 3306, // any valid port
  dstHost: dbServer.host, // destination database
  dstPort: dbServer.port, // destination port
};

// create an instance of SSH Client
const sshClient = new Client();

const SSHConnection = new Promise((resolve, reject) => {
  sshClient
    .on("ready", () => {
      sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
          if (err) reject(err);

          // create a new DB server object including stream
          const updatedDbServer = {
            ...dbServer,
            stream,
          };
          // connect to mysql
          const connection = mysql.createConnection(updatedDbServer);
          // check for successful connection
          //  resolve or reject the Promise accordingly
          connection.connect((error) => {
            if (error) {
              reject(error);
            }
            resolve(connection);
          });
        }
      );
    })
    .connect(tunnelConfig);
});

module.exports = SSHConnection;
