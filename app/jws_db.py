#!/usr/bin/env python3
# jws_db.py
# JWS Downloader: Database interface

import sqlite3

TABLE = "jws"
EVENT = "event_id"
DESC = "description"
DATE = "date"
LINK = "url_download"
DB_FILENAME = "../db/jws_list.db"

class SQLighter:
    def __enter__(self):
        """Open by content manager"""
        return self
    def __exit__(self, exception_type, exception_value, traceback):
        """Close by content manager"""
        self.close()
    def __init__(self):
        self.conn = sqlite3.connect(DB_FILENAME)
        self.c = self.conn.cursor()
        self.new_table()
    def new_table(self):
        """Create a new table if it doesn't exist yet"""
        with self.conn:
            self.c.execute(
                """CREATE TABLE IF NOT EXISTS {table} (
                id integer primary key,
                {event} integer,
                {desc} text,
                {date} text,
                {link} text)
                """.format(
                    table=TABLE,
                    event=EVENT,
                    desc=DESC,
                    date=DATE,
                    link=LINK,
                )
            )
    def close(self):
        """Close the DB connection"""
        self.conn.close()
    def select_all_rows(self):
        """Select all rows from the table"""
        with self.conn:
            self.c.execute("SELECT * FROM %s" % TABLE)
            return self.c.fetchall()
    def count_rows(self):
        """Return a number of rows in the table"""
        with self.conn:
            return len(self.select_all_rows())
    def select_row_id(self, id):
        """Search a row by ID"""
        with self.conn:
            self.c.execute(
                """SELECT * FROM %s where id = ?""" % TABLE, (id,)
            )
            return self.c.fetchone()
    def select_row_event(self, event_id):
        """Search a row by eventID"""
        with self.conn:
            self.c.execute(
                """SELECT * FROM {table} WHERE {event} = ?""".format(
                    table=TABLE, event=EVENT
                ),
                (event_id,),
            )
        return self.c.fetchone()
    def insert_row(
        self, event_id, description, date, url_event, url_download
    ):
        """Add a row the the DB"""
        with self.conn:
            self.c.execute(
                """INSERT INTO {table}({event}, {desc}, {date}, {link})
                VALUES (?, ?, ?, ?)""".format(
                    table=TABLE,
                    event=EVENT,
                    desc=DESC,
                    date=DATE,
                    link=LINK,
                ),
                (event_id, description, date, url_download),
            )
    def insert_row_from_obj(self, session_object):
        """Add a row from the JWSession object"""
        with self.conn:
            self.c.execute(
                """INSERT INTO {table}({event}, {desc}, {date}, {link})
                VALUES (?, ?, ?, ?)""".format(
                    table=TABLE,
                    event=EVENT,
                    desc=DESC,
                    date=DATE,
                    link=LINK,
                ),
                (
                    session_object.event_id,
                    session_object.event_desc,
                    session_object.event_date,
                    session_object.event_durl,
                ),
            )
    def search_event(self, event_id):
        row = self.select_row_event(event_id)
        if row:
            return row
        else:
            return False
