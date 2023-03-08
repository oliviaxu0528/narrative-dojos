import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import './index.css';
import { useToken } from './Authentication';



const AuthorBookList = () => {
    const [bookColumns, setBookColumns] = useState([]);
    const { token } = useToken();
    const { username } = useParams();

    let navigate = useNavigate()
    const toBookDetail = (book) => {
        navigate(`/book/${book.ID}`)
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
                a.created_on < b.created_on ? 1 : -1
            );
            setBookColumns(newest);
        } else if (sortType === "oldest") {
            const oldest = [...bookColumns].sort((a, b) =>
                b.created_on < a.created_on ? 1 : -1
            );
            setBookColumns(oldest);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const bookUrl = `${process.env.REACT_APP_ND_API_HOST}/accounts/${username}/covers/`;
            const response = await fetch(bookUrl);
            const data = await response.json();
            setBookColumns(data);
        }
        fetchData();
    }, []);

    function BookColumn({ book }) {
        return (
            <div className="col" style={{ minWidth: "260px", maxWidth: "260px" }}>
                <div key={book.id} className="card mb-3 shadow">
                    <img src={book.cover_image_url} width="200px" height="300px" className="card-img-top" alt="cover_image_url" />
                    <div className="card-body">
                        <p className="card-link btn px-100 gap-500" onClick={() => toBookDetail(book)}>Read {book.title}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div>
                <img
                    className="bg-white rounded shadow d-block mx-auto mb-4"
                    src="/pucca.png"
                    alt=""
                    width="450"
                    height="350"
                />
                <h1 className="display-5 fw-bold" style={{ textAlign: "center" }}>Narrative Dojo</h1>
                <div className="col-lg-6 mx-auto">
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        {token && (
                            <>
                                <Link to="/createcover" className="btn btn-primary btn-lg px-4 gap-3">
                                    Write a book!
                                </Link>
                            </>
                        )}
                        {!token && (
                            <>
                                <Link to="/signup" className="btn btn-primary btn-lg px-4 gap-3">
                                    Write a book!
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <h2>Books by: {username}</h2>
            <select id="mySelect" onChange={() => sort()}>
                <option value="alphabetical">Alphabetical</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
            <div className=".container">
                <div className="row">
                    {bookColumns.map((book, index) => {
                        return <BookColumn key={index} book={book} />;
                    })}
                </div>
            </div>
        </>
    )
}
export default AuthorBookList;
