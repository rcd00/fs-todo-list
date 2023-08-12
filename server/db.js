const { Pool } = require('pg');
require('dotenv').config();

// Configure the PostgreSQL connection pool
const pool = new Pool({
    database: 'todolist',
    user: process.env.USERNAME,
    host: process.env.HOST,
    port: process.env.DBPORT // Default PostgreSQL port
});

// Test the connection
async function testDatabaseConnection() {
    const client = await pool.connect();
    try {
        console.log('✅ Connected to the database ✅');
    } catch (error) {
        console.error('❌ Error connecting to the database ❌', error);
    } finally {
        client.release(); // Release the client back to the pool
    }
}

module.exports = {
    pool,
    testDatabaseConnection
};
