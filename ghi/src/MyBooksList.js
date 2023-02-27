import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";

function BookColumn(props) {
    return (
        <div className="col">
            {props.books.map(book => {
                return (
                    <div key={book.id} className="card mb-3 shadow">
                        <img src={book.image_url} width="200px" height="300px" className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <p className="card-text">by {book.author}</p>
                        </div>
                        <div className="card-footer">
                            <a href="/" className="card-link">Read {book.title}</a>
                            <p></p>
                            <a href="/" className="card-link">More books by {book.author}</a>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
const MyBooksList = (props) => {
    const [bookColumns, setBookColumns] = useState([[], [], [], [], []]);

    const fetchData = async () => {
        const bookUrl = `${process.env.REACT_APP_ND_API_HOST}/books`;

        try {
            const response = await fetch(bookUrl);
            if (response.ok) {
                const data = await response.json();

                const requests = [];
                for (let book of data) {
                    const detailUrl = `${process.env.REACT_APP_ND_API_HOST}/books/${book.id}`;
                    requests.push(fetch(detailUrl));
                }
                const responses = await Promise.all(requests);
                const columns = [[], [], [], [], []];
                let i = 0;
                for (const bookResponse of responses) {
                    if (bookResponse.ok) {
                        const details = await bookResponse.json();
                        columns[i].push(details);
                        i = i + 1;
                        if (i > 4) {
                            i = 0;
                        }
                    } else {
                        console.error(bookResponse);
                    }
                }

                setBookColumns(columns);
            }
        } catch (e) {
            console.error(e);
        }

    }

    const sort = () => {
        let sortType = document.getElementById("mySelect").value;
        if (sortType === "alphabetical") {
            const titleAlp = [...bookColumns].sort((a, b) =>
                a.title > b.title ? 1 : -1,
            );
            setBookColumns(titleAlp);
        } else if (sortType === "newest") {
            const newest = [...bookColumns].sort((a, b) =>
                a.created_on > b.created_on ? 1 : -1,
            );
            setBookColumns(newest);
        } else {
            const oldest = [...bookColumns].sort((a, b) =>
                a.created_on < b.created_on ? 1 : -1,
            );
            setBookColumns(oldest);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="px-4 py-4 my-5 mt-0 text-center bg-white">
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link to="/" style={{ position: 'fixed', top: 80, left: 1475, right: 200 }} className="btn btn-primary btn-lg px-4 gap-3">
                        Write a new book!
                    </Link>
                </div>
            </div>
            <div className="container">
                <h2>My books</h2>
                <select id="mySelect" onChange={() => sort()}>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <div className="row">
                    {bookColumns.map((bookList, index) => {
                        return <BookColumn key={index} books={bookList} />;
                    })}
                </div>
            </div>
        </>
    )
}
export default MyBooksList
