-- copy & paste to postgres terminal

CREATE DATABASE todolist;

CREATE TABLE todos(
    id VARCHAR(255) PRIMARY KEY,
    item VARCHAR(255), 
    isCreated BOOLEAN
);

INSERT INTO todos(id, item, isCreated)
VALUES
    (1, 'Explore a hidden cave', FALSE),
    (2, 'Learn to play the guitar', FALSE),
    (3, 'Write a short story', FALSE),
    (4, 'Visit a bustling night market', FALSE),
    (5, 'Try a new exotic cuisine', FALSE),
    (6, 'Start a rooftop garden', FALSE),
    (7, 'Take a scenic road trip', FALSE),
    (8, 'Learn a magic trick', FALSE),
    (9, 'Attend a live theater performance', FALSE),
    (10, 'Create a personalized cocktail', FALSE);

SELECT * FROM todos;
