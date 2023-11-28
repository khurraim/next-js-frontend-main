import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter , faFacebook, faInstagram, faSnapchat } from "@fortawesome/free-brands-svg-icons";


const Template = ({children}) => {

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
        axios.get('http://127.0.0.1:8000/api/menu')
            .then((response) => {
                setMenus(response.data);
                console.log("Menu - Start");
                console.log(response.data);
                console.log("Menu - End");

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


    // Social Icons Loading
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/social-icons')
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
        axios.get('http://127.0.0.1:8000/api/footer')
            .then((response) => {
                setFooterMenus(response.data);

                // Extract unique page IDs from menu items
                const pageIds = [...new Set(response.data.map(menu => menu.page_id))];

                // Fetch page titles for all unique page IDs
                pageIds.forEach(pageId => {
                    axios.get(`http://127.0.0.1:8000/api/pages/${pageId}`)
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

    // Footer Content
    useEffect(() => {
        // Fetch footer content from your backend API when the component mounts
        axios.get('http://127.0.0.1:8000/api/footerContent') // Replace with your API endpoint
          .then((response) => {
            setFooterContent(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching footer content:', error);
            setLoading(false);
          });
      }, []);


    return (
        <div>

            <div className="wraper container-fluid" style={{backgroundImage: 'url("/img/home-bg.png")'}}>
            <div className="row nav-bar-container">
                <div className="col-md-5">
                {/* navbar */}
                <nav className="navbar navbar-expand-lg top-navbar">
                    <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* {menus.map((menu) => (
                            <li className="nav-item">
                                <Link className="nav-link" href={`http://localhost:3000/${pages[menu.page_id]?.replace(/\s/g, '')}`}>{menu.title}</Link>  
                            </li>
                        ))} */}
                         <li className="nav-item"> 
                                <Link className="nav-link " href="/New">home</Link>
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
                        </ul>
                    </div>
                    </div></nav>
                {/* navbar */}
                </div>
                <div className="col-md-2 text-center mt-2">
                    <div className="good-girls">GOOD GIRLS</div>
                    <div className="gone-bad">GONE BAD</div>
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
                                    ) : null}
                                
                                </li>
                            </Link>
                        ))}
                        </ul>
                    </div>
                    </div></nav>
                {/* navbar */}
                </div>
            </div>
            <div className="main-container">
                <div className="be-good">BE GOOD</div>
                <div className="be-bad">OR BE BAD?</div>
                <div className="box-container">
                <div className="small-box filled-box" />
                <div className="small-box" />
                <div className="small-box" />
                </div>
                <div className="mt-3">
                <input className="custom-text-input" type="text" name id placeholder="ENTER" />
                </div>
            </div>
            {/* Footer with fixed-bottom class */}
            <footer className="custom-footer fixed-bottom">
                <div className="row">
                {footerContent.map((content) => (
                
                <>
                 
                    <div className="col-md-4" >{content.copyright_text}</div>
                  
                    {/* {content.footer_image && (
                    <div className="col-md-4 text-center payment-cards">
                      <img
                        src={`http://127.0.0.1:8000/storage/${content.footer_image}`}
                        alt="Footer Image"
                        
                      />
                      </div>
                    )} */}

                    <div className="col-md-4 text-center payment-cards">
                      <img src="/img/payments.png"  />
                    </div>

                </>
                
                
              ))}
                {/* <div className="col-md-4">Good Girls Gone Bad © 2023</div>
                <div className="col-md-4 text-center payment-cards">
                    {/* <i class="fab fa-cc-visa"></i>
                    <i class="fab fa-cc-mastercard"></i>
                    <i class="fab fa-cc-jcb"></i> 
                    <img src="assets/img/payments.png" alt />
                </div> */}
                <div className="col-md-4">
                    {/* <div className="text-end">
                    terms &amp; conditions
                    </div> */}
                    <div className="text-end">
                    {/* {footerMenus.map((menu) => (
                            
                                   
                                    <a
                                        href={`http://localhost:3000/${pages[menu.page_id]?.replace(/\s/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white mx-2"
                                    >
                                        {pages[menu.page_id]?.replace(/\s/g, '')}
                                    </a>
                            
                        ))} */}
                        <p>Terms & Conditions</p>
                    </div>
                </div>
                </div>
            </footer>
            </div>

            <main>{children}</main>
        </div>
    )
}

export default Template;