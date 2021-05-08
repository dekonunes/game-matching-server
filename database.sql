CREATE DATABASE gamematching;

CREATE TABLE app_user(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    nick_name VARCHAR(255),
    discord VARCHAR(255),
    ts VARCHAR(255),
    live_url VARCHAR(255)
);

CREATE TABLE game(
    game_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    number_user INT
);