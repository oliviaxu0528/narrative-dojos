import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BookDetailCover() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            const response = await fetch(`${process.env.REACT_APP_ND_API_HOST}/books/${bookId}`);
            const data = await response.json();
            setBook(data);
        };
        fetchBook();
    }, [bookId]);

    if (!book) {
        return <div>No Content Available</div>;
    }

    return (
        <div className="col" style={{ minWidth: "260px", maxWidth: "260px" }}>
            <div key={book.id} className="card mb-3 shadow">
                <img src={book.image_url} width="200px" height="300px" className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">by {book.username}</p>
                    <p className="card-text">{book.description}</p>
                </div>
                <div className="card-footer">
                    <a href={book.read_url} className="card-link">Read {book.title}</a>
                    <p></p>
                    <Link to={`/account/${account.id}`} className="card-link">Read more by {author.title}</Link>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;
