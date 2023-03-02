import { useState, createRef, useEffect } from 'react'
import {message, Button, Modal, Form, Input} from 'antd'
import './App.css'

let currentLocation = 1
function CreatePages() {

  let [numOfPapers, setNumOfPapers] = useState([
    {
      title: '',
      author: '',
      page_image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJC91-VQ6TBtIWHuYNrDmMH6w_50V5EcxI2A&usqp=CAU',
      created_on: '',
      text: 'Add text here'

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
        <Button type='primary'href="#" className='btn' onClick={addPage}>Add a page</Button>
        <Button type='primary' className='btn-secondary' onClick={decreasePage}>Delete current page</Button>
        <Button className="btn btn-primary">Publish</Button>

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
                  <h1></h1>
                  <div><img className="headerMenuEntryImg" src={item.page_image_url}/></div>

                  {/* <div>createTime:{item.createTime}</div> */}
                  <div className='button-2'>{item.text}</div>
                </div>
                <div className="back">
                  <div id={'b'+ (index + 1)} className="back-content">
                    <h1>{`page${index+1}`}</h1>
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
          {/* <Form.Item
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
          </Form.Item> */}
           <Form.Item
          label="image_url"
            name="page_image_url"
          rules={[
            {
              required: true,
              message: 'the page_image_url cannot be empty',
            },
          ]}
          className='card-item'
        >
          <Input/>
        </Form.Item>

          <Form.Item
            label="text"
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

export default CreatePages
