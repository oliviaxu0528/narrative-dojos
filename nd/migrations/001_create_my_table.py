steps = [
    [
        ## Create the table
        """
        CREATE TABLE books (
            id SERIAL NOT NULL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            author VARCHAR(100) NOT NULL,
            image_url TEXT NOT NULL,
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        DROP TABLE books;
        """
        ## Drop the table
    ],
    [
        ## Create the table
        """
        CREATE TABLE accounts (
            id SERIAL NOT NULL PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            hashed_password VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE accounts;
        """
        ## Drop the table
    ]
]
