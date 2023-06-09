import { useState, createRef, useEffect } from 'react'
import { message, Button, Modal, Form, Input } from 'antd'
import './App.css'
import { useParams, Link } from "react-router-dom";

let currentLocation = 1
function CreatePages() {
  let [numOfPapers, setNumOfPapers] = useState([])
  let [coverPaper, setCoverPaper] = useState([])
  let [isModalOpen, setIsModelOpen] = useState(false)

  const [page_image_url, setPage_image_url] = useState('')
  const [useApi, setUseApi] = useState(false);
  const [apiPrompt, setApiPrompt] = useState('')
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedPreviewImageIndex, setSelectedPreviewImageIndex] = useState(null);
  const [, setText] = useState('')

  const form = createRef()
  let papers = numOfPapers.map((item, index) => {
    return createRef()
  })

  papers.unshift(createRef())
  let maxLocation = numOfPapers.length + 2;
  const preButton = createRef()
  const params = useParams()
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

  const handleApiCheckboxChange = (event) => {
    const value = event.target.checked;
    setUseApi(value);
  };

  const handleApiPromptChange = (event) => {
    const value = event.target.value
    setApiPrompt(value)
  }

  const handlePreviewImageSelect = (index) => {
    setSelectedPreviewImageIndex(index);
    setPage_image_url(previewImages[index]);
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
    const coverUrl = `${process.env.REACT_APP_ND_API_HOST}/cover/${id}`;
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function addPage() {
    setIsModelOpen(true)
  }

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

  const handleApiPromptSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKey = "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";
      const prompt = apiPrompt;
      const response = await fetch(`https://api.openai.com/v1/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          "model": "image-alpha-001",
          "prompt": prompt,
          "n": 3,
          "size": "256x256",
          "response_format": "url"
        })
      });
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setPreviewImages(data.data);
      } else {
        console.error('Image URL not present in API response:', data);
      }
    } catch (error) {
      console.error('Error fetching image from API:', error);
    }
  };

  const onFinish = async (values) => {
    if (values) {
      const data = {}
      data.page_image_url = values.page_image_url
      data.text = values.text
      data.coverID = params.id

      if (useApi && selectedPreviewImageIndex !== null) {
        data.page_image_url = previewImages[selectedPreviewImageIndex].url;
      } else {
        data.page_image_url = page_image_url;
      }

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

        getPagesById(params.id)
      }
    }
    form.current.resetFields()
    setIsModelOpen(false)
    setApiPrompt('')
    setPreviewImages('')
    setText('')
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
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center" type="primary">
        <Link to="/accounts/covers" className="btn btn-primary btn-lg px-4 gap-3" >
          Publish
        </Link>
      </div>
      <div className='book-container'>
        <div className="buttons">
          <button id="prev-btn" ref={preButton} onClick={goPrevPage}>
            <h1 className='pt'>{'previous'}</h1>
            <i className="fas fa-arrow-circle-left"></i>
          </button>
        </div>
        <div id="book" className="book" ref={book}>
          {coverPaper.map((item, index) => {
            return (
              <div style={{ zIndex: numOfPapers.length - index + 1 }} className="paper" key={item.ID} ref={papers[index]}>
                <div className="front">
                  <img src={item.cover_image_url} width="425px" height="680px" alt="cover_image_url" />
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
                  <br />
                  <div><img className="headerMenuEntryImg" src={item.page_image_url} alt="page_image_url" /></div>
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
        <div className="buttons">
          <button id="next-btn" ref={nextButton} onClick={goNextPage}>
            <h1 className='pt'>{'next'}</h1>
            <i className="fas fa-arrow-circle-right"></i>
          </button>
        </div>
      </div>
      <Modal title="Adding a Page" open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="useApiCheckbox"
            checked={useApi}
            onChange={handleApiCheckboxChange}
          />
          <label className="form-check-label" htmlFor="useApiCheckbox">
            Use API instead of Image URL
          </label>
        </div>
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
          {useApi && (
            <div className="form-floating mb-3">
              <input
                onChange={handleApiPromptChange}
                value={apiPrompt}
                placeholder="Image prompt"
                required
                type="text"
                name="apiPrompt"
                className="form-control"
              />
              <label htmlFor="apiPrompt">Image prompt</label>
              <button className="btn btn-primary mt-2" onClick={handleApiPromptSubmit}>Submit Image Prompt</button>
            </div>
          )}
          {!useApi && (
            <div className="form-floating mb-3">
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
            </div>
          )}
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
              Add page
            </Button>
          </Form.Item>
        </Form>
        {previewImages.length > 0 && (
          <div className="mb-3">
            <h4>Choose one of the following preview images:</h4>
            <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
              {previewImages.map((previewImageUrl, index) => (
                <div key={index}>
                  <img
                    src={previewImageUrl.url}
                    alt={`Preview ${index + 1}`}
                    style={{ width: "100%" }}
                    onError={(e) => {
                      console.log(`Error loading image at URL: ${previewImageUrl}`);
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => handlePreviewImageSelect(index)}
                  >
                    Choose
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CreatePages
