
DROP TABLE IF EXISTS "List";

CREATE TABLE "List" (
  id SERIAL,
  name CHAR(12) DEFAULT NULL,
  complete BOOLEAN DEFAULT false,
  PRIMARY KEY ( id )
);

DROP TABLE IF EXISTS "Todo";

CREATE TABLE "Todo" (
  list_id INTEGER DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  complete BOOLEAN DEFAULT false,
  deadline TIMESTAMP DEFAULT NULL,
  PRIMARY KEY ( "list_id" )
);

ALTER TABLE "Todo" ADD FOREIGN KEY (list_id) REFERENCES "List" ("id");

 INSERT INTO "List" ( name ) VALUES
 ('Poop');
 INSERT INTO "Todo" (list_id,description,deadline) VALUES
 ((SELECT id FROM "List" LIMIT 1),'Pass gas',now());
