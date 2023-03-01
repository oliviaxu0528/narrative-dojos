steps = [
    [
        ## Create the table
        """
        CREATE TABLE pages (
            pageID SERIAL PRIMARY KEY NOT NULL,
            bookID int NOT NULL REFERENCES books ON DELETE CASCADE ON UPDATE CASCADE,
            image_url VARCHAR(100) NOT NULL,
            page_text VARCHAR(280) NOT NULL
        );
        """,
        """
        DROP TABLE pages;
        """
        ## Drop the table
    ]
]
