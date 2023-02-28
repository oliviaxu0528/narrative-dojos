import { useState, createRef, useEffect } from 'react'
import {message, Button, Modal, Form, Input} from 'antd'
import './App.css'

let currentLocation = 1
function CreateABook() {
  let [numOfPapers, setNumOfPapers] = useState([
    {
      title: 'Front 1',
      author: 'back 1',
      // image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcUrWLoIuv7jfJFobDu7UVM4agZiqwpym2Vw&usqp=CAU',
      image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJC91-VQ6TBtIWHuYNrDmMH6w_50V5EcxI2A&usqp=CAU',
      created_on: '',
      text: 'Beauty is something wonderful and strange that the artist fashions out of the chaos of the world in the torment of his soul. And when he has made it, it is not given to all to know it. To recognize it you must repeat the adventure of the artist.'

    },
    {
      title: 'Front 2',
      author: 'back 2',
      image_url: 'data:image/jpeg;base64,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',
      text: 'It is one of the defects of my character that I cannot altogether dislike anyone who makes me laugh. ― W. Somerset Maugham'
    },
    {
      title: 'Front 3',
      author: 'back 3',
      image_url: 'https://img0.baidu.com/it/u=1494073763,1059706783&fm=253&fmt=auto&app=138&f=JPEG?w=771&h=500',
      created_on: '',
      text:   'The writer is more concerned to know than to judge. ― W. Somerset Maugham'


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
  // adding
  function addPage() {
  setIsModelOpen(true)

  }
  // deleting
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
      content: 'successfully deleted',
      duration: 1
    })
  }
  // submitting
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
        content: 'successfully added',
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
      {/* <div className='setting-container'> */}
      <div className='setting-container'>
{/* () => addPage({title: '123', author: '123'}) */}
        <Button type='primary'href="#" className='btn' onClick={addPage}>Adding</Button>
        <Button type='primary' className='btn-secondary' onClick={decreasePage}>Deleting</Button>
      </div>
      {/* </div> */}
      <div className='book-container'>
        <button id="prev-btn" ref={preButton} onClick={goPrevPage}>

          <h1 className='pt'>{'previous'}</h1>

          <h1 className='cm'>{'<'}</h1>
          <i className="fas fa-arrow-circle-left"></i>
        </button>
        <div id="book" className="book" ref={book}>
          {numOfPapers.map((item, index) => {
            return (
              <div style={{zIndex: numOfPapers.length - index}} className="paper" key={index} ref={papers[index]}>
                <div className="front">

                  {/* <div>title:{item.title}</div> */}
                  {/* <div>author:{item.author}</div> */}
                  {/* <div className='card-item'>image_url:{item.image_url}</div> */}
                  <h1>      </h1>
                  <div><img className="headerMenuEntryImg" src={item.image_url}/></div>

                  {/* <div>createTime:{item.createTime}</div> */}
                  <div className='button-2'>{item.text}</div>
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
          <h1 className='pt'>{'next'}</h1>
          <h1 className='cm'>{'>'}</h1>

          <i className="fas fa-arrow-circle-right"></i>
        </button>
      </div>
      <Modal title="Adding a Page" open={isModalOpen} onCancel={handleCancel} footer={[]}>
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
                message: ' the title cannot be empty',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="author"
            name="author"
            rules={[
              {
                required: true,
                message: 'the author cannot be empty',
              },
            ]}
          >
            <Input />
          </Form.Item>
           <Form.Item
          label="image_url"
          name="image_url"
          rules={[
            {
              required: true,
              message: 'the image_url cannot be empty',
            },
          ]}
          className='card-item'
        >
          <Input/>
        </Form.Item>

          <Form.Item
            label="text (0-54 words)"
            name="text"
            rules={[
              {
                required: true,
                message: ' the text cannot be empty',
              },
            ]}
          >
            <Input />
        </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Publish
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateABook