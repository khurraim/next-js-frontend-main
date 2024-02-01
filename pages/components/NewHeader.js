import React from "react";
import { useState, useEffect } from "react";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';

import Link from "next/link";

import axios from "axios";

import { faBars } from "@fortawesome/free-solid-svg-icons";


const NewHeader = () => {

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
    <header class="header bg-white">
		<div class="container-fluid px-lg-5">
			<nav class="navbar navbar-expand-lg ">
				<Link class="navbar-brand d-block d-lg-none" href="/">
                    GOOD GIRLS <span>GONE BAD</span>
                </Link>
						
					<button style={{border: 'none'}} class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon onClick={toggleMobileMenu} icon={faBars} />
					</button>

					<div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
						<div class="nav-inner" style={{alignItems: 'flex-start'}}>
						<ul class="navbar-nav mb-2 mb-lg-0"  style={{ backgroundColor: 'transparent', border: 'none' }}>
							<li class="nav-item">
								<Link class="nav-link " aria-current="page" href="/">Home</Link>
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
								<Link class="nav-link" href="/faq">faq</Link>
							</li>
                            {menus.map(menu => (
                                    <li className="nav-item" key={menu.id}>
                                        <Link className="nav-link" href={`/${pages[menu.page_id]}`}>
                                            
                                            {menu.title}
                                        </Link>
                                    </li>
                                ))}
						</ul>
						<a class="navbar-brand d-none d-lg-block" href="/">GOOD GIRLS <span>GONE BAD</span></a>
						<div class="d-flex">
                             {socialIcons.map((icon)=> (
                                 // Map over the combined array of solidIcons and brandIcons
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


						{/* <a class="nav-link p-2" href="https://www.instagram.com/">
                            <i class="fa-brands fa-x-twitter"></i>
                        </a>
						<a class="nav-link p-2" href="https://www.instagram.com/"><i class="fa-brands fa-instagram"></i></a> */}
					</div>
						
					</div>
					</div>
			</nav>
		</div>
	</header>
    );
}

export default NewHeader;