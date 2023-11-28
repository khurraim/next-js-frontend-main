import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faTwitter ,
    faFacebook, 
    faInstagram, 
    faSnapchat , 
    faLinkedin, 
    faPinterest
} from "@fortawesome/free-brands-svg-icons";

const Header = () => {
    
    const [menus, setMenus] = useState([]);
    const [pages, setPages] = useState({});

    // Social Icons State
    const [socialIcons, setSocialIcons] = useState([]);
    const [loading, setLoading] = useState(true);

    // Footer Content State
    const [footerContent, setFooterContent] = useState([]);


    // Footer Menu State
    const [footerMenus, setFooterMenus] = useState([]);
    const [footerPages, setFooterPages] = useState({});

    useEffect(() => {
        // Fetch menus when the component mounts
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu`)
            .then((response) => {
                setMenus(response.data);
                console.log("Menu - Start");
                console.log(response.data);
                console.log("Menu - End");

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


    // Social Icons Loading
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/social-icons`)
          .then((response) => {
            setSocialIcons(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching social icons:', error);
            setLoading(false);
          });
    }, []);


    // Footer Menu 
    useEffect(() => {
        // Fetch menus when the component mounts
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`)
            .then((response) => {
                setFooterMenus(response.data);

                // Extract unique page IDs from menu items
                const pageIds = [...new Set(response.data.map(menu => menu.page_id))];

                // Fetch page titles for all unique page IDs
                pageIds.forEach(pageId => {
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}`)
                        .then((pageResponse) => {
                            // Store page titles in the 'pages' state using page ID as the key
                            setFooterPages(prevPages => ({
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
        // <div className="header">
        //     <ul>
        //         <li>
        //             <Link href="/">Home</Link>
        //         </li>
        //         <li>
        //             <Link href="/login">Login</Link>
        //         </li>
        //         <li>
        //             <Link href="/dashboard">Dashboard</Link>
        //         </li>
        //         {/* Generate navigation links for menu items */}
        //         {menus.map((menu) => (
        //             <li key={menu.id}>
        //                 <Link href={`/${menu.title.replace(/\s/g, '')}`}>
        //                     {menu.title}
        //                 </Link>
        //             </li>
        //         ))}
        //     </ul>
        // </div>

        
            <div className="row nav-bar-container" style={{zIndex: '100', position: 'relative'}}>
                <div className="col-md-5">
                {/* navbar */}
                <nav className="navbar navbar-expand-lg top-navbar">
                    <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{fontFamily: 'Anton-Regular'}}>
                        {/* {menus.map((menu) => (
                            <li className="nav-item">
                                <Link className="nav-link" href={`http://localhost:3000/${pages[menu.page_id]?.replace(/\s/g, '')}`}>{menu.title}</Link>  
                            </li>
                        ))} */}
                         <li className="nav-item"> 
                                <Link className="nav-link " href="/">home</Link>
                            </li>
                            
                            <li className="nav-item"> 
                                <Link className="nav-link " href="/listing">listing</Link>
                            </li>

                            <li className="nav-item">
                            
                            <Link className="nav-link " href="/AboutUs">about us</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " href="/Contact">contact</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " href="/WorkWithUs">work with us</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " href="/">faq</Link>
                            </li>

                            {menus.map((menu) => (
                            < li className="nav-item">
                                
                                
                                    {/* Create a link with the formatted URL */}
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${pages[menu.page_id]?.replace(/\s/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="nav-link"
                                    >
                                        {pages[menu.page_id]?.replace(/\s/g, '')}
                                    </a>
                                
                               
                            </li>
                        ))}


                        </ul>
                    </div>
                    </div></nav>
                {/* navbar */}
                </div>
                <div className="col-md-2 text-center mt-2">
                    <div className="good-girls"  style={{fontFamily: 'Anton-Regular'}}>GOOD GIRLS</div>
                    <div className="gone-bad" style={{fontFamily: 'Anton-Regular'}}>GONE BAD</div>
                </div>
                <div className="col-md-5">
                {/* navbar */}
                {/* Icons */}
                <nav className="navbar navbar-expand-lg top-navbar" style={{float: 'right'}}>
                    <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                            <i className="fab fa-instagram" />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            <i className="fab fa-instagram" />
                            </a>
                        </li>
                        {socialIcons.map((icon) => ( 
                        
                            <Link href={icon.link} target="_blank" rel="noopener noreferrer">      
                                <li className="nav-item">
                                    {/* {icon.name === 'Twitter' ? (
                                        // Render something when icon.name is 'Twitter'
                                        <FontAwesomeIcon
                                            icon={faTwitter}
                                            className="fab fa-instagram text-white"
                                        />
                                    ) : null} */}
                                     {icon.name === 'Twitter' ? (
                                        <FontAwesomeIcon
                                            icon={faTwitter}
                                            className="fab fa-twitter text-white nav-link"
                                        />
                                    ) : icon.name === 'Facebook' ? (
                                        <FontAwesomeIcon
                                            icon={faFacebook}
                                            className="fab fa-facebook text-white nav-link"
                                        />
                                    ) : icon.name === 'Instagram' ? (
                                        <FontAwesomeIcon
                                            icon={faInstagram}
                                            className="fab fa-instagram text-white nav-link"
                                        />
                                    ) : icon.name === 'Snapchat' ? (
                                        <FontAwesomeIcon
                                            icon={faSnapchat}
                                            className="fab fa-snapchat text-white nav-link"
                                        />
                                    ) : icon.name === 'Linkedin' ? (
                                        <FontAwesomeIcon
                                            icon={faLinkedin}
                                            className="fab fa-snapchat text-white nav-link"
                                        /> 
                                    ) : icon.name === 'Pinterest' ? (
                                        <FontAwesomeIcon
                                            icon={faPinterest}
                                            className="fab fa-snapchat text-white nav-link"
                                        /> ) :
                                    
                                    null }
                                
                                </li>
                            </Link>
                        ))}
                        </ul>
                    </div>
                    </div></nav>
                {/* navbar */}
                </div>
            </div>
        
    );
}

export default Header;
