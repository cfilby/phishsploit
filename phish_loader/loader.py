#!/usr/bin/env python

"""
"""

import argparse
import configparser
import os
from DbUtil import DbUtil
from PhishLoader import PhishLoader


def main():
    current_dir = os.path.dirname(os.path.realpath(__file__))
    config_path = os.path.join(current_dir, "config.ini")

    config = configparser.ConfigParser()
    config.read(config_path)

    argparser = argparse.ArgumentParser(
        description="Tool for parsing Urls from Phish URLS"
    )

    argparser.add_argument('file', help="File to process")
    argparser.add_argument('url_column',
                           help="CSV Column containing the phish url"
                           )
    argparser.add_argument('date_column',
                           help="CSV column containing the report date"
                           )

    args = argparser.parse_args()

    loader = PhishLoader(DbUtil(dict(config["DATABASE"])))
    loader.process_file(args.file, args.url_column, args.date_column)


if __name__ == "__main__":
    main()
