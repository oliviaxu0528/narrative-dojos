steps = [
    [
        ## Create the table
        """
        ALTER TABLE accounts
            RENAME password to hashed_password;
        """,
        """
        ALTER TABLE accounts
            RENAME hashed_password to password;
        """
        ## Drop the table
    ],
    [
        ## Create the table
        """
        ALTER TABLE accounts
            DROP COLUMN password_confirmation;
        """,
        """
        ALTER TABLE accounts
            ADD password_confirmation VARCHAR(100) NOT NULL;
        """
        ## Drop the table
    ]
]
