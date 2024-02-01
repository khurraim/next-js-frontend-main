import React, { useState } from "react";
import Admin from "../layouts/Admin";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';

function AddSocialIcons() {
    
    const solidIcons = Object.keys(SolidIcons).map((icon) => ({ name: icon, icon: SolidIcons[icon] }));
    const brandIcons = Object.keys(BrandIcons).map((icon) => ({ name: icon, icon: BrandIcons[icon] }));

    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleIconClick = (icon) => {
      setSelectedIcon(icon);
      console.log("***********");
      console.log(icon);
      console.log("***********");
    };

    // States
    const [socialIcons, setSocialIcons] = useState({
        name: '',
        link: '',
        icon_class: '', // Added icon_class to hold the selected icon's name
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

        // Validate link format
        if (!socialIcons.link.startsWith('https://')) {
            setValidationError('Link should start with "https://".');
            toast.error('Link should start with "https://".');
            return;
        }

        try {
            // Set the icon_class to the selected icon's name
            setSocialIcons({ ...socialIcons, icon_class: selectedIcon?.name || '' });

            // Make a POST request to save the social icon
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/social-icons`, socialIcons);

            // Optionally, show a success message
            toast.success('Social Icon added successfully');

            // Empty the form
            setSocialIcons({
                name: '',
                link: '',
                icon_class: '', // Clear icon_class after submitting
            });
            setSelectedIcon(null); // Clear selected icon

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
                                <input type="text" className="form-control" placeholder="Enter Name" onChange={handleSocialChange}/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Enter Link</label>
                                <input type="text" className="form-control" placeholder="Enter Link...." onChange={handleLinkChange} />
                            </div>
                            {selectedIcon && (
                                <div className="mt-3">
                                    <FontAwesomeIcon icon={selectedIcon.icon} size="3x" className="selected-icon" />
                                    <p className="mt-2">Selected Icon: {selectedIcon.name}</p>
                                    
                                </div>
                            )}
                            <div className="icon-container card d-flex flex-wrap" style={{ width: '1440px', height: '400px', overflowY: 'auto' }}>
                                {[...solidIcons, ...brandIcons].map((item, index) => (
                                    <div
                                    key={index}
                                    className={`icon-item ${selectedIcon && selectedIcon.name === item.name ? 'text-primary' : ''}`}
                                    onClick={() => handleIconClick(item)}
                                    >
                                    <FontAwesomeIcon icon={item.icon} size="4x" className="icon m-2" />
                                    </div>
                                ))}
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
