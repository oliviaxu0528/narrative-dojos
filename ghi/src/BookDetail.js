import { useState, createRef, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import './App.css'

let currentLocation = 1
function BookDetail(props) {

    let [numOfPapers, setNumOfPapers] = useState([])
    let papers = numOfPapers.map((item, index) => {
        return createRef()
    })
    let maxLocation = numOfPapers.length + 1;
    const preButton = createRef()
    const nextButton = createRef()
    const book = createRef()
    const openBook = function () {
        book.current.style.transform = "translateX(50%)";
        preButton.current.style.transform = "translateX(-180px)";
        nextButton.current.style.transform = "translateX(180px)";
    }
    const closeBook = function (isAtBeginning) {
        if (isAtBeginning) {
            book.current.style.transform = "translateX(0%)";
        } else {
            book.current.style.transform = "translateX(100%)";
        }
        preButton.current.style.transform = "translateX(0px)";
        nextButton.current.style.transform = "translateX(0px)";
    }
    function goNextPage() {
        if (currentLocation < maxLocation) {
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
            if (papers[currentLocation - 2] && papers[currentLocation - 2].current) {
                papers[currentLocation - 2].current.classList.remove("flipped");
                papers[currentLocation - 2].current.style.zIndex = numOfPapers.length - currentLocation + 2;
            }
            currentLocation--;

        }
    }
    useEffect(() => {
        const location = useLocation()
        const book = location.state.book
        setNumOfPapers([book])
    }, [])
    return (
        <div className="App">
            <div className='book-container'>
                <button id="prev-btn" ref={preButton} onClick={goPrevPage}>
                    <h1 className='pt'>{'previous'}</h1>
                    <h1 className='cm'>{'<'}</h1>
                    <i className="fas fa-arrow-circle-left"></i>
                </button>
                <div id="book" className="book" ref={book}>
                    {numOfPapers.map((item, index) => {
                        return (
                            <div style={{ zIndex: numOfPapers.length - index }} className="paper" key={index} ref={papers[index]}>
                                <div className="front">
                                    <h1></h1>
                                    <div><img className="headerMenuEntryImg" src={item.image_url} /></div>
                                    <div className='button-2'>{item.text}</div>
                                </div>
                                <div className="back">
                                    <div id={'b' + (index + 1)} className="back-content">
                                        <h1>{`page${index + 1}`}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button id="next-btn" ref={nextButton} onClick={goNextPage}>
                    <h1 className='pt'>{'next'}</h1>
                    <h1 className='cm'>{'>'}</h1>
                    <i className="fas fa-arrow-circle-right"></i>
                </button>
            </div>
        </div>
    )
}

export default BookDetail
