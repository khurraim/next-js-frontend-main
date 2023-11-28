import React, { useState } from "react";
import Admin from "../layouts/Admin";
import axios from "axios";
import { toast } from 'react-toastify';

function AddSocialIcons() {

    // States
    const [socialIcons, setSocialIcons] = useState({
        name: '',
        link: ''
    });
    const [validationError, setValidationError] = useState(''); 

    const handleSocialChange = (e) => {
        setSocialIcons({ ...socialIcons, name: e.target.value });
    };

    const handleLinkChange = (e) => {
        setSocialIcons({ ...socialIcons, link: e.target.value });
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        // Validation
        if (!socialIcons.name || !socialIcons.link) {
            setValidationError('Both fields are required.');
            toast.error('Both fields are required.');
            return;
        }

        try {
            // Make a POST request to save the social icon
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/social-icons`, socialIcons);

            // Optionally, show a success message
            toast.success('Social Icon added successfully');

            // Empty the form
            setSocialIcons({
                name: '',
                link: ''
            });

        } catch (error) {
            console.error('Error adding social icon:', error);
            // Optionally, show an error message
            toast.error('Error adding social icon');
        }
    };

    return (
        <Admin>
            <div className="container-fluid my-5">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title text-left">Add Social Icons</h3>
                    </div>
                    <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Select Social Media</label>
                            <select className="form-control" onChange={handleSocialChange}>
                                <option value="Facebook">Facebook</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Twitter">Twitter</option>
                                <option value="Pinterest">Pinterest</option>
                                <option value="Snapchat">Snapchat</option>
                                <option value="Linkedin">Linkedin</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Enter Link</label>
                            <input type="text" className="form-control" placeholder="Enter Link...." onChange={handleLinkChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </Admin>
    )
}

export default AddSocialIcons;
