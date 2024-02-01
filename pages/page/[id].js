import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewHeader from '../components/NewHeader';
import NewFooter from '../components/NewFooter';

import { useRouter } from 'next/router';

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
      <div className='container-fluid '>
        
          
          
        
          <div className='mt-5 py-5 mx-0 login-card-class'>
            {error ? (
              <p>{error}</p>
            ) : (
              <>
                {/* Display page details here */}
                <h4> {page.title}</h4>
                <p> {page.description}</p>
              </>
            )}
          </div>
        </div>

      

      <NewFooter/>
      </>
    
  );
}
