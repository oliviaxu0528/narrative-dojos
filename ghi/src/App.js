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


// import { useState, createRef } from 'react'
// import './App.css'

// let currentLocation = 1
// function App() {
//   let [numOfPapers, setNumOfPapers] = useState([
//     {
//       frontText: 'Front 1',
//       backFont: 'back 1'
//     },
//     {
//       frontText: 'Front 2',
//       backFont: 'back 2'
//     },
//     {
//       frontText: 'Front 3',
//       backFont: 'back 3'
//     }
//   ])
//   let papers = numOfPapers.map((item, index) => {
//     return createRef()
//   })
//   let maxLocation = numOfPapers.length + 1;
//   const preButton = createRef()
//   const nextButton = createRef()
//   const book = createRef()
//   const openBook = function() {
//     book.current.style.transform = "translateX(50%)";
//     preButton.current.style.transform = "translateX(-180px)";
//     nextButton.current.style.transform = "translateX(180px)";
//   }
//   const closeBook = function (isAtBeginning) {
//     if(isAtBeginning) {
//       book.current.style.transform = "translateX(0%)";
//     } else {
//       book.current.style.transform = "translateX(100%)";
//     }
//     preButton.current.style.transform = "translateX(0px)";
//     nextButton.current.style.transform = "translateX(0px)";
//   }
//   function goNextPage() {
//     if(currentLocation < maxLocation) {
//       if (currentLocation === 1) {
//         openBook()
//       }
//       papers[currentLocation - 1].current.classList.add("flipped");
//       papers[currentLocation - 1].current.style.zIndex = currentLocation;
//       if (currentLocation === numOfPapers.length) {
//         closeBook(false);
//       }
//       currentLocation++;
//     }
//   }

//   function goPrevPage() {
//     if (currentLocation > 1) {
//       if (currentLocation === 2) {
//         closeBook(true);
//       }
//       if (currentLocation === numOfPapers.length + 1) {
//         openBook();
//       }
//       papers[currentLocation - 2].current.classList.remove("flipped");
//       papers[currentLocation - 2].current.style.zIndex = numOfPapers.length - currentLocation + 2;
//       currentLocation--;
//     }
//   }
//   // 添加页
//   function addPage() {
//     const arr = [...numOfPapers]
//    arr.push({
//       frontText: `Front ${numOfPapers.length + 1}`,
//       backFont: `back  ${numOfPapers.length + 1}`
//     })
//     papers = arr.map((item, index) => {
//       return createRef()
//     })
//     setNumOfPapers(arr)
//   }
//   // 减少页
//   function decreasePage() {
//     const arr = [...numOfPapers]
//     arr.pop()
//     papers = arr.map((item, index) => {
//       return createRef()
//     })
//     setNumOfPapers(arr)
//   }
//   return (
//     <div className="App">
//       <div className='setting-container'>
//         <button onClick={addPage} className="add">Add a Page</button>
//         <button onClick={decreasePage} className="add">Delete a Page</button>
//       </div>
//       <div className='book-container'>
//         <button id="prev-btn" ref={preButton} onClick={goPrevPage} className="arrow">
//           <h1>{'<'}</h1>

//           <i className="fas fa-arrow-circle-left"></i>
//         </button>
//         <div id="book" className="book" ref={book}>
//           {numOfPapers.map((item, index) => {
//             return (
//               <div style={{zIndex: numOfPapers.length - index}} className="paper" key={index} ref={papers[index]}>
//                 <div className="front">
//                   <div id={'f'+ (index + 1)} className="front-content">
//                     <h1>{item.frontText}</h1>
//                   </div>
//                 </div>
//                 <div className="back">
//                   <div id={'b'+ (index + 1)} className="back-content">
//                     <h1>{item.backFont}</h1>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//         <button id="next-btn" ref={nextButton} onClick={goNextPage} className="arrow">
//           <h1>{'>'}</h1>
//           <i className="fas fa-arrow-circle-right"></i>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default App

import { useState, createRef, useEffect } from 'react'
import {message, Button, Modal, Form, Input} from 'antd'
import './App.css'

