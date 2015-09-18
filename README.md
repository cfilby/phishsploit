# PhishSploit

Exploit-DB and Phish Analysis Tool

## Project Description (from Gary):

Exploit-DB is a database for sharing code and methods for exploiting webpages.  To begin with, the team should start familiarizing themselves with the Exploit-DB database, paying most attention to the listing of Web Application exploits:

https://www.exploit-db.com/webapps/

The challenge is to determine whether recent website hacking, in the form of entries in the Zone-H.org database, or in the form of phishing webpages, may be tied to the Exploits that are currently popular on Exploit-DB.

One source of phishing pages available for download is from PhishTank.

 http://data.phishtank.com/data/online-valid.csv (Links to an external site.)

contains (at the time of this writing) more than 30,000 "active, confirmed, online phishing pages".

Is there any evidence that a spike in "related" attacks emerges after a new Exploit is shared on Exploit DB web apps?

## Project Structure Overview

Each folder has a set of specific READMEs documenting how to use the included programs.

* crontab - Folder containing bash scripts that should be run periodically, such as the exploit loader.
* exploit_loader - Folder containing the python ExploitDB Loader, which populates the PhishSploit database with new Exploits.
* phishsploit - The main project website
* scanner - An early python script that was written to utilze NMAP in order to gather information on a remote system. Currently not used in the PhishSploit framework.
* urlparser - Folder containing the python scripts responsible for processing and parsing Phish csv files in order to insert them into the PhishSploit database.

## Suggested Startup

1. Install Postgres and import the schema using the createDB.sh script in phishsploit/schema/sql.
2. Update Exploit and Phish loader config.ini scripts with the appropriate credentials
3. Load exploits into the database.
4. Load a phish file into the database.
5. Update PhishSploit config.js with appropriate database credentials.
6. Start PhishSploit.

## Dependencies:

This project has the following dependencies:

* Python3
* Python3 psycopg2
* Python-Nmap (sudo pip3 install python-nmap)
* NodeJS
* Bower
* PostgreSQL

## Note:

Currently, ExploitKeyPaths are manually inserted into the database. This should be addressed in a future build.
