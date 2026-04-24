import mysql from "mysql2/promise";

// Krijo pool (më i mirë se createConnection)
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "umibres",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Funksion për të testuar lidhjen
const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL database");
    connection.release();
  } catch (error) {
    console.error("❌ Gabim në lidhje me databazën:");
    
    if (error.code === "ECONNREFUSED") {
      console.error("➡️ MySQL server nuk është ndezur.");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("➡️ Username ose password i gabuar.");
    } else if (error.code === "ER_BAD_DB_ERROR") {
      console.error("➡️ Database nuk ekziston.");
    } else {
      console.error("➡️ Error:", error.message);
    }

    process.exit(1); // ndal serverin nëse DB nuk lidhet
  }
};

// Thirre menjëherë
testConnection();

export default db;
