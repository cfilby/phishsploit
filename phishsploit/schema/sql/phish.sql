CREATE TABLE IF NOT EXISTS phish (
  phish_id    SERIAL NOT NULL PRIMARY KEY,
  import_id   SERIAL REFERENCES import(import_id),
  date        DATE DEFAULT NULL,
  base_url    TEXT NOT NULL,
  full_url    TEXT NOT NULL
);
