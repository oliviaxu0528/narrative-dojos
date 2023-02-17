steps = [
    [
        ## Create the table
        """
        CREATE TABLE accounts (
            id serial not null primary key,
            username varchar(100) not null,
            password varchar(100) not null,
            password_confirmation varchar(100) not null
        )
        """,
        ## Drop the table

        """
        DROP TABLE books;
        """
    ]
]