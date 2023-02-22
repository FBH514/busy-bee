import sqlite3


class Database:

    def __init__(self, db_name: str) -> None:
        """
        Constructor for the Database class
        :param db_name: str
        :return: None
        """
        if not db_name.endswith('.db'):
            raise ValueError('Database name must end with .db')
        self.db_name = db_name
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        self.cursor.execute('CREATE TABLE IF NOT EXISTS careers '
                            '('
                            'id INTEGER PRIMARY KEY,'
                            ' title TEXT,'
                            ' location TEXT,'
                            ' employer TEXT,'
                            ' description TEXT,'
                            ' url TEXT'
                            ')'
                            )

    def __repr__(self) -> str:
        """
        Returns a string representation of the object
        :return: None
        """
        return str(vars(self))

    def insert(self, data: dict) -> None:
        """
        Inserts data into the database
        :param data:
        :return: None
        """
        self.cursor.execute('INSERT INTO careers VALUES '
                            '(:id, :title, :location, :employer, :description, :url)', data)

    def view(self) -> list:
        """
        Views all the data in the database
        :return: None
        """
        self.cursor.execute('SELECT * FROM careers')
        return self.cursor.fetchall()

    def update(self, data: dict) -> None:
        """
        Updates data in the database
        :param data:
        :return: None
        """
        pass

    def delete(self, data: dict) -> None:
        """
        Deletes data from the database
        :param data:
        :return: None
        """
        pass
