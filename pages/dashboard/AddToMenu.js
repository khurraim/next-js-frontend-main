import React, { useState, useEffect } from "react";
import axios from 'axios'
import Admin from "../layouts/Admin";
import { toast } from 'react-toastify'

const AddToMenu = () => {
    const [menu, setMenu] = useState({
        'title': '',
        'page_id': ''
    });

    const [pages, setPages] = useState([]);

    useEffect(() => {
        // Fetch categories when the component mounts
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages`)
            .then((response) => {
                setPages(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });

    }, []);

    const handleChange = (e) => {
        // Update the state with the input's value
        setMenu({ ...menu, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!menu.title || !menu.page_id) {
            toast.error('Title and Page are required');
            return;
        }

        // Make a POST request to the Laravel endpoint
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/menu`, menu)
            .then((response) => {
                console.log(response.data);
                toast.success('Menu item added successfully');
                // Reset the form
                setMenu({ 'title': '', 'page_id': '' });
            })
            .catch((error) => {
                console.error('Error adding menu item:', error);
                toast.error('Error adding menu item');
            });
    };

    return (
        <Admin>
            <div className="container-fluid my-5">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title text-center">Add To Menu</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Menu Item Name"
                                    name="title"
                                    value={menu.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Select a Page</label>
                                <select
                                    className="form-control"
                                    name="page_id"
                                    value={menu.page_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a Page</option>
                                    {pages.map((page) => (
                                        <option key={page.id} value={page.id}>
                                            {page.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Admin>
    )
}

export default AddToMenu;








