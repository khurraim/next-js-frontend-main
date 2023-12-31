import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faTwitter,
    faFacebook, 
    faInstagram, 
    faSnapchat, 
    faXTwitter,
    faLinkedin, 
    faPinterest,
} from "@fortawesome/free-brands-svg-icons";

import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [menus, setMenus] = useState([]);
    const [pages, setPages] = useState({});
    const [socialIcons, setSocialIcons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [footerContent, setFooterContent] = useState([]);
    const [footerMenus, setFooterMenus] = useState([]);
    const [footerPages, setFooterPages] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu`)
            .then((response) => {
                setMenus(response.data);
                const pageIds = [...new Set(response.data.map(menu => menu.page_id))];
                pageIds.forEach(pageId => {
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}`)
                        .then((pageResponse) => {
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

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`)
            .then((response) => {
                setFooterMenus(response.data);
                const pageIds = [...new Set(response.data.map(menu => menu.page_id))];
                pageIds.forEach(pageId => {
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}`)
                        .then((pageResponse) => {
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="header home-menu">
            <div className="container-fluid px-lg-5">
                <nav className="navbar navbar-expand-lg">
                    <Link className="navbar-brand d-block d-lg-none" href="/">
                        GOOD GIRLS <span>GONE BAD</span>
                    </Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        onClick={toggleMobileMenu}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
                        <div className="nav-inner" style={{alignItems: 'flex-start'}}>
                            <ul className="navbar-nav mb-2 mb-lg-0" style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <li class="nav-item">
 								<Link class="nav-link" aria-current="page" href="/">Home</Link>
 							</li>
 							<li class="nav-item">
 								<Link class="nav-link" href="/AboutUs">About us</Link>
 							</li>
 							<li class="nav-item">
 								<Link class="nav-link" href="/Contact">contact</Link>
 							</li>
 							<li class="nav-item">
 								<Link class="nav-link" href="/WorkWithUs">work with us</Link>
 							</li>
 							<li class="nav-item">
 								<Link class="nav-link" href="/faq">faqs</Link>
 							</li>
                                {menus.map(menu => (
                                    <li className="nav-item" key={menu.id}>
                                        <Link className="nav-link" href={`/${pages[menu.page_id]}`}>
                                            
                                            {menu.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <a className="navbar-brand d-none d-lg-block" href="/">GOOD GIRLS <span>GONE BAD</span></a>
                            
                            <div className="d-flex align-items-center">
                            {socialIcons.map((icon) => (
                                <Link className="nav-link mx-2"  style={{padding: '0px'}} href={icon.link} target="_blank" rel="noopener noreferrer" key={icon.id}>
                                    {icon.name === 'Twitter' ? (
                                        <FontAwesomeIcon
                                            icon={faXTwitter}
                                            className="fab fa-twitter text-white "
                                             
                                        />
                                    ) : icon.name === 'Facebook' ? (
                                        <FontAwesomeIcon
                                            icon={faFacebook}
                                            className="fab fa-facebook text-white "
                                        />
                                    ) : icon.name === 'Instagram' ? (
                                        <FontAwesomeIcon
                                            icon={faInstagram}
                                            className="fab fa-instagram text-white "
                                        />
                                    ) : icon.name === 'Snapchat' ? (
                                        <FontAwesomeIcon
                                            icon={faSnapchat}
                                            className="fab fa-snapchat text-white "
                                        />
                                    ) : icon.name === 'Linkedin' ? (
                                        <FontAwesomeIcon
                                            icon={faLinkedin}
                                            className="fab fa-snapchat text-white "
                                        />
                                    ) : icon.name === 'Pinterest' ? (
                                        <FontAwesomeIcon
                                            icon={faPinterest}
                                            className="fab fa-snapchat text-white "
                                        /> ) :
                                        null
                                    }
                                </Link>
                            ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
