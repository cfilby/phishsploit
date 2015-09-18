#!/usr/bin/env python

"""
"""

import argparse
import configparser
import nmap

from NmapScanner import NmapScanner
from VulnDb import VulnDb


def probe(host):
    """"""
    print("Probing for services on %s." % host)
    scanner = NmapScanner()
    print(scanner.scan(host))


def scan(host):
    """"""
    print("Scanning for services on %s." % host)
    scanner = NmapScanner()

    print("Comparing services to Vulnerability DB.")
    pass


def main():
    """"""
    config = configparser.ConfigParser()
    config.read("config.ini")

    parser = argparse.ArgumentParser(
        description="Scan a Remote Website for open services."
    )
    subparsers = parser.add_subparsers(help="Subcommand help", dest="command")

    probe_parser = subparsers.add_parser(
        "probe",
        help="Probe a specific website for open services"
    )
    probe_parser.add_argument(
        "host",
        help="Host to probe."
    )

    scan_parser = subparsers.add_parser(
        "scan",
        help="Scan a specific website for vulnerable services"
    )
    scan_parser.add_argument(
        "host",
        help="Host to scan."
    )

    args = parser.parse_args()

    if args.command == "probe":
        probe(args.host)
    elif args.command == "scan":
        scan(args.host)
    else:
        parser.error("No command selected!")

if __name__ == "__main__":
    main()
