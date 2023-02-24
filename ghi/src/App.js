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


import { useState, createRef } from 'react'
import './App.css'

let currentLocation = 1
function App() {
  let [numOfPapers, setNumOfPapers] = useState([
    {
      frontText: 'Front 1',
      backFont: 'back 1'
    },
    {
      frontText: 'Front 2',
      backFont: 'back 2'
    },
    {
      frontText: 'Front 3',
      backFont: 'back 3'
    }
  ])
  let papers = numOfPapers.map((item, index) => {
    return createRef()
  })
  let maxLocation = numOfPapers.length + 1;
  const preButton = createRef()
  const nextButton = createRef()
  const book = createRef()
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
      if (currentLocation === 1) {
        openBook()
      }
      papers[currentLocation - 1].current.classList.add("flipped");
      papers[currentLocation - 1].current.style.zIndex = currentLocation;
      if (currentLocation === numOfPapers.length) {
        closeBook(false);
      }
      currentLocation++;
    }
  }

  function goPrevPage() {
    if (currentLocation > 1) {
      if (currentLocation === 2) {
        closeBook(true);
      }
      if (currentLocation === numOfPapers.length + 1) {
        openBook();
      }
      papers[currentLocation - 2].current.classList.remove("flipped");
      papers[currentLocation - 2].current.style.zIndex = numOfPapers.length - currentLocation + 2;
      currentLocation--;
    }
  }
  // 添加页
  function addPage() {
    const arr = [...numOfPapers]
   arr.push({
      frontText: `Front ${numOfPapers.length + 1}`,
      backFont: `back  ${numOfPapers.length + 1}`
    })
    papers = arr.map((item, index) => {
      return createRef()
    })
    setNumOfPapers(arr)
  }
  // 减少页
  function decreasePage() {
    const arr = [...numOfPapers]
    arr.pop()
    papers = arr.map((item, index) => {
      return createRef()
    })
    setNumOfPapers(arr)
  }
  return (
    <div className="App">
      <div className='setting-container'>
        <button onClick={addPage} className="add">Add a Page</button>
        <button onClick={decreasePage} className="add">Delete a Page</button>
      </div>
      <div className='book-container'>
        <button id="prev-btn" ref={preButton} onClick={goPrevPage} className="arrow">
          <h1>{'<'}</h1>

          <i className="fas fa-arrow-circle-left"></i>
        </button>
        <div id="book" className="book" ref={book}>
          {numOfPapers.map((item, index) => {
            return (
              <div style={{zIndex: numOfPapers.length - index}} className="paper" key={index} ref={papers[index]}>
                <div className="front">
                  <div id={'f'+ (index + 1)} className="front-content">
                    <h1>{item.frontText}</h1>
                  </div>
                </div>
                <div className="back">
                  <div id={'b'+ (index + 1)} className="back-content">
                    <h1>{item.backFont}</h1>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <button id="next-btn" ref={nextButton} onClick={goNextPage} className="arrow">
          <h1>{'>'}</h1>
          <i className="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </div>
  )
}

export default App
