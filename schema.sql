
DROP TABLE IF EXISTS "list";

CREATE TABLE "list" (
  id SERIAL,
  name CHAR(12) DEFAULT NULL,
  complete BOOLEAN DEFAULT false,
  PRIMARY KEY ( id )
);

DROP TABLE IF EXISTS "todo";

CREATE TABLE "todo" (
  list_id INTEGER DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  complete BOOLEAN DEFAULT false,
  deadline TIMESTAMP DEFAULT NULL,
);

ALTER TABLE "todo" ADD FOREIGN KEY (list_id) REFERENCES "list" ("id");

 INSERT INTO "list" ( name ) VALUES
 ('stuff');
 INSERT INTO "todo" (list_id,description,deadline) VALUES
 ((SELECT id FROM "list" LIMIT 1),'do things',now());
