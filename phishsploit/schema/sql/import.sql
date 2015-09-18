CREATE TABLE IF NOT EXISTS import (
  import_id   SERIAL NOT NULL PRIMARY KEY,
  import_date DATE DEFAULT current_date,
  file_name   VARCHAR(256) UNIQUE NOT NULL,
  name        VARCHAR(256),
  description TEXT
);
