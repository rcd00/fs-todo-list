const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

// mock todo
const listItems = [
    { "id": 1, "item": "Explore a hidden cave" },
    { "id": 2, "item": "Learn to play the guitar" },
    { "id": 3, "item": "Write a short story" },
    { "id": 4, "item": "Visit a bustling night market" },
    { "id": 5, "item": "Try a new exotic cuisine" },
    { "id": 6, "item": "Start a rooftop garden" },
    { "id": 7, "item": "Take a scenic road trip" },
    { "id": 8, "item": "Learn a magic trick" },
    { "id": 9, "item": "Attend a live theater performance" },
    { "id": 10, "item": "Create a personalized cocktail" }
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
