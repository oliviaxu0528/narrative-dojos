steps = [
    [
        ## Create the table
        """
        CREATE TABLE books (
            id serial not null primary key,
            author varchar(1000) not null,
            image_url text not null,
            create_on date not null
        );
        """,
        ## Drop the table

        """
        DROP TABLE books;
        """
    ]
]