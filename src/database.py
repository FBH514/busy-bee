import os
import sqlite3


class Database:

    def __init__(self, db_name: str, query: str) -> None:
        """
        Constructor for the Database class
        :param db_name: str
        :param query: str
        :return: None
        """
        if not db_name.endswith('.db'):
            raise ValueError('Database name must end with .db')
        self.db_name = db_name
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        self.cursor.execute(query)
        self.conn.commit()

    def __repr__(self) -> str:
        """
        Returns a string representation of the object
        :return: None
        """
        return str(vars(self))

    def insert(self, query: str, data: dict) -> None:
        """
        Inserts data into the database
        :param query:
        :param data: dict
        :return: None
        """
        with self.conn:
            self.cursor.execute(query, data)
        self.conn.commit()

    def view(self, query: str) -> list:
        """
        Returns all rows in the database
        :param query: str
        :return: None
        """
        with self.conn:
            self.cursor.execute(query)
            return self.cursor.fetchall()

    def view_one(self, query: str, data: str) -> list:
        """
        Views one item from the database
        :param query: str
        :param data: str
        :return: None
        """
        data = {
            'applied': f'%{data}%',
            'title': f'%{data}%',
            'location': f'%{data}%',
            'employer': f'%{data}%',
            'description': f'%{data}%',
            'url': f'%{data}%'
        }
        with self.conn:
            self.cursor.execute(query, data)
            return self.cursor.fetchall()

    def view_title(self, title: str) -> list:
        """
        Views all the data in the database
        :param title: str
        :return: list
        """
        with self.conn:
            self.cursor.execute(os.getenv('VIEW_TITLE'), {'title': f'%{title}%'})
            return self.cursor.fetchall()

    def view_location(self, location: str) -> list:
        """
        Views all the data in the database
        :param location: str
        :return: list
        """
        with self.conn:
            self.cursor.execute(os.getenv('VIEW_LOCATION'), {'location': f'%{location}%'})
            return self.cursor.fetchall()

    def view_employer(self, employer: str) -> list:
        """
        Views all the data in the database
        :param employer: str
        :return: list
        """
        with self.conn:
            self.cursor.execute(os.getenv('VIEW_EMPLOYER'), {'employer': f'%{employer}%'})
            return self.cursor.fetchall()

    def most_applied_location(self, query: str) -> list:
        """
        Views the most applied location.
        :param query: str
        :return: list
        """
        with self.conn:
            self.cursor.execute(query)
            return self.cursor.fetchall()

    def update(self, query: str, data: dict) -> None:
        """
        Updates data in the database
        :param query: str
        :param data: dict
        :return: None
        """
        pass

    def delete(self, query: str, data: dict) -> None:
        """
        Deletes data from the database
        :param query: str
        :param data: dict
        :return: None
        """
        pass
