
"""Module containing the UrlParser
"""

import csv
import os
import re

from urllib.parse import urlparse
from DbUtil import DbUtil


class PhishLoader(object):
    """Object responsible for parsing a csv file containing phish urls,
    calculating substrings and inserting them into a database.
    """

    date_regex = re.compile('\d{1,2}/\d{1,2}/\d{1,2}')

    def __init__(self, db_util):
        """Create a new UrlParser object.
        :param db_util: DbUtil object used for interacting with the database.
        """
        self.db_util = db_util

    def get_path_substrings(self, url):
        """Function responsible for computing all possible path substrings
        of a given phish url.
        :param url: Url to get path substrings of
        """
        parsed_url = urlparse(url)
        # Remove the leading '' that occurs from the split
        path_parts = parsed_url[2].split('/')[1:]

        path_combinations = []
        for i in range(0, len(path_parts)):
            for j in range(i, len(path_parts)):
                path_combinations.append("/" + "/".join(path_parts[i:j+1]))

        return path_combinations

    def process_file(self, file_name, url_column, date_column):
        """Given a CSV File, process it and return a frequency dictionary.
        :param file_name:
        :param url_column: Name of the column containing the url to process
        :param date_column: Name of the column containing the date to process
        """
        with open(file_name, 'r', encoding='utf-8',
                  errors="ignore") as csv_file:
            csv_reader = csv.DictReader(csv_file)
            import_id = self.db_util.insert_import(os.path.basename(file_name))
            for row in csv_reader:
                base_url = urlparse(row[url_column])[1]
                date = None

                if self.date_regex.match(row[date_column]):
                    date = row[date_column]

                phish_id = self.db_util.insert_phish(import_id,
                                                     base_url,
                                                     row[url_column],
                                                     date)

                for substring in self.get_path_substrings(
                        row[url_column]):
                    self.db_util.insert_phish_path_part(phish_id, substring)

        self.db_util.commit()
