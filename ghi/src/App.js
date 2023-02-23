// import { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
// import './App.css';

// function App() {
//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
//       console.log('fastapi url: ', url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, [])


//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <Construct info={launch_info} />


//     </div>
//   );
// }

// export default App;


import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  let currentLocation = 1;
  let numOfPapers = 3;
  let maxLocation = numOfPapers + 1;
  const preButton = useRef(null)
  const nextButton = useRef(null)
  const book = useRef(null)
  const paper1 = useRef(null)
  const paper2 = useRef(null)
  const paper3 = useRef(null)
  const openBook = function() {
    book.current.style.transform = "translateX(50%)";
    preButton.current.style.transform = "translateX(-180px)";
    nextButton.current.style.transform = "translateX(180px)";
  }

  const closeBook = function (isAtBeginning) {
    if(isAtBeginning) {
      book.current.style.transform = "translateX(0%)";
    } else {
      book.current.style.transform = "translateX(100%)";
    }
    preButton.current.style.transform = "translateX(0px)";
    nextButton.current.style.transform = "translateX(0px)";
  }
  function goNextPage() {
    if(currentLocation < maxLocation) {
      switch(currentLocation) {
        case 1:
          openBook();
          paper1.current.classList.add("flipped");
          paper1.current.style.zIndex = 1;
          break;
        case 2:
          paper2.current.classList.add("flipped");
          paper2.current.style.zIndex = 2;
          break;
        case 3:
          paper3.current.classList.add("flipped");
          paper3.current.style.zIndex = 3;
          closeBook(false);
          break;
        default:
          throw new Error("unkown state");
      }
      currentLocation++;
    }
  }

  function goPrevPage() {
    if (currentLocation > 1) {
      switch (currentLocation) {
        case 2:
          closeBook(true);
          paper1.current.classList.remove("flipped");
          paper1.current.style.zIndex = 3;
          break;
        case 3:
          paper2.current.classList.remove("flipped");
          paper2.current.style.zIndex = 2;
          break;
        case 4:
          openBook();
          paper3.current.classList.remove("flipped");
          paper3.current.style.zIndex = 1;
          break;
        default:
          throw new Error("unkown state");
      }
      currentLocation--;
    }
  }
  return (
    <div className="App">
      <button id="prev-btn" ref={preButton} onClick={goPrevPage}>
        <h1>{'<'}</h1>

        <i className="fas fa-arrow-circle-left"></i>
      </button>
      <div id="book" className="book" ref={book}>
        <div id="p1" className="paper" ref={paper1}>
          <div className="front">
            <div id="f1" className="front-content">
              <h1>Front1</h1>
            </div>
          </div>
          <div className="back">
            <div id="b1" className="back-content">
              <h1>Back 1</h1>
            </div>
          </div>
        </div>
        <div id="p2" className="paper" ref={paper2}>
          <div className="front">
            <div id="f2" className="front-content">
              <h1>Front 2</h1>
            </div>
          </div>
          <div className="back">
            <div id="b2" className="back-content">
              <h1>Back 2</h1>
            </div>
          </div>
        </div>
        <div id="p3" className="paper" ref={paper3}>
          <div className="front">
            <div id="f3" className="front-content">
              <h1>Front 3</h1>
            </div>
          </div>
          <div className="back">
            <div id="b3" className="back-content">
              <h1>Back 3</h1>
            </div>
          </div>
        </div>
      </div>
      <button id="next-btn" ref={nextButton} onClick={goNextPage}>
        <h1>{'>'}</h1>

        <i className="fas fa-arrow-circle-right"></i>
      </button>
    </div>
  )
}

export default App
