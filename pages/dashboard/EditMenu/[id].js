import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import Admin from "../../layouts/Admin";
import {toast} from 'react-toastify';

const EditHeaderMenu = () => {
    const router = useRouter();
    const { id } = router.query; // Retrieve the ID from the URL parameter

    const [menu, setMenu] = useState({
        'title': '',
        'page_id': ''
    });

    const [pages, setPages] = useState([]);

    useEffect(() => {
        if (id) {
            // Fetch menu item data by ID when the component mounts
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/${id}`)
                .then((response) => {
                    //setMenu(response.data);
                    setMenu({
                        ...response.data,
                        page_id: response.data.page_id.toString(), // Convert to string if it's not already
                    });
                })
                .catch((error) => {
                    console.error('Error fetching menu item:', error);
                });
        }

        // Fetch pages for populating the dropdown
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages`)
            .then((response) => {
                setPages(response.data);
            })
            .catch((error) => {
                console.error('Error fetching pages:', error);
            });

    }, [id]);

    const handleChange = (e) => {
        // Update the state with the input's value
        setMenu({ ...menu, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!menu.title || !menu.page_id) {
            toast.error('Title and Page are required'); // You can replace this with your preferred error handling or use a library like 'react-toastify' for error messages.
            return;
        }

        // Make a PUT request to update the menu item
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/menu/${id}`, menu)
            .then((response) => {
                console.log(response.data);
                // Redirect to the menu list or another page upon success
                router.push('/dashboard/ViewMenu');
            })
            .catch((error) => {
                console.error('Error updating menu item:', error);
            });
    };

    return (
        <Admin>
            <div className="container-fluid my-5">
                <h2>Edit Menu Item</h2>
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
                            {/* <option value="">Select a Page</option> */}
                            {pages.map((page) => (
                                <option  key={page.id} value={page.id}>
                                    {page.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
            </div>
        </Admin>
    );
}

export default EditHeaderMenu;
