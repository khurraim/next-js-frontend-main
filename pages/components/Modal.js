import React from 'react';

import { useEffect, useState } from 'react';

import { useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ imageUrl, aboutMe, age, nationality , dressSize, weight, video, id, onClose }) => {

  const [rates, setRates] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  


  useEffect(() => {
    // Fetch rates data from the API using the provided URL
    fetch(`http://127.0.0.1:8000/api/models/rates/${id}`)
      .then(response => response.json())
      .then(data => {
        // Assuming the rates are stored in the 'rates' property of the API response
        setRates(data.rates);
      })
      .catch(error => console.error('Error fetching rates:', error));
  }, [id]);

  useEffect(() => {
    // Fetch gallery images data from the API using the provided URL
    fetch(`http://127.0.0.1:8000/api/models/gallery/${id}`)
      .then(response => response.json())
      .then(data => {
        setGalleryImages(data);
      })
      .catch(error => console.error('Error fetching gallery images:', error));
  }, [id]);



  return (
  
    <div className='custom-modal' >
      
      <div className='modal-content'>
      
        {/* <button className='btn btn-dark ' style={{width: '5%'}} onClick={onClose}>X</button> */}

        <div class="modal-header">
          
          
            
            <button onClick={onClose} type="button" class="btn-close p-2 pb-3 " data-bs-dismiss="modal" aria-label="Close">
              <FontAwesomeIcon icon={faTimes}  />
            </button>
            
          
            
        </div>
      
        
        <div className='row'>

          <div className='col-md-4 col-sm-4 col-lg-4 col-12'>
            
            {video && <video controls poster={imageUrl} style={{ width: '100%' }}>
                <source src={`http://127.0.0.1:8000/storage/${video}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>}
          </div>

          <div className='col-md-4 col-sm-4 col-lg-4 col-12'>
            
          <h3 className='text-uppercase'>Rates</h3>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '10px' }}>
              <thead>
                <tr>
                  <th>Duration</th>
                  <th>Incall</th>
                  <th>Outcall</th>
                </tr>
              </thead>
              <tbody>
                {rates.map(rate => (
                  <tr key={rate.id}>
                    <td>{rate.duration}</td>
                    <td>{rate.incall}</td>
                    <td>{rate.outcall}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          
          
            <br/><br/>
            <h3 className='text-uppercase'>Stats</h3>

            <div className='d-flex'>
              Age {age}
            </div>

            <div className='d-flex'>
              Nationality {nationality}
            </div>

            <div className='d-flex'>
              Dress Size {dressSize}
            </div>

            <div className='d-flex'>
              Weight {weight}
            </div>

          </div>
          
          <div className='col-md-4 col-sm-4 col-lg-4 col-12'>
            <h4>About Me</h4>
            <p>{aboutMe}</p>
          </div>
        </div>

        <div className='row pt-4'>
            {galleryImages.map(image => (
              <div className='col-md-4 col-lg-4 col-sm-4 col-12'>
                <img key={image.id} className='img-fluid'  src={`http://127.0.0.1:8000/storage/${image.image}`} alt={`Gallery Image ${image.id}`} />
              </div>
            ))}
        </div>
       
          
        
        
          
        

      </div>
    </div>
  
)};

export default Modal;





