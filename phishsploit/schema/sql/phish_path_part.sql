CREATE TABLE IF NOT EXISTS phish_path_part (
    phish_id  SERIAL NOT NULL REFERENCES phish(phish_id),
    path_part TEXT NOT NULL
);

CREATE INDEX ON phish_path_part(path_part);
