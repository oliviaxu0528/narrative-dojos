import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import './index.css';

function BookColumn({ book }) {
  return (
    <div className="col" style={{ minWidth: "260px", maxWidth: "260px" }}>
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


    </div>
  );
}
const MainPage = (props) => {
  const [bookColumns, setBookColumns] = useState([]);

  const fetchData = async () => {
    const bookUrl = `${process.env.REACT_APP_ND_API_HOST}/books`;
    const response = await fetch(bookUrl);
    const data = await response.json();
    console.log("data", data)

    setBookColumns(data);

  }

  const sort = () => {
    let sortType = document.getElementById("mySelect").value;
    if (sortType === "alphabetic") {
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
      <div className="px-4 py-4 my-5 mt-0 text-center bg-white">
        <img
          className="bg-white rounded shadow d-block mx-auto mb-4"
          src="/Ninja.png"
          alt=""
          width="400"
          height="300"
        />
        <h1 className="display-5 fw-bold">Narrative Dojo</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            by Narrative Ninjas
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/create" className="btn btn-primary btn-lg px-4 gap-3">
              Write a book!
            </Link>
          </div>
        </div>
      </div>
      <h2>New books</h2>
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
export default MainPage
