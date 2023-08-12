const { Pool } = require('pg');

// Configure the PostgreSQL connection pool
const pool = new Pool({
    user: 'rcdayo',
    host: 'localhost',
    database: 'todolistdb',
    port: 5432 // Default PostgreSQL port
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
    testDatabaseConnection
};
