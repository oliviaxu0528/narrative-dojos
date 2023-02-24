// import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";

function BookColumn(props) {
    return (
    <div className="col">
      {props.books && props.books.map(book => {
        return (
          <div key={book.id} className="card mb-3 shadow">
            <img src={book.image_url} className="card-img-top"/>
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {book.title}
              </h6>
              <p className="card-text">by {book.author}</p>
            </div>
            <div className="card-footer">
              <a href="#" className="card-link">Read {book.title}</a>
              <p></p>
              <a href="#" className="card-link">More books by {book.author}</a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
const MainPage = (props) =>  {
  const [bookColumns, setBookColumns] = useState([[], [], []]);

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
        const columns = [[], [], []];
        let i = 0;
        for (const bookResponse of responses) {
          if (bookResponse.ok) {
            const details = await bookResponse.json();
            columns[i].push(details);
            i = i + 1;
            if (i > 2) {
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

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img
          className="bg-white rounded shadow d-block mx-auto mb-4"
          src="/logo.svg"
          alt=""
          width="400px"
          height="200px"
        />
        <h1 className="display-5 fw-bold">Narrative Dojo</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            by Narrative Ninjas
          </p>
          {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link
              to="/attendees/new"
              className="btn btn-primary btn-lg px-4 gap-3"
            >
              Attend a conference
            </Link>
          </div> */}
        </div>
      </div>
      <div className="container">
        <h2>List of Books</h2>
        <div className="row">
          {bookColumns.map((bookList, index) => {
            return <BookColumn key={index} list={bookList} />;
          })}
        </div>
      </div>
    </>
    // <div className="card" style={{width: '18rem'}}>
    //     {props.books.map(book => {
    //         return (
    //             <div>
    //             <img src={book.image_url} className="card-img-top" alt="" width="200px" height="200px"/>
    //             <div className="card-body">
    //                 <h5 className="card-title">{book.title}</h5>
    //                 <p className="card-text">by {book.author}</p>
    //                 <p className="card-text">written on {book.created_on}</p>
    //             </div>
    //             <div>
    //                 <a href="#" className="card-link">Read {book.title}</a>
    //                 <p></p>
    //                 <a href="#" className="card-link">More books by {book.author}</a>
    //             </div>
    //         </div>
    //             )})}
    // </div>
  );
}
export default MainPage
