steps = [
    [
        ## Create the table
        """
        CREATE TABLE books (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(1000) NOT NULL,
            picture_url TEXT NOT NULL,
            created_on DATE NOT NULL
        );
        """,
        ## Drop the table
        """
        DROP TABLE books;
        """
    ]
]
