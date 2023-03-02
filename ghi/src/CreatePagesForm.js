import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function CreateCover() {
    const navigate = useNavigate()


    const [page_image_url, setPage_image_url] = useState('')
    const [text, setText] = useState('')


    const handlepageImageUrlChange = (event) => {
        const value = event.target.value
        setPage_image_url(value)
    }

    const handleTextChange = (event) => {
        const value = event.target.value
        setText(value)
    }



    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}

        data.page_image_url = page_image_url
        data.text = text

        const url = `${process.env.REACT_APP_ND_API_HOST}/book?ID=${id}`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setPage_image_url('');
            setText('');

            navigate('/account')
        }
        console.log(data)
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2 className="text-center">Create a Book Cover</h2>
                    <form onSubmit={handleSubmit} id="add-createabook-form">
                        <div className="form-floating mb-3">
                            <input onChange={handlepageImageUrlChange} value={page_image_url} placeholder="page_image_url" required type="text" name="page_image_url" className="form-control" />
                            <label htmlFor="page_image_url">Page Image Url</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleTextChange} value={text} placeholder="text" required type="text" name="text" className="form-control" />
                            <label htmlFor="text">Text</label>
                        </div>

                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
