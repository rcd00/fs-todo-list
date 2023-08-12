-- copy & paste to postgres terminal

CREATE DATABASE todolist;

DROP TABLE todos;

CREATE TABLE todos(
    id VARCHAR(300) PRIMARY KEY,
    item VARCHAR(300), 
    isCreated BOOLEAN,
    createDate VARCHAR(300)
);

INSERT INTO todos(id, item, isCreated,createDate)
VALUES
    (1, 'Explore a hidden cave', FALSE, 'Sat Aug 12 2023 19:51:43 GMT-0400 (Eastern Daylight Time)'),
    (2, 'Learn to play the guitar', FALSE, 'Sat Aug 12 2023 19:51:43 GMT-0400 (Eastern Daylight Time)'),
    (3, 'Write a short story', FALSE, 'Sat Aug 12 2023 19:51:43 GMT-0400 (Eastern Daylight Time)'),
    (4, 'Visit a bustling night market', FALSE, 'Sat Aug 12 2023 19:51:43 GMT-0400 (Eastern Daylight Time)'),
    (5, 'Try a new exotic cuisine', FALSE, 'Sat Aug 12 2023 19:51:43 GMT-0400 (Eastern Daylight Time)'),
    (6, 'Start a rooftop garden', FALSE, 'Sat Aug 12 2023 19:51:43 GMT-0400 (Eastern Daylight Time)'),
    (7, 'Take a scenic road trip', FALSE, 'Sat Aug 12 2023 19:51:43 GMT-0400 (Eastern Daylight Time)'),
    (8, 'Learn a magic trick', FALSE, 'Sat Aug 12 2023 19:51:43 GMT-0400 (Eastern Daylight Time)'),
    (9, 'Attend a live theater performance', FALSE, 'Sat Aug 12 2023 19:51:43 GMT-0400 (Eastern Daylight Time)'),
    (10, 'Create a personalized cocktail', FALSE, 'Sat Aug 12 2023 19:51:43 GMT-0400 (Eastern Daylight Time)');

SELECT * FROM todos;
