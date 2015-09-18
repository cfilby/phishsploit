# Scanner

Scan a remote host using nmap. This is only being included for possible future use, but this really wasn't fleshed out to any real degree.

## Dependencies:

* Python3
* Python-Nmap (sudo pip3 install python-nmap)

## Usage

The only functioning command at present is the following:
```
python3 scanner.py probe <host>
```

Which will perform an NMAP scan of the specified host and print the results.
