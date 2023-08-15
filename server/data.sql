-- copy & paste to postgres terminal

CREATE DATABASE todolist;

DROP TABLE todos;

CREATE TABLE todos(
    id VARCHAR(300) PRIMARY KEY,
    item VARCHAR(300), 
    progress VARCHAR(300),
    create_date VARCHAR(300)
);

INSERT INTO todos(id, item, progress, create_date)
VALUES
    ('7ca5871c-d2e4-4813-a46f-e156643d3379', 'Explore a hidden cave', 'incomplete', 'Sat Aug 12 2023 19:51:48 GMT-0400 (Eastern Daylight Time)'),
    ('5004d616-7f3e-485e-a54d-e8c15c82fb7d', 'Learn to play the guitar', 'incomplete', 'Sat Aug 12 2023 19:51:53 GMT-0400 (Eastern Daylight Time)'),
    ('fe5bd29d-ccb3-456c-8e25-a0e91e0b55ee', 'Write a short story', 'incomplete', 'Sat Aug 12 2023 19:51:58 GMT-0400 (Eastern Daylight Time)'),
    ('6c608210-cb95-4e91-ac76-ec397dce1d6e', 'Visit a bustling night market', 'incomplete', 'Sat Aug 12 2023 19:52:03 GMT-0400 (Eastern Daylight Time)'),
    ('188d2439-cc5a-4adf-b9e3-7781b210fd7a', 'Try a new exotic cuisine', 'incomplete', 'Sat Aug 12 2023 19:52:08 GMT-0400 (Eastern Daylight Time)'),
    ('fb00abfc-5b7e-477c-af5a-56f438a349cf', 'Start a rooftop garden', 'incomplete', 'Sat Aug 12 2023 19:52:13 GMT-0400 (Eastern Daylight Time)'),
    ('109b60d1-72b8-497b-8533-c17d9e32156c', 'Take a scenic road trip', 'incomplete', 'Sat Aug 12 2023 19:52:18 GMT-0400 (Eastern Daylight Time)'),
    ('5b493ab3-ae5a-436f-9d1e-410ac4605e5e', 'Learn a magic trick', 'incomplete', 'Sat Aug 12 2023 19:52:23 GMT-0400 (Eastern Daylight Time)'),
    ('555994b2-2dd4-4f09-838e-c12b40f611ee', 'Attend a live theater performance', 'incomplete', 'Sat Aug 12 2023 19:52:28 GMT-0400 (Eastern Daylight Time)'),
    ('1375e5ea-8299-406e-89fb-fb367bd4deac', 'Create a personalized cocktail', 'incomplete', 'Sat Aug 12 2023 19:52:33 GMT-0400 (Eastern Daylight Time)');


SELECT * FROM todos;
