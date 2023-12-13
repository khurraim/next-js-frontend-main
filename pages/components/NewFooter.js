import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';

const NewFooter = () => {

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

    return (
        <footer className="footer ">
        <div className="container-fluid px-lg-5">
            <div className="footer-inner">
                <div className><h5>Good Girls Gone Bad © 2023</h5></div>
                <div className><img className="img-fluid" src="images/payment-footer.png" /></div>
                <div className>
                    {/* <h5>terms &amp; conditions</h5> */}
                    {menus.map((menu) => (
                            <h5 className="d-flex">
                                <Link className="text-dark text-decoration-none mx-2" href={`/${pages[menu.page_id]?.replace(/\s/g, '')}`}>
                                    {menu.title}
                                </Link>
                            </h5>
                        ))}
                </div>
            </div>
        </div>
        </footer>

    )
}

export default NewFooter;