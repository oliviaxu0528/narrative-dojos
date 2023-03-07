import { useState, createRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './App.css'
// import assemblyai from './assemblyai';

// const synth = window.speechSynthesis;

// function speak(text) {
//     const utterance = new SpeechSynthesisUtterance(text);
//     synth.speak(utterance);
// }


let currentLocation = 1
function BookDetail() {
    let [numOfPapers, setNumOfPapers] = useState([])
    const [isPlaying, setIsPlaying] = useState(false);
    let papers = numOfPapers.map((item, index) => {
        return createRef()
    })
    let [coverPaper, setCoverPaper] = useState([])
    papers.unshift(createRef())
    // const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    let maxLocation = numOfPapers.length + 2;
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
            if (currentLocation === numOfPapers.length + 1) {
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
            if (currentLocation === numOfPapers.length + 2) {
                openBook();
            }
            if (papers[currentLocation - 2] && papers[currentLocation - 2].current) {
                papers[currentLocation - 2].current.classList.remove("flipped");
                papers[currentLocation - 2].current.style.zIndex = numOfPapers.length - currentLocation + 2;
            }
            currentLocation--;
        }
    }

    async function getCoverById(id) {
        const bookUrl = `${process.env.REACT_APP_ND_API_HOST}/covers/${id}`;
        const response = await fetch(bookUrl);
        const object = await response.json();
        const data = [object]
        setCoverPaper(data);
    }
    useEffect(() => {
        const bookId = params.id
        getCoverById(bookId)
    })

    async function getPagesById(id) {
        const pagesUrl = `${process.env.REACT_APP_ND_API_HOST}/pages`;
        const response = await fetch(pagesUrl);
        let data = await response.json();
        data = data.filter((item, index) => {
            return +item.coverID === +id
        })
        setNumOfPapers(data);
    }
    useEffect(() => {
        const bookId = params.id
        getCoverById(bookId)
        getPagesById(bookId)
    })

    return (
        <div className="App">
            <div className='book-container'>
                <div className="buttons">
                <button id="prev-btn" ref={preButton} onClick={goPrevPage}>
                    <h1 className='pt'>{'previous'}</h1>
                    <h1 className='cm'>{'<'}</h1>
                    <i className="fas fa-arrow-circle-left"></i>
                </button>
                </div>
                <div id="book" className="book" ref={book}>
                    {coverPaper.map((item, index) => {
                        return (
                            <div style={{ zIndex: numOfPapers.length - index + 1 }} className="paper" key={item.ID} ref={papers[index]}>
                                <div className="front">
                                    <div className='text'>
                                    </div>
                                    <img className='coverImg' src={item.cover_image_url} alt="cover_image_url"/>
                                </div>
                                <div className="back">
                                </div>
                            </div>
                        )
                    })}
                    {numOfPapers.map((item, index) => {
                        return (
                            <div style={{ zIndex: numOfPapers.length - index }} className="paper" key={index} ref={papers[index + 1]}>
                                <div className="front">
                                    <br/>
                                    <div><img className="headerMenuEntryImg" src={item.page_image_url} alt="page_image_url"/></div>
                                    <div className='button-2'>{item.text}</div>
                                    {/* <div className="button-2">
                                        {item.text}
                                        <button
                                            className="speak-button"
                                            onClick={() => {
                                                setIsPlaying(!isPlaying);
                                                if (!isPlaying) {
                                                    speak(item.text);
                                                } else {
                                                    synth.cancel();
                                                }
                                            }}
                                        >
                                            {isPlaying ? "Stop" : "Speak"}
                                        </button>
                                    </div> */}
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
                <div className="buttons">
                <button id="next-btn" ref={nextButton} onClick={goNextPage}>
                    <h1 className='pt'>{'next'}</h1>
                    <h1 className='cm'>{'>'}</h1>
                    <i className="fas fa-arrow-circle-right"></i>
                </button>
                </div>
            </div>
        </div>
    )
}

export default BookDetail
