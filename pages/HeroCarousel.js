// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

// const HeroCarousel = () => {
//   const [groups, setGroups] = useState([]);
//   const [activeSlide, setActiveSlide] = useState(0);

//   useEffect(() => {
//     // Fetch data from the API
//     axios.get(`${process.env.NEXT_PUBLIC_API_URL}/form-groups`)
//       .then((response) => {
//         setGroups(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleButtonClick = (index) => {
//     // Handle button click to manually set the active slide
//     setActiveSlide(index);
//     swiperRef.current.slideTo(index);  // Manually set the active slide in Swiper
//   };


//   return (
//     <main class="main-wrapper">
// 		<section class="main-banner">
//     <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">

//     <div class="carousel-indicators">
					
					
// 					{groups.map((_, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => handleButtonClick(index)}
//                 data-bs-target="#carouselExampleCaptions"
//                 data-bs-slide-to={index}
//                 className={activeSlide === index ? 'active' : ''}
//                 aria-label={`Slide ${index + 1}`}
//               ></button>
//             ))}
          
//           <a href="#" class="enter">Enter</a>
// 		</div>

//       <Swiper
//         spaceBetween={50}
//         slidesPerView={1}
//         loop={false}
//         onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
//       >
//         {groups.map((group, index) => (
//           <SwiperSlide key={group.id}>
//             <div className={`carousel-item ${activeSlide === index ? 'active' : ''}`}>
//               <img src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${group.image}`} class="d-block w-100" alt="..."/>
//               <div class="carousel-caption ">
//                 <h5>{group.title}<span>{group.subTitle}</span></h5>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//     </div>
//     </section>
//     </main>
    
//   );
// };

// export default HeroCarousel;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const HeroCarousel = () => {
  const [groups, setGroups] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);

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
          <div className="carousel-indicators">
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
            <a href="#" className="enter">Enter</a>
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
                <div className={`carousel-item ${activeSlide === index ? 'active' : ''}`}>
                  <img src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${group.image}`} className="d-block w-100" alt={`Slide ${index + 1}`} />
                  <div className="carousel-caption">
                    <h5>{group.title}<span>{group.subtitle}</span></h5>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
};

export default HeroCarousel;
