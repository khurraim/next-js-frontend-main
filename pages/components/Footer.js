import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';

const Footer = () => {
    const [menus, setMenus] = useState([]);
    const [pages, setPages] = useState({});

    const copyRightStyle = {
        marginTop: '0',
        marginBottom: '.5rem',
        fontWeight: '500',
        lineHeight: '1.2',
        color: '#fff',
        fontSize: '1.25rem'
    }

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
        <footer className="footer home-footer" style={{zIndex: '1'}}>
            <div className="container-fluid px-lg-5">
                <div className="footer-inner">
                    <div ><h5 style={copyRightStyle}>Good Girls Gone Bad © 2023</h5></div>
                    <div ><img className="img-fluid" src="/images/payment.png"/></div>
                    
                    <div className="text-white d-flex">
                        <h5>
                        {menus.map((menu) => (
                            
                                <Link className="text-white text-decoration-none mx-2" style={{fontSize: "1.25rem", color: '#fff'}} href={`/page/${menu.page_id}`}>
                                    {menu.title}
                                </Link>
                            
                        ))}
                        </h5>
                    </div>
                </div>
                
            </div>
	    </footer>
    );
}

export default Footer;
