import React, { useState, useEffect } from "react";
import axios from 'axios';
import Admin from "../layouts/Admin";
import Link from "next/link";
import {toast} from 'react-toastify'

const ViewMenu = () => {
    const [menus, setMenus] = useState([]);
    const [pages, setPages] = useState({});

    useEffect(() => {
        // Fetch menus when the component mounts
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`)
            .then((response) => {
                setMenus(response.data);

                // Extract unique page IDs from menu items
                const pageIds = [...new Set(response.data.map(menu => menu.page_id))];

                // Fetch page titles for all unique page IDs
                pageIds.forEach(pageId => {
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}`)
                    //axios.get(`http://127.0.0.1:8000/api/pages/${pageId}`)
                        .then((pageResponse) => {
                            // Store page titles in the 'pages' state using page ID as the key
                            setPages(prevPages => ({
                                ...prevPages,
                                [pageId]: pageResponse.data.title,
                            }));
                        })
                        .catch((error) => {
                            console.error('Error fetching page:', error);
                        });
                });
            })
            .catch((error) => {
                console.error('Error fetching menus:', error);
            });
    }, []);

 

    const handleDelete = (id) => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/footer/${id}`)
          .then(() => {
            // If the delete request is successful, update the pages state
            const updatedPages = { ...pages };
            delete updatedPages[id]; // Removes the entry associated with the ID
            setPages(updatedPages);
            toast.success("Group Deleted Successfully");
      
            // Fetch menus again after deletion
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`)
              .then((response) => {
                setMenus(response.data);
              })
              .catch((error) => {
                console.error('Error fetching menus:', error);
              });
          })
          .catch((error) => {
            console.error('Error deleting Group:', error);
            toast.error("Error Deleting Group");
          });
    }

    return (
        <Admin>
            <div className="container-fluid my-5">
                <h2>Menu List</h2>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Page Title</th>
                            <th>Link</th> {/* New "Link" column */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu) => (
                            <tr key={menu.id}>
                                <td>{menu.id}</td>
                                <td>{menu.title}</td>
                                <td>{pages[menu.page_id]}</td>
                                <td>
                                    {/* Create a link with the formatted URL */}
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/page/${menu.page_id}`}
                                        target="_blank"
                                        className="btn btn-success"
                                        rel="noopener noreferrer"
                                    >
                                        {/* {pages[menu.page_id]?.replace(/\s/g, '')} */}
                                        View Page
                                    </a>
                                </td>
                                <td>
                                    <Link href={`/dashboard/EditFooterMenu/${menu.id}`} className="btn btn-primary mx-3">
                                        Edit
                                    </Link> 
                                    <button className="btn btn-danger" onClick={() => handleDelete(menu.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Admin>
    );
}

export default ViewMenu;
