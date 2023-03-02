steps = [
    [
        ## Create the table
        """
        CREATE TABLE page (
            pageID SERIAL PRIMARY KEY NOT NULL,
            coverID int NOT NULL REFERENCES cover ON DELETE CASCADE ON UPDATE CASCADE,
            page_image_url VARCHAR(100) NOT NULL,
            text VARCHAR(280) NOT NULL
        );
        """,
        """
        DROP TABLE page;
        """
        ## Drop the table
    ]
]
