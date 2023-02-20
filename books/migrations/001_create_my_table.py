steps = [
    [
        ##create the table
        """
        create table books  (
            id serial primary key not null,
            title varchar(50) not null,
            author varchar(50) not null,
            image_url text not null,
            created_on date not null
        );
        """,
        ##drop the table
        """
        drop table books;
        """
    ]
]