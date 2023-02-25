import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BookCards(props) {
  return (
    <div className="col container">
      {props.book.map(book => {
        return (
          <div key={book.id} className="card mb-3 shadow">
            <img src={book.image_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {book.author}
              </h6>
            </div>
            <div className="card-footer">
              {new Date(book.created_on).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const MainPage = (props) => {
  const [book, setBook] = useState([]);

  const getBook = async () => {
    try {
      const url = `${process.env.REACT_APP_ND_API_HOST}/books`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setBook(data);
        console.log("the data is", data);
      }

    } catch (e) {
      console.error(e);
    }
  }

  const sort = () => {
    let sortType = document.getElementById("mySelect").value;
    if (sortType === "alphabetic") {
      const titleAlp = [...book].sort((a, b) =>
        a.title > b.title ? 1 : -1,
      );
      setBook(titleAlp);
    } else if (sortType === "author") {
      const authorSort = [...book].sort((a, b) =>
        a.author > b.author ? 1 : -1,
      );
      setBook(authorSort);
    } else if (sortType === "newest") {
      const newest = [...book].sort((a, b) =>
        a.created_on > b.created_on ? 1 : -1,
      );
      setBook(newest);
    } else {
      const oldest = [...book].sort((a, b) =>
        a.created_on < b.created_on ? 1 : -1,
      );
      setBook(oldest);
    }
  }

  useEffect(() => {
    getBook();
  }, []);

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
        <h1 className="display-5 fw-bold">Narrative Ninjas!</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            The only resource you'll ever need to plan an run your in-person or
            virtual conference for thousands of attendees and presenters.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/attendees/new" className="btn btn-primary btn-lg px-4 gap-3">Create your own book</Link>
          </div>
        </div>
      </div>
      <h2>Popular Books</h2>
      <select id="mySelect" onChange={() => sort()}>
        <option value="alphabetic">Alphabetic</option>
        <option value="author">Author</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
      <div className="container">
        <div className="row">
          <BookCards book={book} />
        </div>
      </div>
    </>
  );
}

export default MainPage;
