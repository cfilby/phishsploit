
"""Module containing the DbUtil class.
"""

import os
import psycopg2


class DbUtil(object):
    """Object responsible for handling interactions with a given SQL database.
    """

    def __init__(self, db):
        """Create a new DbUtil object that uses the specified db file.
        :param db_file: File that the DbUtil should connect to or create.
        """
        self.db = db
        self.connection = psycopg2.connect(**self.db)
        self.cursor = self.connection.cursor()
        # self._init_db()

    def _init_db(self):
        """Create new tables in the connected Db if they haven't already been
        created.
        """
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS url (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                url  TEXT NOT NULL,
                date TEXT DEFAULT NULL
            );
        """)

        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS url_path_part (
                url_id INTEGER NOT NULL,
                path_part TEXT NOT NULL,
                FOREIGN KEY (url_id) REFERENCES url(id)
            );
        """)

        self.cursor.execute("""
            CREATE VIEW IF NOT EXISTS path_freqency AS
                SELECT path_part, COUNT(path_part) as count
                    FROM url_path_part
                    GROUP BY path_part
        """)

    def insert_import(self, file_name, name=None, description=None):
        """Insert an import entry to associate Phish with
        :param file_name: Name of the file being imported
        :param name: Friendly name for the file
        :param description: Description regarding the contents of the file
        """
        self.cursor.execute("""
            INSERT INTO import (file_name, name, description)
                VALUES (%s, %s, %s) RETURNING import_id
        """, (file_name, name, description))

        return self.cursor.fetchone()[0]

    def insert_phish(self, import_id, base_url, full_url, date=None):
        """Insert a full phish url into the database.
        :param import_id: import this phish is associated with
        :param base_url: base url for the phish
        :param full_url: full phish url
        :param date: date associated with the phish
        """
        self.cursor.execute("""
            INSERT INTO phish (import_id, base_url, full_url, date)
                VALUES (%s, %s, %s, %s) RETURNING phish_id
        """, (import_id, base_url, full_url, date))

        return self.cursor.fetchone()[0]

    def insert_phish_path_part(self, phish_id, path_part):
        """Insert a url path part into the database.
        :param url_id: id of the url to associate the path part with
        :param path_part: path part to insert
        """
        self.cursor.execute(
            """
            INSERT INTO phish_path_part (phish_id, path_part) VALUES (%s, %s)
            """, (phish_id, path_part)
        )

    def get_phish(self):
        """Get a list of all urls that have been processed.
        """
        self.cursor.execute("SELECT phish_id,url FROM phish")

        return self.cursor.fetchall()

    def get_frequencies(self):
        """Get a list of all path counts in descending order.
        """
        self.cursor.execute(
            "SELECT path,frequency FROM path_count ORDER BY count DESC"
        )

        return self.cursor.fetchall()

    def commit(self):
        """Commit the database connection changes.
        """
        self.connection.commit()

    def close(self):
        """Close the database connection
        """
        self.cursor.close()
        self.connection.close()
