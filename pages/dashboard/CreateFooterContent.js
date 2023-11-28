import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from '../layouts/Admin';
import { toast } from 'react-toastify';

function CreateFooterContent() {
    const [copyrightText, setCopyrightText] = useState('');
    const [footerImage, setFooterImage] = useState(null);

    const handleImageChange = (e) => {
        // Handle changes to the footer image input
        const file = e.target.files[0];
        setFooterImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to send the form data including the image
        const formData = new FormData();
        formData.append('copyright_text', copyrightText);
        if (footerImage) {
            formData.append('footer_image', footerImage);
        }

        try {
            // Make a POST request to your API endpoint to create or update footer content
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/footerContent`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file upload
                },
            });

            // Display a success message
            toast.success('Footer content created successfully');

            // Clear form fields
            setCopyrightText('');
            setFooterImage(null);
        } catch (error) {
            console.error('Error creating footer content:', error);
            toast.error('Error creating footer content');
        }
    };

    return (
        <Admin>
            <div className="container-fluid my-5">
                <h2>Create Footer Content</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="copyrightText">Copyright Text</label>
                        <input
                            type="text"
                            id="copyrightText"
                            className="form-control"
                            value={copyrightText}
                            onChange={(e) => setCopyrightText(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="footerImage">Footer Image</label>
                        <input
                            type="file"
                            id="footerImage"
                            className="form-control-file"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Admin>
    );
}

export default CreateFooterContent;
