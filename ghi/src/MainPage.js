import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Nav, Card, Carousel } from 'react-bootstrap';
import './index.css';
import { useToken } from './Authentication';
import main1 from './img/main1.png';
import main2 from './img/main2.png';
import main3 from './img/main3.png';

const MainPage = (props) => {

  const backgroundImages = [
    main1,
    main2,
    main3
  ];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  while (backgroundImages.length < 3) {
    backgroundImages.push('');
  }

  const [bookColumns, setBookColumns] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bookDeskColumns, setBookDeskColumns] = useState([]);
  const { token } = useToken();
  let navigate = useNavigate()
  const toBookDetail = (book) => {
    navigate(`/book/${book.ID}`)
  }

  const handleSelectUser = (username) => {
    if (selectedUser !== username) {
      setSelectedUser(username);
    }
  }

  const sort = () => {
    let sortType = document.getElementById("mySelect").value;
    let bookArr = [...bookColumns]
    let bookDeskArr = []
    let columns = []
    if (sortType === "alphabetical") {
      bookArr = [...bookColumns].sort((a, b) =>
        a.title > b.title ? 1 : -1,
      );
    } else if (sortType === "newest") {
      bookArr = [...bookColumns].sort((a, b) =>
        a.created_on < b.created_on ? 1 : -1
      );

    } else if (sortType === "oldest") {
      bookArr = [...bookColumns].sort((a, b) =>
        b.created_on < a.created_on ? 1 : -1
      );

    }
    const fn = (data) => {
      data.forEach((item, index) => {
        bookDeskArr.push(item);
        if (
          (index !== 0 && (index + 1) % 3 === 0) ||
          index === data.length - 1
        ) {
          columns.push(bookDeskArr);
          bookDeskArr = [];
        }
      });
    };
    fn(bookArr);
    setBookDeskColumns(columns)
    setBookColumns([...bookArr]);
  }



  useEffect(() => {
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
    fetchData();
  }, []);

  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        style={{
          position: 'relative',
          zIndex: '1'
        }}>
        {backgroundImages.map((image, idx) => (
          <Carousel.Item key={idx} >
            <img
              className="d-block w-100"
              src={image}
              alt={`Slide ${idx}`}
              style={{ height: "850px", width: "100vw", objectFit: "cover" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <i className="bi bi-1-square"></i>
      <div>
        {/* <div className="image-container" style={{ backgroundColor: "transparent", boxShadow: "none" }}>
          <img
            className="rounded d-block mx-auto mb-4"
            src="/pucca.png"
            alt=""
            width="450"
            height="350"
          />
        </div> */}
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
        <div className="col-lg-6 mx-auto center">
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
      <div className='mx-auto'>
        <h2>New books</h2>
        <div className='filter'>
          <select id="mySelect" onChange={() => sort()}>
            <option value="alphabetical">Alphabetical</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {bookDeskColumns.map((books, index) => {
            return (
              <div className="bookshelf" key={index}>
                <div className="book-grid">
                  <ul>
                    {books.map((item) => {
                      return (
                        <li key={item.ID}>
                          <div className="card mb-3 shadow">
                            <img
                              src={item.cover_image_url}
                              width="200px"
                              height="300px"
                              className="card-img-top"
                              alt="cover"
                            />
                            <div className="card-body">
                              <h5 className="card-title">{item.title}</h5>
                            </div>
                            <Link to={`/accounts/${item.username}/covers`} onClick={() => handleSelectUser(item.username)}>
                              Read more by {item.username}
                            </Link>

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
