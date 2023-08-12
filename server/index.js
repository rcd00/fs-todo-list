const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

// mock todo
const listItems = [
    { "id": 1, "item": "Explore a hidden cave", "isCompleted": false },
    { "id": 2, "item": "Learn to play the guitar", "isCompleted": false },
    { "id": 3, "item": "Write a short story", "isCompleted": false },
    { "id": 4, "item": "Visit a bustling night market", "isCompleted": false },
    { "id": 5, "item": "Try a new exotic cuisine", "isCompleted": false },
    { "id": 6, "item": "Start a rooftop garden", "isCompleted": false },
    { "id": 7, "item": "Take a scenic road trip", "isCompleted": false },
    { "id": 8, "item": "Learn a magic trick", "isCompleted": false },
    { "id": 9, "item": "Attend a live theater performance", "isCompleted": false },
    { "id": 10, "item": "Create a personalized cocktail", "isCompleted": false }
];


// Allow requests from any origin
app.use(cors());

// Define a simple endpoint
app.get('/', (req, res) => {
    res.send('Hello, this is your API!');
});

app.get('/list', (req, res) => {
    res.json(listItems);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


