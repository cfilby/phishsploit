CREATE OR REPLACE VIEW phish_part_frequency AS
  SELECT path_part, COUNT(path_part) as path_count
      FROM phish_path_part
      GROUP BY path_part;
