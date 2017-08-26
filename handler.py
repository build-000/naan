import json
import logging
import requests

log = logging.getLogger()
log.setLevel(logging.DEBUG)

API_KEY = 'f68bb0f0512ac1c6aa506b31bfd66474'

def hanler(event, context):
    log.debug("Received event {}".format(json.dumps(event)))

    # latitude and longitude will come thru request

    response = {
        # final JSON format of lists of song
    }

    return response