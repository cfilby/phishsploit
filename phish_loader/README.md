# PhishLoader

Python script responsible for processing a phish csv file and inserting the phish and associated path parts into the database.

## Dependencies

The UrlParser has the following dependencies

* Python3
* Pyscopg2

## Usage

First, set your database credentials in config.ini. You can use the PhishLoader as follows:

```
python3 loader.py phish_file.csv url_column_name date_column_name
```

So, for instance:

```
python3 loader.py PhreshPhish.csv url date
```

The script will then process the csv file and insert the Phish with their corresponding path parts into the database.
