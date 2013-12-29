#!/usr/bin/env python3

class Endpoint:
  
    def __init__(self, url=None):
        self.url = url or "http://localhost:3000/"

    def post(self, resource, data):
        import urllib.request
        import json

        conn = urllib.request.Request(self.url + resource,
                                      json.dumps(data).encode("utf-8"),
                                      {"Content-Type": "application/json"})
        data = urllib.request.urlopen(conn)
        return data.read()

def users(count):
  names = ["alice", "bob", "charles", "eve"]
  return ({"name": names[i % len(names)]} for i in range(count))

def rooms(count):
    return ({"name": "room " + str(i + 1)} for i in range(5))

def slots(count):
    import datetime

    base        = datetime.datetime.today()
    start_times = (base + datetime.timedelta(hours=10+i) for i in range(6))
    
    return ({
            "start":  int(1000 * t.timestamp()),
            "end":    int(1000 * 
                          (t + datetime.timedelta(minutes=45)).timestamp()
                         )
            } for t in start_times)

def talks(count):
    import random

    titles = [
        "A great talk about such wonderful things",
        "This bookshelf.js thing is great",
        "really love code",
        "Don't you love it when a plan comes together?",
        "Some other title"
    ]
    return ({
              "title": titles[i % len(titles)],
              "description": "blah" * i,
              "creator": 1,
              "speakers": random.sample(range(1, count), random.randint(1, 2)),
              "room": random.randint(1, count),
              "slots": [random.randint(1, count)]
            } for i in range(count))

def main(endpoint):
    for r in rooms(5):
        endpoint.post("rooms", r)
    for s in slots(5):
        endpoint.post("slots", s)
    for u in users(5):
        endpoint.post("users", u)
    for t in talks(5):
        endpoint.post("talks", t)


if __name__ == "__main__":
    import sys
    if sys.version_info < (3, 0):
      raise Exception("Run this in Python 3")
    main(Endpoint())
