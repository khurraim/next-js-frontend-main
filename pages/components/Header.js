import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';


 import { faBars } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';

const Header = () => {
    const [menus, setMenus] = useState([]);
    const [pages, setPages] = useState({});
    const [socialIcons, setSocialIcons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [footerContent, setFooterContent] = useState([]);
    const [footerMenus, setFooterMenus] = useState([]);
    const [footerPages, setFooterPages] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Font Awesome Icons
    const solidIcons = Object.keys(SolidIcons).map((icon) => ({ name: icon, icon: SolidIcons[icon] }));
    const brandIcons = Object.keys(BrandIcons).map((icon) => ({ name: icon, icon: BrandIcons[icon] }));

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
                                
                                <Link className="nav-link p-2" key={icon.id} href={icon.link}>
                                    
                                    {[...solidIcons, ...brandIcons].map((item, index) => {
                                        // Check if icon_class matches the current item's name
                                        if (icon.icon_class === item.name) {
                                        // Return the FontAwesomeIcon component
                                        return <FontAwesomeIcon key={index} icon={item.icon} />;
                                        }
                                        // If there is no match, return null or an empty fragment
                                        return null;
                                    })}
                                    
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
