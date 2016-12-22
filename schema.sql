
DROP TABLE IF EXISTS "list";

CREATE TABLE "list" (
  id SERIAL PRIMARY KEY,
  name VARCHAR DEFAULT NULL,
  complete BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS "todo";

CREATE TABLE "todo" (
  todo_id SERIAL PRIMARY KEY,
  list_id INTEGER DEFAULT NULL,
  description VARCHAR,
  complete BOOLEAN DEFAULT false
);

ALTER TABLE "todo" ADD FOREIGN KEY (list_id) REFERENCES "list" ("id") ON DELETE CASCADE;

 INSERT INTO "list" ( name ) VALUES
 ('stuff');
 INSERT INTO "todo" (list_id,description) VALUES
 ((SELECT id FROM "list" LIMIT 1),'do things');
