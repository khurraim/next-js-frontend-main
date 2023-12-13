import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from '@/pages/layouts/Admin';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ViewDetails = () => {

    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(true);

    const [services, setServices] = useState([]);
    const [rates, setRates] = useState({});

    const [gallery, setGallery] = useState([]);

    const router = useRouter();
    const {id} = router.query;

    // Obtain Current Model Data
  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/models/${id}`)
      //axios.get(`http://127.0.0.1:8000/api/models/${id}`)
        .then((response) => {
          setModel(response.data);
          setLoading(false);
        });
    }
  }, [id]);

  // Obtain Services Here
  useEffect(() => {
    if (id) {
      setLoading(true);
      //axios.get(`http://127.0.0.1:8000/api/models/services/${id}`)
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/models/services/${id}`)
        .then((response) => {
          setServices(response.data.services);
          console.log(response.data.services);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching services:', error);
          setLoading(false);
        });
    }
  }, [id]);

  // Obtain rates here
  useEffect(() => {
    if (id) {
      setLoading(true);
      
      //axios.get(`http://127.0.0.1:8000/api/models/rates/${id}`)
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/models/rates/${id}`)
        .then((response) => {
          setRates(response.data.rates);
          console.log(response.data.rates);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching services:', error);
          setLoading(false);
        });
    }
  }, [id]);

  // Obtain Gallery Here
  useEffect(() => {
    if(id) {
      setLoading(true);
      //axios.get(`http://127.0.0.1:8000/api/models/gallery/${id}`)
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/models/gallery/${id}`)
      .then((response)=>{
        setGallery(response.data);
        setLoading(false);
      })
      .catch((error)=> {
        console.log('Error Fetching Gallery: ', error);
        setLoading(false);
      });
    }
  },[id]);

  return (
    <Admin>
        {loading ? (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
            src="https://cdn-icons-png.flaticon.com/512/7560/7560658.png" 
            alt="Loading..." 
            style={{ animation: 'spin 3s linear infinite', width: '50px' }} />
            
            </div>
        <p style={{textAlign: 'center'}}>Loading....</p>
        </div>
      ):(
        <div className='container-fluid my-5'>
            <div className='card'>
                <div className='card-header'>
                    <h2>Model Details</h2>
                </div>
                <div className='card-body'>

                
                
                    

                    <>
                    {model.title && (
                      <>
                        <b>Name:</b> {model.title} <br/>
                      </>
                    )}

                    {model.location && (
                      <>
                        <b>Location:</b> {model.location} <br/>
                      </>
                    )}

                    {model.subLocation && (
                      <>
                        <b>Suburb:</b> {model.subLocation} <br/>
                      </>
                    )}

                    {model.modelDescription && (
                      <>
                        <b>Description:</b> {model.modelDescription} <br/>
                      </>
                    )}

                    {model.age && (
                      <>
                        <b>Age:</b> {model.age} <br/>
                      </>
                    )}

                    {model.weight && (
                      <>
                        <b>Weight:</b> {model.weight} <br/>
                      </>
                    )}

                    {model.height && (
                      <>
                        <b>Height:</b> {model.height} <br/>
                      </>
                    )}

                    {model.hairColor && (
                      <>
                        <b>Hair Color:</b> {model.hairColor} <br/>
                      </>
                    )}

                    {model.phone_no && (
                      <>
                        <b>Phone Number:</b> {model.phone_no} <br/>
                      </>
                    )}

                    {model.nationality && (
                      <>
                        <b>Nationality:</b> {model.nationality} <br/>
                      </>
                    )}

                    {model.dressSize && (
                      <>
                        <b>Dress Size:</b> {model.dressSize} <br/>
                      </>
                    )}

                    {model.price && (
                      <>
                        <b>Price: </b> {model.price} <br />
                      </>
                    )}
                  </>


                    <hr />
                    
                    {model.featuredImage && (
                    <>
                      <h3>Featured Image : </h3>
                      <img
                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${model.featuredImage}`}
                        alt="Featured Image"
                        style={{ width: '100px', height: 'auto' }}
                      />

                      <hr />
                    </>
                    )}

                    {model.video && (
                      <>
                      <h3>Video :</h3>
                      <video width="320" height="240" controls>
                        <source
                          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${model.video}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      <hr />
                      </>
                    )}

                    <h3>Services : </h3>
                    {services.length > 0 ? (
                    services.map((service)=> (
                        <p>{service.name}</p>
                    ))
                    ) : (
                      <p>No Services Found</p>
                    )}

                    <hr />

                    <h3>Rates : </h3>
                   
                    {/* {rates.length > 0 ? (
                        <>
                        <b>Duration: </b>{rates[0].duration} <br/>
                        <b>Incall: </b>{rates[0].incall} <br/>
                        <b>Outcall: </b>{rates[0].outcall} <br/>
                        </>
                    ) : (
                        <span className="empty-value">No rates available</span>
                    )} */}

                    {rates.length > 0 ? (
                      rates.map((rate) => (
                        <div key={rate.id}>
                          <b>Duration: </b>{rate.duration} <br/>
                          <b>Incall: </b>{rate.incall} <br/>
                          <b>Outcall: </b>{rate.outcall} <br/>
                          <br />
                        </div>
                      ))
                    ) : (
                      <span className="empty-value">No rates available</span>
                    )}


                    <hr />

                    
                    {!loading && (
                      <div className='row'>
                        <h3>Gallery:</h3>
                        {gallery.length > 0 ? (
                          gallery.map((imageData) => (
                            <div className='col-sm-3 col-md-3 col-lg-3 col-12 ' key={imageData.id} >
                              <img
                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${imageData.image}`}
                                alt={`Image ${imageData.id}`}
                                style={{ width: '100%', height: 'auto', margin: '5px' }}
                              />
                            
                            </div>
                          ))
                        ) : (
                          <p>No images available in the gallery</p>
                        )}
                      </div>
                    )}


                </div>
            </div>
            
        </div>
       )}
    </Admin>
  )

}

export default ViewDetails;