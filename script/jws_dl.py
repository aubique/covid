#!/usr/bin/env python3
# jws_dl.py
# JWS Downloader: main script

import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from os import environ
from os.path import expanduser
from json import loads as deserialize
from base64 import b64decode
from clint.textui import progress
from jws_db import SQLighter
import config

def decode_var(encoded_variable):
    """Decode a base64 encoded string"""
    bstring = encoded_variable.encode('utf-8', 'ignore')
    dec64data = b64decode(bstring)
    return dec64data.decode('utf-8', 'ignore')

def check_environment():
    """Check whether you typed well the password"""
    print('LOGIN:\t\t%s' % decode_var(environ[config.ENV_USER]))
    print('PASSWD:\t\t%s' % decode_var(environ[config.ENV_PASS]))

def selenium_setup():
    """Setup options and return webdriver"""
    options = Options()
    options.add_argument('no-sandbox')
    return webdriver.Chrome(chrome_options=options)

def selenium_login(driver, url, password):
    """Authorize with Chromium and return cookies"""
    driver.get(url)
    password_input = driver.find_element_by_id('passwordInput')
    password_input.send_keys(password)
    submit_button = driver.find_element_by_id('submitButton')
    submit_button.click()
    xsrf_val = get_cookie(driver, config.XSRF_NAME)
    session_val = get_cookie(driver, config.SESSION_NAME)
    return xsrf_val, session_val

def get_cookie(driver, search_pattern):
    """Get a value from the given cookie"""
    return next(
        (
            cookie
            for cookie in driver.get_cookies()
            if cookie['name'] == (search_pattern)
        )
    )['value']

def set_session(xsrf_value, session_value):
    """Return a session with pre-installed cookies"""
    xsrf_cookie = requests.cookies.create_cookie(
        name=config.XSRF_NAME, value=xsrf_value
    )
    session_cookie = requests.cookies.create_cookie(
        name=config.SESSION_NAME, value=session_value
    )
    s = requests.Session()
    s.cookies.set_cookie(xsrf_cookie)
    s.cookies.set_cookie(session_cookie)
    return s

def request_events(xsrf_value, session_value):
    """Return application/json data with the list of events"""
    url = decode_var(config.URL_VIDEOS_ENC)
    s = set_session(xsrf_value, session_value)
    headers = {'X-XSRF-TOKEN': s.cookies.get(config.XSRF_NAME)}
    headers.update(config.HEADERS_LANGUAGE)
    page_events = s.post(url, data=config.PAYLOAD_EN, headers=headers)
    return page_events.content

def request_link(url_event, xsrf_value, session_value):
    """Get a link from the redirected event"""
    s = set_session(xsrf_value, session_value)
    pd = s.get(url_event, headers=config.HEADERS_DOWNLOAD)
    #print(s.cookies)
    return pd.url

def create_dict(event_list):
    """Return a dictionary with the event info"""
    event_dict = {
        'event_id': event_list[1]['data']['id_event'],
        'description': event_list[1]['description'],
        'date': event_list[1]['date'],
        'url_event': event_list[1]['vod_firstfile_url']
    }
    return event_dict

def download_file(url, filename):
    fpath = expanduser('~') + '/Downloads/' + filename + '.mp4'
    r = requests.get(url, stream=True)
    with open(fpath, 'wb') as f:
        total_length = int(r.headers.get('content-length'))
        for chunk in progress.bar(r.iter_content(chunk_size=config.SIZE),
                                  expected_size=(total_length/config.SIZE) + 1):
            if chunk:
                f.write(chunk)
                f.flush
    return fpath

def main():
    web = selenium_setup()
    db = SQLighter()
    # Get the environment variables decoded
    url = decode_var(config.URL_ADSF_ENC)
    uid = decode_var(environ[config.ENV_USER])
    pwd = decode_var(environ[config.ENV_PASS])
    # Get the cookies out of the successfully authorized session
    cookies = selenium_login(web, url+uid, pwd)
    # Then dispose browser and end the web session
    web.quit()
    # Deserialize app/json data to the event list
    el = deserialize(request_events(*cookies))
    # Compile an event dictionary for ensuining usage
    ed = create_dict(el)
    # Send an event-link with extracted tuple of cookies
    url = request_link(ed['url_event'], *cookies)
    # Add a new pair to the event dictionary
    ed.update(url_download=url)
    # Check by event_id if video is already presented in the DB
    if not db.select_row_event(ed['event_id']):
        # Download video with described name
        print(download_file(ed['url_download'], ed['description']))
        db.insert_row(**ed)
    else:
        print('%s already exists' % ed['event_id'])
    db.close()
    check_environment()

if __name__ == '__main__':
    main()
