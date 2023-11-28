import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';

const Footer = () => {
    const [menus, setMenus] = useState([]);
    const [pages, setPages] = useState({});

    useEffect(() => {
        // Fetch menus when the component mounts
        axios.get('http://127.0.0.1:8000/api/footer')
            .then((response) => {
                setMenus(response.data);

                // Extract unique page IDs from menu items
                const pageIds = [...new Set(response.data.map(menu => menu.page_id))];

                // Fetch page titles for all unique page IDs
                pageIds.forEach(pageId => {
                    axios.get(`http://127.0.0.1:8000/api/pages/${pageId}`)
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
        <footer className="custom-footer-second pb-5" style={{zIndex: '100', position: 'relative', marginTop: '-75px'}}>
            <div className="row">
                <div className="col-md-4 text-white" style={{fontFamily: 'Anton-Regular'}}>Good Girls Gone Bad © 2023</div>
                <div className="col-md-4 text-center payment-cards">
                {/* <i class="fab fa-cc-visa"></i>
                <i class="fab fa-cc-mastercard"></i>
                <i class="fab fa-cc-jcb"></i> */}
                <img src="/images/payment-dark.png" alt />
                </div>
                <div className="col-md-4">
                <div className="text-end text-white" style={{fontFamily: 'Anton-Regular'}}>
                    {/* terms &amp; conditions */}
                    {menus.map((menu) => (
                    
                        <Link style={{textDecoration: 'none', color: '#fff', margin: 'auto 5px'}} href={`/${pages[menu.page_id]?.replace(/\s/g, '')}`}>
                            {menu.title}
                        </Link>
                    
                    ))}
                </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