let currentLocation = 1
function App() {
  let [numOfPapers, setNumOfPapers] = useState([
    {
      title: 'Front 1',
      author: 'back 1',
      createTime: ''
    },
    {
      title: 'Front 2',
      author: 'back 2',
      createTime: ''
    },
    {
      title: 'Front 3',
      author: 'back 3',
      createTime: ''
    }
  ])
  let [isModalOpen, setIsModelOpen] = useState(false)
  const form = createRef()
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
    console.log(123)

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
    if (currentLocation > 1) {
      for (let i = 1; i < currentLocation; i++) {
        if (papers[i-1] && papers[i-1].current) {
          papers[i-1].current.style.zIndex = i;
        }
      }
      if (currentLocation === numOfPapers.length) {
        book.current.style.transform = "translateX(50%)";
        preButton.current.style.transform = "translateX(-180px)";
        nextButton.current.style.transform = "translateX(180px)";
      }
    }
  }, [numOfPapers])
  // 添加页
  function addPage() {
    setIsModelOpen(true)
  }
  // 减少页
  function decreasePage() {
    const arr = [...numOfPapers]
    arr.pop()
    if (currentLocation === numOfPapers.length + 1) currentLocation--
    if (currentLocation === numOfPapers.length) {
      book.current.style.transform = "translateX(100%)";
      preButton.current.style.transform = "translateX(0px)";
      nextButton.current.style.transform = "translateX(0px)";
    }
    papers = arr.map((item, index) => {
      return createRef()
    })
    setNumOfPapers(arr)
    message.success({
      content: '删减成功',
      duration: 1
    })
  }
  const onFinish = (values) => {
    if (values) {
      let currentTime = new Date()
      let year = currentTime.getFullYear()
      let month = currentTime.getMonth()
      let day = currentTime.getDay()
      values.createTime = `${year}-${month}-${day}`
      const arr = [...numOfPapers]
      arr.push(values)
      papers = arr.map((item, index) => {
        return createRef()
      })
      setNumOfPapers(arr)
      message.success({
        content: '添加成功',
        duration: 1
      })
    }
    form.current.resetFields()
    setIsModelOpen(false)
  }

  const handleCancel = () => {
    form.current.resetFields()
    setIsModelOpen(false)
  }
  const onFinishFailed = () => {
    message.error({
      content: 'Input cannot be null',
      duration: 1
    })
  }
  return (
    <div className="App">
      <div className='setting-container'>
        <Button type='primary' onClick={() => addPage({title: '123', author: '123'})}>Adding</Button>
        <Button type='primary' onClick={decreasePage}>Deleting</Button>
      </div>
      <div className='book-container'>
        <button id="prev-btn" ref={preButton} onClick={goPrevPage}>
          <h1>{'<'}</h1>

          <i className="fas fa-arrow-circle-left"></i>
        </button>
        <div id="book" className="book" ref={book}>
          {numOfPapers.map((item, index) => {
            return (
              <div style={{zIndex: numOfPapers.length - index}} className="paper" key={index} ref={papers[index]}>
                <div className="front">
                  {/*<div id={'f'+ (index + 1)} className="front-content">*/}
                  {/*  <span>title:{item.title}</span>*/}
                  {/*  <span>author:{item.author}</span>*/}
                  {/*  <span>createTime:{item.createTime}</span>*/}
                  {/*</div>*/}
                  <div>title:{item.title}</div>
                  <div>author:{item.author}</div>
                  <div>createTime:{item.createTime}</div>
                </div>
                <div className="back">
                  <div id={'b'+ (index + 1)} className="back-content">
                    <h1>{`back${index+1}`}</h1>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <button id="next-btn" ref={nextButton} onClick={goNextPage}>
          <h1>{'>'}</h1>
          <i className="fas fa-arrow-circle-right"></i>
        </button>
      </div>
      <Modal title="add book" open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <Form
          ref={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="title"
            name="title"
            rules={[
              {
                required: true,
                message: 'title不能为空',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="author"
            name="author"
            rules={[
              {
                required: true,
                message: 'author不能为空',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default App