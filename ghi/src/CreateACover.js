import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function CreateACover() {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [image_url, setImage_url] = useState('')
    const [created_on, setCreated_on] = useState('')

    const handleTitleChange = (event) => {
        const value = event.target.value
        setTitle(value)
    }

    const handleAuthorChange = (event) => {
        const value = event.target.value
        setAuthor(value)
    }

    const handleImageChange = (event) => {
        const value = event.target.value
        setImage_url(value)
    }

    const handleCreateOnChange = (event) => {
        const value = event.target.value
        setCreated_on(value)
    }



    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.title = title
        data.author = author
        data.image_url = image_url
        data.created_on = created_on

        const url = `${process.env.REACT_APP_ND_API_HOST}/books`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            navigate('/createpages')
            setTitle('');
            setAuthor('');
            setImage_url('');
            setCreated_on('');

        }
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2 className="text-center">Create a Book Cover</h2>
                    <form onSubmit={handleSubmit} id="add-createpages-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleTitleChange} value={title} placeholder="Title" required type="text" name="title" className="form-control" />
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleAuthorChange} value={author} placeholder="Author" required type="text" name="author" className="form-control" />
                            <label htmlFor="author">Author</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleImageChange} value={image_url} placeholder="Image_url" required type="text" name="image_url" className="form-control" />
                            <label htmlFor="image_url">Image url</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea onChange={handleCreateOnChange} value={created_on} placeholder="CreatedOn" required type="datetime-local" name="created_on" className="form-control" />
                            <label htmlFor="created_on">Created on (YYYY-MM-DD)</label>
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
