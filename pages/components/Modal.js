import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const overlayStyle = {
  background: 'rgba(0,0,0,0.5)'
}

const divStyle = {
  backgroundImage: 'url(../images/img-bage.png)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '73px',
  display: 'block',
  width: '57px',
  position: 'absolute',
  top: '1px',
  right: '0px',
};

const spanStyle = {
    color: 'white',
    transform: 'rotate(45deg)',
    display: 'block',
    fontSize: '13px',
    marginTop: '13px',
    marginLeft: '13px',
    textTransform: 'capitalize',
}

const Modal = ({ id, onClose }) => {

  const [rates, setRates] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [model, setModel] = useState({});
  const [services, setServices] = useState({});

  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/models/${id}`)
    .then((response)=>{
      setModel(response.data);
      console.log("****");
      console.log(response.data);
      console.log("****");
    })
    .catch((error)=>{console.log("Error Fecthing Moda(e)l",error);});
  }, [id]);

  useEffect(() => {
    // Fetch rates data from the API using the provided URL
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/models/rates/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the rates are stored in the 'rates' property of the API response
        setRates(data.rates);
      })
      .catch((error) => console.error("Error fetching rates:", error));
  }, [id]);

  useEffect(() => {
    // Fetch gallery images data from the API using the provided URL
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/models/gallery/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGalleryImages(data);
      })
      .catch((error) => console.error("Error fetching gallery images:", error));
  }, [id]);

  useEffect(() => {
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/models/services/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, [id]);

  useEffect(()=>{
    // Fetch services for each model
    const fetchRates = async () => {
      const ratesData = {};
  
      for (const record of model) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/models/rates/${record.id}`
          ); // Replace with your service API endpoint
          ratesData[record.id] = response.data.rates;
        } catch (error) {
          console.error('Error fetching services:', error);
          ratesData[record.id] = [];
        }
      }
      setRates(ratesData);
    };
  
    if (model.length > 0) {
      fetchRates();
    }
  },[model]);

  const isNewModel = (createdAt) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return new Date(createdAt) > oneMonthAgo;
  };

  const handleButtonClick = (index) => {
    // Handle button click to manually set the active slide
    setActiveSlide(index);
    swiperRef.current.swiper.slideTo(index);  // Manually set the active slide in Swiper
  };
  

  return (
    <div
      className="modal  infoGirl-modal d-block"
      id="exampleModal"
      tabIndex={-1}
      style={overlayStyle}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header p-0">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="modal-body">
            <div className="row mx-0">
              



              <div className="col-lg-4 swiper-slider-column">
                <div className="owl-carousel owl-theme owl-loaded owl-drag" style={{position: "relative"}}>
                  
                  <div className="owl-carousel owl-theme">

                {/* <Swiper
                  ref={swiperRef}
                  spaceBetween={50}
                  slidesPerView={1}
                  loop={true}
                  onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                >
                  
                   

                  {model.featuredImage ? (
                    <SwiperSlide key={0}>
                      <div className="item">
                      <div className="product-card">
                        <div className="img-wraper">
                          <img
                            className="img-fluid"
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${model.featuredImage}`}
                            alt="Model Image"
                          />
                          {isNewModel(model.created_at) && (
                            <div className="img-badge" style={divStyle}>
                            <span style={spanStyle}>new girl</span>
                          </div>
                          )}
                          
                        </div>
                        <div className="product-card-body">
                          <div>
                            <h5>{model.title}</h5>
                            <h6>
                              {model.subLocation}, {model.location}
                            </h6>
                            {rates && rates.length > 0 && (
                              <p>
                                <span>Incall £{rates[rates.length - 1].incall}</span>
                                <span>Outcall £{rates[rates.length - 1].outcall}</span>
                              </p>
                            )}
                          </div>
                          <div>
                            {model.bookLink && (
                            <a href={model.bookLink}>BOOK ME</a>
                            )}
                          </div>
                        </div>
                      </div>
                      </div>
                    </SwiperSlide>
                   ): (
                    <SwiperSlide key={0}>
                      <div className="item">
                      <div className="product-card">
                        <div className="img-wraper">
                          <img
                            className="img-fluid"
                            src="images/female.jpg"
                            alt="Model Image"
                          />
                          <div className="img-badge" style={divStyle}>
                            <span style={spanStyle}>new girl</span>
                          </div>
                        </div>
                        <div className="product-card-body">
                          <div>
                            <h5>{model.title}</h5>
                            <h6>
                              {model.subLocation}, {model.location}
                            </h6>
                            {rates && rates.length > 0 && (
                              <p>
                                <span>Incall £{rates[rates.length - 1].incall}</span>
                                <span>Outcall £{rates[rates.length - 1].outcall}</span>
                              </p>
                            )}
                          </div>
                          <div>
                            {model.bookLink && (
                            <a href={model.bookLink}>BOOK ME</a>
                            )}
                          </div>
                        </div>
                      </div>
                      </div>
                    </SwiperSlide>
                  )}

                  {model && model.video && (
                    <SwiperSlide key={1}>
                      <div className="product-card">
                        <div className="img-wraper">
                          <video className="video-item" style={{height: '450px'}} controls loop>
                            <source
                              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${model.video}`}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                        <div className="product-card-body">
                          <div>
                            <h5>{model.title}</h5>
                            <h6>
                              {model.subLocation}, {model.location}
                            </h6>
                            {rates && rates.length > 0 && (
                          <p>
                            <span>Incall £{rates[rates.length - 1].incall}</span>
                            <span>Outcall £{rates[rates.length - 1].outcall}</span>
                          </p>
                        )}
                            
                          </div>
                          <div>
                            {model.bookLink && (
                            <a href={model.bookLink}>BOOK ME</a>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )}

                </Swiper> */}

                <div className="item">
                      <div className="product-card">
                      
                        <Swiper
                        ref={swiperRef}
                        spaceBetween={50}
                        slidesPerView={1}
                        className="swiper-wrapper-class"
                        loop={true}
                        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}>
                          

                            <SwiperSlide key={0}>
                              <div className="img-wraper">
                              <img
                                className="img-fluid"
                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${model.featuredImage}`}
                                alt="Model Image"
                              />
                              </div>
                            </SwiperSlide>


                            {model && model.video && (
                            <SwiperSlide key={1}>
                              <div className="img-wraper">
                              <video className="video-item" style={{height: '450px'}} controls loop>
                              <source
                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${model.video}`}
                                type="video/mp4"
                              />  
                              </video>
                              </div>
                            </SwiperSlide>
                            )}

                            {isNewModel(model.created_at) && (
                              <div className="img-badge" style={divStyle}>
                              <span style={spanStyle}>new girl</span>
                            </div>
                            )}
                            
                            </Swiper>
                          
                          <div className="product-card-body">
                            <div>
                              <h5>{model.title}</h5>
                              <h6>
                                {model.subLocation}, {model.location}
                              </h6>
                              {rates && rates.length > 0 && (
                                <p>
                                  <span>Incall £{rates[rates.length - 1].incall}</span>
                                  <span>Outcall £{rates[rates.length - 1].outcall}</span>
                                </p>
                              )}
                            </div>
                            <div>
                              {model.bookLink && (
                              <a href={model.bookLink}>BOOK ME</a>
                              )}
                            </div>
                          </div>
                        
                        
                      </div>
                      </div>

                </div>

                  

                <div className="owl-dots dots-style">
                        {Array.from({ length: 2 }).map((_, index) => (
                          <button
                            key={index}
                            role="button"
                            
                            className={`owl-dot ${index === activeSlide ? 'active' : ''}`}
                            onClick={() => swiperRef.current.swiper.slideTo(index)}
                          >
                            <span></span>
                          </button>
                        ))}
                      </div>

                </div>
              </div>
             

              <div className="col-lg-4">
                <h5>Rates</h5>
                <div className="row">
                  <div className="col-4">
                    <p>duration</p>
                  </div>
                  <div className="col-4">
                    <p>incall</p>
                  </div>
                  <div className="col-4">
                    <p>outcall</p>
                  </div>
                  {rates.map((rate) => (
                    <>
                      <div className="col-4">
                        <p>{rate.duration}</p>
                      </div>
                      <div className="col-4">
                        <p>£{rate.incall}</p>
                      </div>
                      <div className="col-4">
                        <p>£{rate.outcall}</p>
                      </div>
                    </>
                  ))}
                </div>
                <h5>stats</h5>
                <div className="row">

                  {model.age && (
                  <div className="col-6">
                    <p>age</p>
                  </div>
                  )}

                  {model && (
                    <>
                      {model.age && (
                        <div className="col-6">
                          <p>{model.age}</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {model.nationality && (
                  <div className="col-6">
                    <p>nationality</p>
                  </div>
                  )}
                  {model && (
                    <>
                      {model.nationality && (
                        <div className="col-6">
                          <p>{model.nationality}</p>
                        </div>
                      )}
                    </>
                  )}

                  {model.dressSize && (
                    <div className="col-6">
                      <p>dress size</p>
                    </div>
                  )}
                  {model && (
                    <>
                      {model.dressSize && (
                        <div className="col-6">
                          <p>{model.dressSize}</p>
                        </div>
                      )}
                    </>
                  )}
                  {/* <div className="col-6">
                    <p>9</p>
                  </div> */}
                  {model.height && (
                  <div className="col-6">
                    <p>height</p>
                  </div>
                  )}
                  {model && (
                    <>
                      {model.height && (
                        <div className="col-6">
                          <p>{model.height}</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {model.hairColor && (
                  <div className="col-6">
                    <p>hair colour</p>
                  </div>
                  )}
                  {model && (
                    <>
                      {model.hairColor && (
                        <div className="col-6">
                          <p>{model.hairColor}</p>
                        </div>
                      )}
                    </>
                  )}
                  {/* <div className="col-6">
                    <p>brunette</p>
                  </div> */}
                </div>
                <h5>available services</h5>
                <div className="row">
                  {/* <div className="col-6">
                    <p>cim</p>
                  </div> */}
                  {services.services && services.services.length > 0 ? (
                    services.services.map((service) => (
                      <div className="col-6" key={service.id}>
                        <p>{service.name}</p>
                      </div>
                    ))
                  ) : (
                    <p>No services available</p>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <h5>about me</h5>
                <p>
                  {model && (
                    <>
                      {model.modelDescription && (
                        <p>{model.modelDescription}</p>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="row girlImageGallery">
              {galleryImages.map((image) => (
                <div className="col-lg-4">
                  <img
                    className="listing-img img-fluid"
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.image}`}
                    alt={`Gallery Image ${image.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
