CREATE VIEW IF NOT EXISTS `path_freqency` AS
  SELECT path_part, COUNT(path_part) as count
      FROM `phish_path_part`
      GROUP BY `path_part`;
