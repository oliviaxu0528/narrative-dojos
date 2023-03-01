steps = [
    [
        ## Create the table
        """
        CREATE TABLE pages (
            pageID serial primary key NOT NULL,
            bookID int NOT NULL REFERENCES books ON DELETE CASCADE ON UPDATE CASCADE,
            image_url VARCHAR(100) NOT NULL,
            page_text TEXT NOT NULL
        );
        """,
        """
        DROP TABLE pages;
        """
        ## Drop the table
    ]
]
