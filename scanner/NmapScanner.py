

"""
"""

import nmap


class NmapScanner(object):

    def __init__(self):
        self.nm = nmap.PortScanner()

    def scan(self, host, args=None):
        """"""
        self.nm.scan(host, args)
        return self.nm.scan(host)
