import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


export default function CreateCover() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('')
    const [cover_image_url, setCover_image_url] = useState('')
    const [useApi, setUseApi] = useState(false);
    const [created_on, setCreated_on] = useState('')
    const [apiPrompt, setApiPrompt] = useState('')
    const [previewImages, setPreviewImages] = useState([]);
    const [selectedPreviewImageIndex, setSelectedPreviewImageIndex] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem('username')
        console.log(username)
        setUsername(username)
    }, [])

    const handleTitleChange = (event) => {
        const value = event.target.value
        setTitle(value)
    }

    const handleApiCheckboxChange = (event) => {
        const value = event.target.checked;
        setUseApi(value);
    };

    const handleApiPromptChange = (event) => {
        const value = event.target.value
        setApiPrompt(value)
    }

    const handleImageChange = (event) => {
        const value = event.target.value
        setCover_image_url(value)
    }

    const handleCreateOnChange = (event) => {
        const value = event.target.value
        setCreated_on(value)
    }

    const handlePreviewImageSelect = (index) => {
        setSelectedPreviewImageIndex(index);
        setCover_image_url(previewImages[index]);
        console.log(previewImages[index])
    }

    const handleApiPromptSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiKey = "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";
            console.log(apiKey)
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
            console.log(data)
            if (data.data && data.data.length > 0) {
                setPreviewImages(data.data);
            } else {
                console.error('Image URL not present in API response:', data);
            }
        } catch (error) {
            console.error('Error fetching image from API:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.username = username
        data.title = title
        data.cover_image_url = cover_image_url
        data.created_on = created_on

        if (useApi && selectedPreviewImageIndex !== null) {
            data.cover_image_url = previewImages[selectedPreviewImageIndex].url;
            console.log(data.cover_image_url)
        } else {
            data.cover_image_url = cover_image_url;
        }

        const url = `${process.env.REACT_APP_ND_API_HOST}/covers`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        const msg = await response.json()
        console.log(fetchConfig)
        console.log(response)

        if (response.ok) {
            setTitle('');
            setUsername('');
            setCover_image_url('');
            setCreated_on('');
            setSelectedPreviewImageIndex("");
            setPreviewImages([]);
            navigate(`/createpages/${msg.ID}`)
        }
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2 className="text-center">Create a Book Cover</h2>
                    <form onSubmit={handleSubmit} id="add-createabook-form">
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
                        <div className="form-floating mb-3">
                            <input onChange={handleTitleChange} value={title} placeholder="Title" required type="text" name="title" className="form-control" />
                            <label htmlFor="title">Title</label>
                        </div>
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
                                <input
                                    onChange={handleImageChange}
                                    value={cover_image_url}
                                    placeholder="cover_image_url"
                                    required
                                    type="text"
                                    name="cover_image_url"
                                    className="form-control"
                                />
                                <label htmlFor="cover_image_url">Image url</label>
                            </div>
                        )}
                        <div className="form-floating mb-3">
                            <textarea onChange={handleCreateOnChange} value={created_on} placeholder="CreatedOn" required type="datetime-local" name="created_on" className="form-control" />
                            <label htmlFor="created_on">Created on (YYYY-MM-DD)</label>
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
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
                </div>
            </div>
        </div>
    );
}
