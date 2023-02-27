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
                            'applied TEXT,'
                            'title TEXT,'
                            'location TEXT,'
                            'employer TEXT,'
                            'description TEXT,'
                            'url TEXT'
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
        :param data: dict
        :return: None
        """
        with self.conn:
            self.cursor.execute(
                'INSERT INTO careers VALUES '
                '(NULL, :applied, :title, :location, :employer, :description, :url)',
                data
            )

    def view(self) -> list:
        """
        Views all the data in the database
        :return: None
        """
        with self.conn:
            self.cursor.execute('SELECT * FROM careers')
            return self.cursor.fetchall()

    def view_one(self, data: str) -> list:
        """
        Views one item from the database
        :param data: str
        :return: None
        """
        with self.conn:
            self.cursor.execute(
                'SELECT * FROM careers WHERE '
                'applied like :applied OR '
                'title like :title OR '
                'location like :location OR '
                'employer like :employer OR '
                'description like :description OR '
                'url like :url',
                {
                    'applied': f'%{data}%',
                    'title': f'%{data}%',
                    'location': f'%{data}%',
                    'employer': f'%{data}%',
                    'description': f'%{data}%',
                    'url': f'%{data}%'
                }

            )
            return self.cursor.fetchall()

    def view_title(self, title: str) -> list:
        """
        Views all the data in the database
        :param title: str
        :return: list
        """
        with self.conn:
            self.cursor.execute(
                'SELECT * FROM careers WHERE title like :title',
                {'title': f'%{title}%'}
            )
            return self.cursor.fetchall()

    def view_location(self, location: str) -> list:
        """
        Views all the data in the database
        :param location: str
        :return: list
        """
        with self.conn:
            self.cursor.execute(
                'SELECT * FROM careers WHERE location like :location',
                {'location': f'%{location}%'}
            )
            return self.cursor.fetchall()

    def view_employer(self, employer: str) -> list:
        """
        Views all the data in the database
        :param employer: str
        :return: list
        """
        with self.conn:
            self.cursor.execute(
                'SELECT * FROM careers WHERE employer like :employer',
                {'employer': f'%{employer}%'}
            )
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


if __name__ == '__main__':
    db = Database('careers-tracker.db')
    print(db.view_one('software'))
