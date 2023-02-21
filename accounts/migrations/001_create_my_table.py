steps = [
    [
        ## Create the table
        """
        CREATE TABLE accounts (
            id SERIAL NOT NULL PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            password_confirmation VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE accounts;
        """
        ## Drop the table
    ]
]
