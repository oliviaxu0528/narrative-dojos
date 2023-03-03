import { useState, createRef, useEffect } from 'react'
import { message, Button, Modal, Form, Input } from 'antd'
import './App.css'
import { useParams, useNavigate } from "react-router-dom";

let currentLocation = 1
function CreatePages() {
  // book list
  let [numOfPapers, setNumOfPapers] = useState([])
  // cover
  let [coverPaper, setCoverPaper] = useState([])
  // box
  let [isModalOpen, setIsModelOpen] = useState(false)
  const [page_image_url, setPage_image_url] = useState('')
  const [text, setText] = useState('')
  const form = createRef()
  let papers = numOfPapers.map((item, index) => {
    return createRef()
  })
  papers.unshift(createRef())
  let maxLocation = numOfPapers.length + 2;
  const preButton = createRef()
  const params = useParams()
  const navigate = useNavigate()
  const nextButton = createRef()
  const book = createRef()
  // open the book
  const openBook = function () {
    book.current.style.transform = "translateX(50%)";
    preButton.current.style.transform = "translateX(-180px)";
    nextButton.current.style.transform = "translateX(180px)";
  }
  // close the book
  const closeBook = function (isAtBeginning) {
    if (isAtBeginning) {
      book.current.style.transform = "translateX(0%)";
    } else {
      book.current.style.transform = "translateX(100%)";
    }
    preButton.current.style.transform = "translateX(0px)";
    nextButton.current.style.transform = "translateX(0px)";
  }
  // next page
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
  // 上一页
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
  async function getCoverById(id) {
    const coverUrl = `${process.env.REACT_APP_ND_API_HOST}/covers/${id}`;
    const response = await fetch(coverUrl);
    const obj = await response.json();
    const data = [obj]
    setCoverPaper(data);
  }
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
    if (currentLocation > 1) {
      for (let i = 1; i < currentLocation; i++) {
        if (papers[i - 1] && papers[i - 1].current) {
          papers[i - 1].current.style.zIndex = i;
        }
      }
      if (currentLocation === numOfPapers.length) {
        book.current.style.transform = "translateX(50%)";
        preButton.current.style.transform = "translateX(-180px)";
        nextButton.current.style.transform = "translateX(180px)";
      }
    }
  }, [])
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
  const onFinish = async (values) => {
    if (values) {
      // let currentTime = new Date()
      // let year = currentTime.getFullYear()
      // let month = currentTime.getMonth()
      // let day = currentTime.getDay()
      // values.createTime = `${year}-${month}-${day}`
      // const arr = [...numOfPapers]
      // arr.push(values)
      // papers = arr.map((item, index) => {
      //   return createRef()
      // // })
      // setNumOfPapers(arr)
      // message.success({
      //   content: 'successfully added',
      //   duration: 1
      // })
      const data = {}
      data.page_image_url = values.page_image_url
      data.text = values.text
      data.coverID = params.id
      const url = `${process.env.REACT_APP_ND_API_HOST}/pages`;
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        // setPage_image_url('');
        // setText('');
        // navigate('/accounts/covers')
        getPagesById(params.id)
      }
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
        <Button type='primary' href="#" className='btn' onClick={addPage}>Add a page</Button>
        <Button type='primary' className='btn-secondary' onClick={decreasePage}>Delete current page</Button>
      </div>
      <div className='book-container'>
        <button id="prev-btn" ref={preButton} onClick={goPrevPage}>
          <h1 className='pt'>{'previous'}</h1>
          <h1 className='cm'>{'<'}</h1>
          <i className="fas fa-arrow-circle-left"></i>
        </button>
        <div id="book" className="book" ref={book}>
          {coverPaper.map((item, index) => {
            return (
              <div style={{ zIndex: numOfPapers.length - index + 1 }} className="paper" key={item.ID} ref={papers[index]}>
                <div className="front">
                  <img src={item.cover_image_url} width="350px" height="500px"/>
                  <div>{item.title}</div>
                  <div>{item.username}</div>
                  <div>{item.created_on}</div>
                </div>
                <div className="back">
                  {/* <div>cover-back</div> */}
                </div>
              </div>
            )
          })}
          {numOfPapers.map((item, index) => {
            return (
              <div style={{ zIndex: numOfPapers.length - index }} className="paper" key={index} ref={papers[index + 1]}>
                <div className="front">
                  <h1></h1>
                  <div><img className="headerMenuEntryImg" src={item.page_image_url} /></div>
                  <div className='button-2'>{item.text}</div>
                </div>
                <div className="back">
                  <div id={'b' + (index + 1)} className="back-content">
                    <h1>{`page${index + 1}`}</h1>
                    {/* <h1><img className="headerMenuEntryImg" src={item.page_image_url} /></h1> */}
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
            label="page_image_url"
            name="page_image_url"
            rules={[
              {
                required: true,
                message: 'the page_image_url cannot be empty',
              },
            ]}
            className='card-item'
          >
            <Input />
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

export default CreatePages
