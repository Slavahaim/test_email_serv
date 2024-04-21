CREATE DATABASE testmailserverdb;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

INSERT INTO users (name, email, password)
    VALUES ('joe', 'joe@hotml.com', '********'),
    ('ion', 'ion@mail.md', '********');

CREATE TABLE emails (
    id SERIAL PRIMARY KEY,
    sender VARCHAR(255) NOT NULL,
    receiver VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    content TEXT
);


INSERT INTO emails (sender, receiver, subject, content)
    VALUES ('joe@hotml.com', 'ion@mail.md', 'test1', 'test 1111111'),
    ('ion@mail.md', 'joe@hotml.com', 'test2', 'test 22222');

INSERT INTO emails (sender, receiver, subject, content)
    VALUES ('joe1@hotml.com', 'ion1@mail.md', 'test3', 'test 33333');

UPDATE emails
SET content = 'test 1111111 + 1'
WHERE id = 1;

DELETE FROM emails
WHERE id = 3;