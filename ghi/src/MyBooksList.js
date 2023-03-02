import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import './index.css';

const MyBooksList = (props) => {
    const [bookColumns, setBookColumns] = useState([
        {
            id: 9,
            title: '',
            author: '',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJC91-VQ6TBtIWHuYNrDmMH6w_50V5EcxI2A&usqp=CAU',
            created_on: '',
            text: 'Add text here'
        }
    ]);
    let navigate = useNavigate()
    const toBookDetail = (book) => {
        console.log(book)
        navigate(`/book/${book.ID}`)
    }
    const fetchData = async () => {
        const bookUrl = `${process.env.REACT_APP_ND_API_HOST}/books`;
        const response = await fetch(bookUrl);
        const data = await response.json();
        setBookColumns(data);
    }

    const sort = () => {
        let sortType = document.getElementById("mySelect").value;
        if (sortType === "alphabetical") {
            const titleAlp = [...bookColumns].sort((a, b) =>
                a.title > b.title ? 1 : -1,
            );
            setBookColumns(titleAlp);
        } else if (sortType === "author") {
            const authorSort = [...bookColumns].sort((a, b) =>
                a.author > b.author ? 1 : -1,
            );
            setBookColumns(authorSort);
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
            <div className="px-4 py-4 my-5 mt-0 text-center bg-gray">
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link to="/createcover" style={{ position: 'absolute', top: 80, left: 1475, right: 200 }} className="btn btn-primary btn-lg px-4 gap-3">
                        Write a new book!
                    </Link>
                </div>
            </div>
            <h2>My books</h2>
            <select id="mySelect" onChange={() => sort()}>
                <option value="alphabetical">Alphabetical</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
            <div className=".container">
                <div className="row">
                    {bookColumns.map((book, index) => {
                        return (
                            <div className="col" key={book.ID} style={{ minWidth: "260px", maxWidth: "260px" }}>
                                <div className="card mb-3 shadow">
                                    <img src={book.cover_image_url} width="200px" height="300px" className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">by {book.author}</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="card-link" onClick={() => toBookDetail(book)}>Read {book.title}</div>
                                        <div className="card-link">More books by {book.author}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default MyBooksList
