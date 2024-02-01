import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';

const HeroCarousel = () => {
  const [groups, setGroups] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);

  


  const IndicatorStyle = {
    position: 'absolute',
    right: 'unset',
    bottom: 'unset',
    left: '10%',
    paddingTop: '1.25rem',
    paddingBottom: '1.25rem',
    color: '#fff',
    textAlign: 'left',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: '50px 0 0 0',
    display: 'block'
  }
  

  

  useEffect(() => {
    // Fetch data from the API
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/form-groups`)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleButtonClick = (index) => {
    // Handle button click to manually set the active slide
    setActiveSlide(index);
    swiperRef.current.swiper.slideTo(index);  // Manually set the active slide in Swiper
  };

  return (
    <main className="main-wrapper">
      <section className="main-banner">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators" style={IndicatorStyle}>
            {groups.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleButtonClick(index)}
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={activeSlide === index ? 'active' : ''}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
            
            <a href="/products"  className="enter">Enter</a>
          
          </div>

          <Swiper
            ref={swiperRef}
            spaceBetween={50}
            slidesPerView={1}
            loop={false}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          >
            {groups.map((group, index) => (
              
              <SwiperSlide key={group.id}>
                <a href={group.link} target="_blank">
                <div className={`carousel-item ${activeSlide === index ? 'active' : ''}`}>
                  <img src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${group.image}`} className="d-block w-100" alt={`Slide ${index + 1}`} />
                  <div className="carousel-caption">
                    <h5>{group.title}<span>{group.subtitle}</span></h5>
                  </div>
                </div>
                </a>
              </SwiperSlide>
              
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
};

export default HeroCarousel;
