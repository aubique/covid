#!/usr/bin/env python3
# config.py
# JWS Downloader: configuration

SIZE = 1024
ENV_USER = "JW_USER"
ENV_PASS = "JW_PASS"
XSRF_NAME = "XSRF-TOKEN"
SESSION_NAME = "sessionstream"

URL_ADSF_ENC = (
    "aHR0cHM6Ly93d3cuc3RyZWFtLmp3Lm9yZy9hZGZzL2xvZ2luL3VzZXJuYW1lLw=="
)
URL_VIDEOS_ENC = (
    "aHR0cHM6Ly9mbGUuc3RyZWFtLmp3Lm9yZy9ldmVudC9sYW5ndWFnZVZpZGVvcw=="
)

PAYLOAD_EN = '{"language":{"id_language":153,"symbol":"en","locale":"en","code_tv":null,"name":"English","vernacular":"English","spellings":null,"direction":"ltr","is_sign":"0","has_content":"1","id_branch_channel":"2596","has_translation":"1","date_format":"Y-m-d","country_description":"United States","version":"1","translatedName":"English","translatedNameWithCountry":"English (United States)","translatedNameWithSymbol":"English(United States)(en)","translatedNameWithLocale":"English (United States) (en)"}}'

PAYLOAD_RU = ""

PAYLOAD_FR = ""

HEADERS_LANGUAGE = {
    "Host": "fle.stream.jw.org",
    "Connection": "keep-alive",
    "Content-Length": "502",
    "Pragma": "no-cache",
    "Cache-control": "no-cache",
    "Origin": "https://fle.stream.jw.org",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/73.0.3683.86 Chrome/73.0.3683.86 Safari/537.36",
    "Content-Type": "application/json;charset=UTF-8",
    "Accept": "application/json, text/plain, */*",
    "X-Requested-With": "XMLHttpRequest",
    "DNT": "1",
    "Referer": "https://fle.stream.jw.org/federation/ok",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,fr;q=0.6",
}

HEADERS_DOWNLOAD = {
    "Host": "fle.stream.jw.org",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/73.0.3683.86 Chrome/73.0.3683.86 Safari/537.36",
    "DNT": "1",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,fr;q=0.6",
}
