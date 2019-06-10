#!/usr/bin/env python3
# jws_dl.py
# JWS Downloader: main script

import requests
from bs4 import BeautifulSoup
from os import environ
from os.path import expanduser
import json
from base64 import b64decode
from clint.textui import progress
from jws_db import SQLighter
import config

LANGUAGE = config.RU
HOME_DIRECTORY = "/Videos/JWS/"

def decode_var(encoded_variable):
    """Decode a base64 encoded string"""
    bstring = encoded_variable.encode("utf-8", "ignore")
    dec64data = b64decode(bstring)
    return dec64data.decode("utf-8", "ignore")

def check_environment():
    """Check whether you typed well the password"""
    print("LOGIN:\t\t%s" % decode_var(environ[config.ENV_USER]))
    print("PASSWD:\t\t%s" % decode_var(environ[config.ENV_PASS]))

def get_events(session):
    """Get a app/json data with the list of events"""

    # STEP 1
    parsed = session.make_request(
        "GET", session.url_init + session.uid, config.BS4_NEXT_FORM
    )
    # STEP 2
    parsed = session.make_request(
        "POST",
        session.url_domain + parsed,
        config.BS4_LOGIN_FORM,
        JWSession.compile_dict(config.DATA_NEXT, session.mail),
    )
    # STEP 3
    parsed = session.make_request(
        "POST",
        session.url_domain + parsed,
        config.BS4_SAML_RESPONSE,
        JWSession.compile_dict(
            config.DATA_LOGIN, session.mail, session.passwd
        ),
    )
    # STEP 4
    parsed = session.make_request(
        "POST",
        session.relay_state,
        None,
        JWSession.compile_dict(
            config.DATA_RELAY_STATE, session.relay_state, parsed
        ),
    ).text
    # STEP 5
    parsed = session.make_request(
        "POST",
        session.url_videos,
        None,
        json.dumps(LANGUAGE),
        JWSession.compile_dict(
            config.HEADERS_XREQUEST, session.get_cookie("XSRF-TOKEN")
        ),
    ).text
    return parsed

def get_link(session):
    """Return a link to download the video"""

    # STEP 6
    parsed = session.make_request(
        "GET",
        session.event_turl,
        None,
        None,
        JWSession.compile_dict(
            config.HEADERS_HOST, session.stream_host
        ),
    ).url
    return parsed

def download_file(url, filename_path):
    """Download a file by using requests and clink"""
    r = requests.get(url, stream=True)
    # TODO introduce a filepath validation
    with open(filename_path, "wb") as f:
        total_length = int(r.headers.get("content-length"))
        for chunk in progress.bar(
            r.iter_content(chunk_size=config.SIZE),
            expected_size=(total_length / config.SIZE) + 1,
        ):
            if chunk:
                f.write(chunk)
                f.flush
    return filename_path

class Singleton(object):
    __instance = None
    def __new__(cls, *args, **kwargs):
        if not cls.__instance:
            cls.__instance = super(Singleton, cls).__new__(cls)
        return cls.__instance

class JWSession(Singleton):
    def __enter__(self):
        """Open by content manager"""
        return self
    def __exit__(self, exception_type, exception_value, traceback):
        """Close by content manager"""
        self.close()
    def __init__(self, session):
        self.__session = session
        self.uid = decode_var(environ[config.ENV_USER])
        self.mail = self.uid + decode_var(config.MAIL_DOMAIN_ENC)
        self.passwd = decode_var(environ[config.ENV_PASS])
        self.url_init = decode_var(config.URL_ADSF_ENC)
        self.url_domain = decode_var(config.URL_DOMAIN_ENC)
        self.relay_state = decode_var(config.URL_RELAY_STATE_ENC)
        self.url_videos = decode_var(config.URL_VIDEOS_ENC)
        self.stream_host = decode_var(config.STREAM_HOST_ENC)
    def close(self, *args, **kwargs):
        """Delete the JWS instance"""
        self.__session.close(*args, **kwargs)
        del self
    def set_req(self, find_params=None, payload=None, headers=None):
        if find_params:
            self.__tag = find_params["find_tag"]
            self.__key = find_params["argument_key"]
            self.__value = find_params["argument_value"]
            self.__item = find_params["get_item"]
        self._data = payload
        if headers:
            self._headers = headers
        else:
            self._headers = self.__session.headers
    def make_request(
        self, method, url, find_params=None, *args, **kwargs
    ):
        self.set_req(find_params, *args, **kwargs)
        if method == "GET":
            request = self.get(url)
        elif method == "POST":
            request = self.post(url)
        # Check whether we sent BS4 find parameters
        # TODO: fix double check of find_params
        # TODO: refactor set_req() to wrap parse_html()
        if find_params:
            return self.parse_html(request.text)
        else:
            return request
    def get(self, url, *args, **kwargs):
        self.__rqst = self.__session.get(
            url, data=self._data, headers=self._headers
        )
        self.last_url = self.__rqst.url
        return self.__rqst
    def post(self, url, *args, **kwargs):
        self.__rqst = self.__session.post(
            url, data=self._data, headers=self._headers
        )
        self.last_url = self.__rqst.url
        return self.__rqst
    def parse_html(self, html):
        parser = BeautifulSoup(html, "lxml")
        return parser.find(self.__tag, {self.__key: self.__value}).get(
            self.__item
        )
    def get_cookie(self, cookie_name):
        return self.__session.cookies.get(cookie_name)
    def set_event_info(self, events_json):
        el = json.loads(events_json)
        self.event_id = el[1]["data"]["id_event"]
        self.event_desc = el[1]["description"]
        self.event_date = el[1]["date"]
        self.event_turl = el[1]["vod_firstfile_url"]
    def update_download_link(self, event_download_url):
        self.event_durl = event_download_url
    @staticmethod
    def compile_dict(data, *args):
        iter_args = iter(args)
        for key in data:
            if not data[key]:
                data[key] = next(iter_args)
        return data

def main():
    s = requests.Session()
    # Open DB and an instance of customized session
    with SQLighter() as db, JWSession(s) as jws:
        # Make multiple requests to get a app/json events list
        events = get_events(jws)
        # Fill JWS with event information (id, description, url)
        jws.set_event_info(events)
        # Request a download link
        durl = get_link(jws)
        # Add a download link to the JWS instance
        jws.update_download_link(durl)
        # Check whether video is already presented in the DB
        if not db.select_row_event(jws.event_id):
            # ~/Downloads/video_name.mp4
            fpath = (
                expanduser("~")
                + HOME_DIRECTORY
                + jws.event_desc
                + ".mp4"
            )
            print("Downloaded: %s" % download_file(durl, fpath))
            # Add a note with the event information to the DB
            db.insert_row_from_obj(jws)
        else:
            print("%s already exists" % jws.event_id)

if __name__ == "__main__":
    main()
