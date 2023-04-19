import os
import sqlite3


class Database:
    """Defines a Singleton SQLite3 Database with standard CRUD operations"""

    def __init__(self, db_name: str, query: str) -> None:
        """
        Constructor method for the Database class
        :param db_name: str
        :param query: str
        """
        if not db_name.endswith(f".db"):
            raise ValueError(f"Database name must end with .db")
        self.db_name = db_name
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        self.cursor.execute(query)
        self.conn.commit()

    def __str__(self) -> str:
        """
        Returns a string representation of the Database object to be used for display
        :return: str
        """
        return f"{self.select(os.getenv('COUNT'))} items in the database."

    def __repr__(self) -> str:
        """
        Returns a string representation of the Database object to be used for debugging
        :return: None
        """
        return str(vars(self))

    def __enter__(self) -> 'Database':
        """
        Enters the runtime context related to this object
        :return: Database
        """
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        """
        Exits the runtime context related to this object
        :param exc_type:
        :param exc_val:
        :param exc_tb:
        :return: None
        """
        self.conn.close()

    def commit(self) -> None:
        """
        Commits changes to the database
        :return: None
        """
        self.conn.commit()

    def insert(self, query: str, data: dict) -> None:
        """
        Inserts data into the database
        :param query:
        :param data: dict
        :return: None
        """
        with self.conn:
            self.cursor.execute(query,data)
        self.commit()

    def select(self, query: str) -> list:
        """
        Returns all rows in the database
        :param query: str
        :return: None
        """
        with self.conn:
            return self.cursor.execute(query).fetchall()

    def update(self, query: str, data: dict) -> None:
        """
        Updates data in the database
        :param query: str
        :param data: dict
        :return: None
        """
        with self.conn:
            self.cursor.execute(query)
        self.commit()

    def delete(self, query: str, data: dict) -> None:
        """
        Deletes data from the database
        :param query: str
        :param data: dict
        :return: None
        """
        with self.conn:
            self.cursor.execute(query)
        self.commit()
