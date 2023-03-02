steps = [
    [
        ## Create the table
        """
        CREATE TABLE cover (
            ID SERIAL NOT NULL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            author VARCHAR(100) NOT NULL,
            cover_image_url TEXT NOT NULL,
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        DROP TABLE cover;
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
