// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import axios from 'axios';

// // Import the FontAwesomeIcon component
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//     faTwitter ,
//     faFacebook, 
//     faInstagram, 
//     faSnapchat , 
//     faLinkedin, 
//     faPinterest,
// } from "@fortawesome/free-brands-svg-icons";
// import { faBars } from "@fortawesome/free-solid-svg-icons";

// const Header = () => {
    
//     const [menus, setMenus] = useState([]);
//     const [pages, setPages] = useState({});

//     // Social Icons State
//     const [socialIcons, setSocialIcons] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Footer Content State
//     const [footerContent, setFooterContent] = useState([]);


//     // Footer Menu State
//     const [footerMenus, setFooterMenus] = useState([]);
//     const [footerPages, setFooterPages] = useState({});

//     useEffect(() => {
//         // Fetch menus when the component mounts
//         axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu`)
//             .then((response) => {
//                 setMenus(response.data);
//                 console.log("Menu - Start");
//                 console.log(response.data);
//                 console.log("Menu - End");

//                 // Extract unique page IDs from menu items
//                 const pageIds = [...new Set(response.data.map(menu => menu.page_id))];

//                 // Fetch page titles for all unique page IDs
//                 pageIds.forEach(pageId => {
//                     axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}`)
//                         .then((pageResponse) => {
//                             // Store page titles in the 'pages' state using page ID as the key
//                             setPages(prevPages => ({
//                                 ...prevPages,
//                                 [pageId]: pageResponse.data.title,
//                             }));
//                         })
//                         .catch((error) => {
//                             console.error('Error fetching page:', error);
//                         });
//                 });
//             })
//             .catch((error) => {
//                 console.error('Error fetching menus:', error);
//             });
//     }, []);


//     // Social Icons Loading
//     useEffect(() => {
//         axios.get(`${process.env.NEXT_PUBLIC_API_URL}/social-icons`)
//           .then((response) => {
//             setSocialIcons(response.data);
//             setLoading(false);
//           })
//           .catch((error) => {
//             console.error('Error fetching social icons:', error);
//             setLoading(false);
//           });
//     }, []);


//     // Footer Menu 
//     useEffect(() => {
//         // Fetch menus when the component mounts
//         axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`)
//             .then((response) => {
//                 setFooterMenus(response.data);

//                 // Extract unique page IDs from menu items
//                 const pageIds = [...new Set(response.data.map(menu => menu.page_id))];

//                 // Fetch page titles for all unique page IDs
//                 pageIds.forEach(pageId => {
//                     axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}`)
//                         .then((pageResponse) => {
//                             // Store page titles in the 'pages' state using page ID as the key
//                             setFooterPages(prevPages => ({
//                                 ...prevPages,
//                                 [pageId]: pageResponse.data.title,
//                             }));
//                         })
//                         .catch((error) => {
//                             console.error('Error fetching page:', error);
//                         });
//                 });
//             })
//             .catch((error) => {
//                 console.error('Error fetching menus:', error);
//             });
//     }, []);

    

//     return (

        
//         <header class="header home-menu">
// 		<div class="container-fluid px-lg-5">
// 			<nav class="navbar navbar-expand-lg ">
// 				<a class="navbar-brand d-block d-lg-none" >GOOD GIRLS <span>GONE BAD</span></a>
						
// 					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <FontAwesomeIcon icon={faBars} />
// 					</button>
// 					<div class="collapse navbar-collapse" id="navbarSupportedContent">
// 						<div class="nav-inner">
// 						<ul class="navbar-nav mb-2 mb-lg-0" style={{backgroundColor: 'transparent', border: 'none'}}>
// 							<li class="nav-item">
// 								<Link class="nav-link" aria-current="page" href="/">Home</Link>
// 							</li>
// 							<li class="nav-item">
// 								<Link class="nav-link" href="/AboutUs">About us</Link>
// 							</li>
// 							<li class="nav-item">
// 								<Link class="nav-link" href="/Contact">contact</Link>
// 							</li>
// 							<li class="nav-item">
// 								<Link class="nav-link" href="/WorkWithUs">work with us</Link>
// 							</li>
// 							<li class="nav-item">
// 								<Link class="nav-link" href="/FAQs">faq</Link>
// 							</li>
// 						</ul>
// 						<a class="navbar-brand d-none d-lg-block" href="index.html">GOOD GIRLS <span>GONE BAD</span></a>
// 						<a class="nav-link " href="https://www.instagram.com/"><i class="fa-brands fa-instagram"></i></a>

//                         {socialIcons.map((icon) => ( 
                        
//                         <Link className="nav-link" href={icon.link} target="_blank" rel="noopener noreferrer">      
                            
//                                 {/* {icon.name === 'Twitter' ? (
//                                     // Render something when icon.name is 'Twitter'
//                                     <FontAwesomeIcon
//                                         icon={faTwitter}
//                                         className="fab fa-instagram text-white"
//                                     />
//                                 ) : null} */}
//                                  {icon.name === 'Twitter' ? (
//                                     <FontAwesomeIcon
//                                         icon={faTwitter}
//                                         className="fab fa-twitter text-white "
//                                     />
//                                 ) : icon.name === 'Facebook' ? (
//                                     <FontAwesomeIcon
//                                         icon={faFacebook}
//                                         className="fab fa-facebook text-white "
//                                     />
//                                 ) : icon.name === 'Instagram' ? (
//                                     <FontAwesomeIcon
//                                         icon={faInstagram}
//                                         className="fab fa-instagram text-white "
//                                     />
//                                 ) : icon.name === 'Snapchat' ? (
//                                     <FontAwesomeIcon
//                                         icon={faSnapchat}
//                                         className="fab fa-snapchat text-white "
//                                     />
//                                 ) : icon.name === 'Linkedin' ? (
//                                     <FontAwesomeIcon
//                                         icon={faLinkedin}
//                                         className="fab fa-snapchat text-white "
//                                     /> 
//                                 ) : icon.name === 'Pinterest' ? (
//                                     <FontAwesomeIcon
//                                         icon={faPinterest}
//                                         className="fab fa-snapchat text-white "
//                                     /> ) :
                                
//                                 null }
                            
                            
//                         </Link>
//                     ))}
// 					</div>
// 					</div>
// 			</nav>
// 		</div>
// 	</header>




        
//     );
// }

// export default Header;



import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faTwitter,
    faFacebook, 
    faInstagram, 
    faSnapchat, 
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
                    <a className="navbar-brand d-block d-lg-none" href="/">GOOD GIRLS <span>GONE BAD</span></a>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        onClick={toggleMobileMenu}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
                        <div className="nav-inner">
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
                            
                            <div >
                            {socialIcons.map((icon) => (
                                <Link className="nav-link" href={icon.link} target="_blank" rel="noopener noreferrer" key={icon.id}>
                                    {icon.name === 'Twitter' ? (
                                        <FontAwesomeIcon
                                            icon={faTwitter}
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
