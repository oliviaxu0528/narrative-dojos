import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import './index.css';
import { useToken } from './Authentication';


const MainPage = (props) => {
  const [bookColumns, setBookColumns] = useState([]);
  const [bookDeskColumns, setBookDeskColumns] = useState([]);
  const { token } = useToken();
  let navigate = useNavigate()
  const toBookDetail = (book) => {
    navigate(`/book/${book.ID}`)
  }

  const fetchData = async () => {
    const bookUrl = `${process.env.REACT_APP_ND_API_HOST}/covers`;
    const response = await fetch(bookUrl);
    const data = await response.json();
    let arr = [];
    let columns = []
    const fn = (data) => {
      data.forEach((item, index) => {
        arr.push(item);
        if (
          (index !== 0 && (index + 1) % 3 === 0) ||
          index === data.length - 1
        ) {
          columns.push(arr);
          arr = [];
        }
      });
    };
    fn(data);
    setBookDeskColumns(columns)
    setBookColumns(data);
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
    fetchData();
  }, []);

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
        {/* <h1 className="display-5 fw-bold" style={{ textAlign: "center" }}>Narrative Dojo</h1> */}
        <div className="wrapper">
          <span>N</span>
          <span>a</span>
          <span>r</span>
          <span>r</span>
          <span>a</span>
          <span>t</span>
          <span>i</span>
          <span>v</span>
          <span>e</span>
          <span>D</span>
          <span>o</span>
          <span>j</span>
          <span>o</span>
        </div>
        <div className="col-lg-6 mx-auto">
          {/* lead mb-4 */}
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
      <h2>New books</h2>
      <select id="mySelect" onChange={() => sort()}>
        <option value="alphabetical">Alphabetical</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
      <div className=".container">
        <div className="row">
          {bookDeskColumns.map((books, index) => {
            return (
              <div className="bookshelf" key={index}>
                <div className="book-grid">
                  <ul>
                    {books.map((item) => {
                      return (
                        <li key={item.id}>
                          <div className="card mb-3 shadow">
                            <img
                              src={item.cover_image_url}
                              width="200px"
                              height="300px"
                              className="card-img-top"
                            />
                            <div className="card-body">
                              <h5 className="card-title">{item.title}</h5>
                            </div>
                            <div className="card-footer">
                              <h5
                                className="card-link"
                                onClick={() => toBookDetail(item)}
                              >
                                Read {item.title}
                              </h5>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="shelf-shadows"></div>
                <div className="shelf"></div>
              </div>
            );
          })}
        </div>
      </div>


    </>
  )
}
export default MainPage
