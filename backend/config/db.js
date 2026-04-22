import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Vendosni fjalëkalimin e saktë këtu
  database: "umibres"
});

db.connect(err => {
  if (err) {
    console.error("Gabim në lidhje me databazën:", err);
    throw err;
  }
  console.log("Connected to MySQL");
});

export default db;
