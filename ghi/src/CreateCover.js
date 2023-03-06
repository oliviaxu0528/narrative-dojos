import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'



export default function CreateCover(props) {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('')
    const [cover_image_url, setCover_image_url] = useState('')
    const [useApi, setUseApi] = useState(false);
    const [created_on, setCreated_on] = useState('')


    const [apiPrompt, setApiPrompt] = useState('')
    const [previewImageUrl, setPreviewImageUrl] = useState("");

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

    // useEffect(() => {
    //     const username = localStorage.getItem('username')
    //     setUsername(username)
    // }, [])
    const handleApiPromptSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiResponse = await fetch('https://dezgo.p.rapidapi.com/text2image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': '3882bcd6dbmsh144af657249d02cp1bcbc7jsn04651cb74a72',
                    'x-rapidapi-host': 'dezgo.p.rapidapi.com'
                },
                body: JSON.stringify({
                    prompt: apiPrompt,
                    guidance: '7',
                    steps: '30',
                    sampler: 'euler_a',
                    upscale: '1',
                    negative_prompt: 'ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, blurry, bad anatomy, blurred, watermark, grainy, signature, cut off, draft',
                    model: 'epic_diffusion_1_1'
                })
            });
            const data = await apiResponse.json();
            if (data.status === 'success') {
                setPreviewImageUrl(data.output_url);
            } else {
                // Handle case where image URL is not present in response
                console.error('Image URL not present in Dezgo API response:', data);
            }
        } catch (error) {
            console.error('Error fetching image from Dezgo API:', error);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.username = username
        data.title = title
        data.cover_image_url = cover_image_url
        data.created_on = created_on

        if (useApi) {
            await handleApiPromptSubmit(event);
            data.cover_image_url = previewImageUrl;
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
        // console.log(msg)

        // console.log(fetchConfig)
        if (response.ok) {

            setTitle('');
            setUsername('');
            setCover_image_url('');
            setCreated_on('');
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
                        {/* Only render the cover_image_url input if the user is not using the API */}
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
                    {previewImageUrl && <img src={previewImageUrl} alt="Preview" className="mt-3" />}
                </div>
            </div>
        </div>
    );
}
// }
