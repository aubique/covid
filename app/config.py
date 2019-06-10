#!/usr/bin/env python3
# config.py
# JWS Downloader: configuration

SIZE = 1024
ENV_USER = "JW_USER"
ENV_PASS = "JW_PASS"
XSRF_NAME = "XSRF-TOKEN"
SESSION_NAME = "sessionstream"
# Encoded with Base64 URLs
MAIL_DOMAIN_ENC = "QGp3cHViLm9yZw=="
STREAM_HOST_ENC = "ZmxlLnN0cmVhbS5qdy5vcmc="
URL_DOMAIN_ENC = "aHR0cHM6Ly9sb2dpbi5qd3B1Yi5vcmc="
URL_ADSF_ENC = "aHR0cHM6Ly93d3cuc3RyZWFtLmp3Lm9yZy9hZGZzL2xvZ2luL2lkcC9qd3B1Yi91c2VybmFtZS8="
URL_RELAY_STATE_ENC = (
    "aHR0cHM6Ly9mbGUuc3RyZWFtLmp3Lm9yZy9hZGZzL3NhbWwyL2lkcC9qd3B1Yg=="
)
URL_VIDEOS_ENC = (
    "aHR0cHM6Ly9mbGUuc3RyZWFtLmp3Lm9yZy9ldmVudC9sYW5ndWFnZVZpZGVvcw=="
)
# Data payload for get-request on langaugeVideos
EN = {"language": {"id_language": 153}}
RU = {"language": {"id_language": 749}}
FR = {"language": {"id_language": 168}}
# Payload data for post-request
DATA_NEXT = {"Email": None, "HomeRealmByEmail": "Next"}
DATA_LOGIN = {
    "UserName": None,
    "Password": None,
    "AuthMethod": "FormsAuthentication",
}
DATA_RELAY_STATE = {"RelayState": None, "SAMLResponse": None}
HEADERS_XREQUEST = {
    "X-Requested-With": "XMLHttpRequest",
    "X-XSRF-TOKEN": None,
}
HEADERS_HOST = {"Host": None}
# Dictionary for BeautifulSoup4 DOM search
BS4_NEXT_FORM = {
    "find_tag": "form",
    "argument_key": "id",
    "argument_value": "hrd",
    "get_item": "action",
}
BS4_LOGIN_FORM = {
    "find_tag": "form",
    "argument_key": "id",
    "argument_value": "loginForm",
    "get_item": "action",
}
BS4_SAML_RESPONSE = {
    "find_tag": "input",
    "argument_key": "name",
    "argument_value": "SAMLResponse",
    "get_item": "value",
}
