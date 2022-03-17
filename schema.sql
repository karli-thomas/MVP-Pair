DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE recipes (
  id BIGINT NOT NULL PRIMARY KEY,
  title TEXT,
  image_url TEXT
);
