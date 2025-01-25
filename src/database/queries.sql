CREATE DATABASE Todo;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    todo VARCHAR(150) UNIQUE,
);

SELECT * FROM todos;

INSERT INTO todos (todo) VALUES('new Todo');
