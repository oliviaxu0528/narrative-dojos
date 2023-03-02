import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function CreateCover() {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [username, setUsername] = useState('')
    const [cover_image_url, setCover_image_url] = useState('')
    const [created_on, setCreated_on] = useState('')

    const handleTitleChange = (event) => {
        const value = event.target.value
        setTitle(value)
    }

    const handleUsernameChange = (event) => {
        const value = event.target.value
        setUsername(value)
    }

    const handleImageChange = (event) => {
        const value = event.target.value
        setCover_image_url(value)
    }

    const handleCreateOnChange = (event) => {
        const value = event.target.value
        setCreated_on(value)
    }



    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.title = title
        data.username = username
        data.cover_image_url = cover_image_url
        data.created_on = created_on

        const url = `${process.env.REACT_APP_ND_API_HOST}/covers`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setTitle('');
            setUsername('');
            setCover_image_url('');
            setCreated_on('');
            navigate('/createpages')
        }
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2 className="text-center">Create a Book Cover</h2>
                    <form onSubmit={handleSubmit} id="add-createabook-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleTitleChange} value={title} placeholder="Title" required type="text" name="title" className="form-control" />
                            <label htmlFor="title">Title</label>
                        </div>
                        {/* <div className="form-floating mb-3">
                            <input onChange={handleUsernameChange} value={username} placeholder="Username" required type="text" name="username" className="form-control" />
                            <label htmlFor="username">Author</label>
                        </div> */}
                        <div className="form-floating mb-3">
                            <input onChange={handleImageChange} value={cover_image_url} placeholder="cover_image_url" required type="text" name="cover_image_url" className="form-control" />
                            <label htmlFor="cover_image_url">Image url</label>
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
