import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewHeader from '../components/NewHeader';
import NewFooter from '../components/NewFooter';

import { useRouter } from 'next/router';

// export default function PageDetails() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [page, setPage] = useState({});
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Fetch page details based on the ID
//     const fetchPageDetails = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages/${id}`);
//         setPage(response.data); // Assuming the API returns the page details
//         setError('');
//       } catch (error) {
//         console.error('Error fetching page details:', error);
//         if (error.response && error.response.status === 404) {
//           setError('Page not found');
//         } else {
//           setError('Error fetching page details');
//         }
//       }
//     };

//     if (id) {
//       fetchPageDetails();
//     }
//   }, [id]);

//   return (
//     <>
//     <NewHeader />
      
//     <main className="main-wrapper innrerPages-waper bg-white">
//         <div className="container-lg inner-product">
//           <div className="row px-lg-5">
//             <div className="col-lg-7 col-md-9 mx-auto">
//               <div className="product-card">
                
//               </div>
//               <div className="my-5">
//                 <h1 className="sub-heading mb-4">{page.title}</h1>
//                 <p>{page.description}</p>
                
                
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

      

//       <NewFooter/>
//       </>
    
//   );
// }

export default function PageDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch page details based on the ID
    const fetchPageDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages/${id}`);
        setPage(response.data); // Assuming the API returns the page details
        setError('');
      } catch (error) {
        console.error('Error fetching page details:', error);
        if (error.response && error.response.status === 404) {
          setError('Page not found');
        } else {
          setError('Error fetching page details');
        }
      }
    };

    if (id) {
      fetchPageDetails();
    }
  }, [id]);

  return (
    <>
      <NewHeader />
      <main className="main-wrapper innrerPages-waper bg-white page-generate">
        <div className="container-lg inner-product">
          <div className="row px-lg-5">
            <div className="col-lg-7 col-md-9 mx-auto">
              <div className="product-card"></div>
              <div className="my-5">
                <h1 className="sub-heading mb-4">{page.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: page.description }} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <NewFooter />
    </>
  );
}