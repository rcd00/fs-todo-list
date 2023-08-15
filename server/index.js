const express = require('express');
const cors = require('cors');
const app = express();
const { v4: uuidv4 } = require('uuid');

const { pool, testDatabaseConnection } = require('./db');

const PORT = process.env.PORT ?? 8000;

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT} ✅`);
});

// Allow requests from any origin
app.use(cors());
app.use(express.json());


// Define a simple endpoint
app.get('/', (req, res) => {
    res.send('Hello, this is your API!');
});

// get all todos
app.get('/list', async (req, res) => {
    try {
        const todos = await pool.query('SELECT * FROM todos');
        res.json(todos.rows);
    } catch (error) {
        console.log(error);
    }
});

// create new todo
app.post('/list', async (req, res) => {
    const { item, progress, create_date } = req.body;
    const id = uuidv4();

    try {
        const query = 'INSERT INTO todos(id, item, progress, create_date) VALUES ($1, $2, $3, $4)';
        const values = [id, item, progress, create_date];

        await pool.query(query, values);
        res.status(200).send('Todo added successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding todo');
    }
});

// edit todo
app.put('/list/:id', async (req, res) => {
    const { id } = req.params;
    const { progress } = req.body;

    try {
        const editProgress =
            await pool.query('UPDATE todos SET progress = $1 WHERE id = $2;', [progress, id]);
        res.json(editProgress);

    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

// delete todo
app.delete('/list/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1;', [id]);
        res.json(deleteTodo);

    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

// test the database connection
testDatabaseConnection();

