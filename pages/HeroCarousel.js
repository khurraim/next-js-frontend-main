// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// import { toast } from 'react-toastify';
// import Link from 'next/link';

// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';


// const HeroCarousel = () => {
//   const [groups, setGroups] = useState([]);

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

//   const handleDelete = (id) => {
//     // Make a DELETE request to delete the category with the specified ID
//     axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/form-groups/${id}`)
//       .then(() => {
//         // If the delete request is successful, update the categories state
//         setGroups((prevGroups) => prevGroups.filter((group) => group.id !== id));
//         toast.success("Group Deleted Successfully");
//       })
//       .catch((error) => {
//         console.error('Error deleting Group:', error);
//         toast.error("Error Deleting Group");
//       });
//   };

//   return (
//     <div style={{marginTop: '-200px', zIndex: '10', position: 'relative' }}>
//       <Swiper
//       spaceBetween={50}
//       slidesPerView={1}
//       onSlideChange={() => console.log('slide change')}
//       onSwiper={(swiper) => console.log(swiper)}
//       >
//         {groups.map((group) => (
//          <SwiperSlide>
//           <div key={group.id} className="wraper container-fluid" style={{ backgroundImage: `url(http://127.0.0.1:8000/storage/${group.image})` }}>
//             <div className='main-container'>
//                 <div style={{height: '250px'}}></div>
//                 <div className="be-good">{group.title}</div>
//                 <div className="be-bad">{group.subtitle}</div>
//                 <div className="box-container ">
//                     <div className="small-box filled-box" />
//                     <div className="small-box" />
//                     <div className="small-box" />
//                 </div>  
//                 <div className="mt-3">
//                 <input className="custom-text-input" type="text" name id placeholder="ENTER" />
//                 </div>
//             </div>
//           </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default HeroCarousel;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const HeroCarousel = () => {
  const [groups, setGroups] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

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

  const handleDelete = (id) => {
    // Make a DELETE request to delete the category with the specified ID
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/form-groups/${id}`)
      .then(() => {
        // If the delete request is successful, update the categories state
        setGroups((prevGroups) => prevGroups.filter((group) => group.id !== id));
        toast.success("Group Deleted Successfully");
      })
      .catch((error) => {
        console.error('Error deleting Group:', error);
        toast.error("Error Deleting Group");
      });
  };

  return (
    <div style={{ marginTop: '-200px', zIndex: '10', position: 'relative' }}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
      >
        {groups.map((group, index) => (
          <SwiperSlide key={group.id}>
            <div className="wraper container-fluid" style={{ backgroundImage: `url(http://127.0.0.1:8000/storage/${group.image})` }}>
              <div className='main-container'>
                <div style={{ height: '250px' }}></div>
                <div className="be-good">{group.title}</div>
                <div className="be-bad">{group.subtitle}</div>
                <div className="box-container">
                  {[...Array(groups.length)].map((_, i) => (
                    <div key={i} className={`small-box ${i === activeSlide ? 'filled-box' : ''}`} />
                  ))}
                </div>
                <div className="mt-3">
                  <input className="custom-text-input" type="text" name id placeholder="ENTER" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;

