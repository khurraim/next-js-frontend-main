import React, { useState, useEffect } from 'react';
import Layout from './layouts/Layout';
import axios from 'axios';
import {toast} from 'react-toastify';
//import ModalSuccess from './components/ModalSuccess';
import WWSModal from './components/WWSModal';
import NewHeader from './components/NewHeader';
import NewFooter from './components/NewFooter';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Submit Button Styles 
const submitButtonStyle = {
  paddingRight: 300, 
  background: '#333', 
  color: '#fff',
  border: 'none',
  fontSize: '16px',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingRight: '75px',
  paddingLeft: '30px'
};

const iMarkStyle = {
  color: '#fff',
  background: 'red',
  padding: '0px 10px',
  marginRight: '10px'
}

const WorkWithUs = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    nationality: '',
    dressSize: '',
    age: '',
    price: '',
    weight: '',
    height: '',
    phone_no: '',
    hairColor: '',
  });

  const [loading, setLoading] = useState(true);
  const [selectedFiles,setSelectedFiles] = useState([]);
  const [images,setImages] = useState([]);

  const [formSubmitted, setFormSubmitted] = useState(false); // New state variable
  const [showSuccessModal, setShowSuccessModal] = useState(false);



  const handleFileChange = (e) => {
    
    //const files = Array.from(e.target.files);
    //setSelectedFiles(files);

    const files = Array.from(e.target.files).slice(0, 4); // Only take the first 4 files
    setSelectedFiles(files)

    const filesArray = files.map((file) => URL.createObjectURL(file));
    setImages(filesArray);
  };
  

  const handleChange = (e, index, section, subfield) => {
  const updatedData = { ...formData };
  
    if (section === 'addRate' || section === 'stats' || section === 'services') {
      updatedData[section][index][subfield] = e.target.value;
    } else if (section === 'gallery') {
      updatedData[section][index][subfield] = e.target.files[0];
    } else if (subfield === 'featuredImage' || subfield === 'video') {
      updatedData[subfield] = e.target.files[0];
    } else {
      //updatedData[e.target.name] = e.target.value;
      if (e.target.name === 'age') {
        updatedData.age = e.target.value;
      } else if (e.target.name === 'nationality') {
        updatedData['nationality'] = e.target.value;
      } else if (e.target.name === 'dressSize') {
        updatedData['dressSize'] = e.target.value;
      }  else {
        updatedData[e.target.name] = e.target.value;
      }
    }
  
    setFormData(updatedData);

  };

  
  const handleRemoveImage = (index) => {
    const updatedFiles = [...selectedFiles];
    const updatedImages = [...images];

    updatedFiles.splice(index, 1);
    updatedImages.splice(index, 1);

    setSelectedFiles(updatedFiles);
    setImages(updatedImages);
  };

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    if(formData.hairColor === '' ||
    formData.nationality === '' ||
    formData.age === '' ||
    formData.height === '' ||
    formData.title === '' ||
    formData.phone_no === '' ||
    formData.location === '' )
    {
      toast.error('Please fill all fields');
    }

    console.log(selectedFiles);

    if (selectedFiles.length > 4) {
      toast.error('You can only upload a maximum of 4 pictures.');
      return;
    }
  
    try {

      
      const formDataToSend = new FormData();
  

      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          for (let i = 0; i < formData[key].length; i++) {
            const subData = formData[key][i];
            for (const subKey in subData) {
              if (key === 'gallery' && subKey === 'image' && subData[subKey]) {
                const images = subData[subKey];
                for (let j = 0; j < images.length; j++) {
                  formDataToSend.append(`gallery[${i}][image][]`, images[j]);
                }
              } else if (subData[subKey]) {
                formDataToSend.append(`${key}[${i}][${subKey}]`, subData[subKey]);
              }
            }
          }
        } else if (formData[key]) { // Make sure the key is not null
          if (key === 'featuredImage') {
            formDataToSend.append('featuredImage', formData[key]);
          } else if (key === 'video') {
            formDataToSend.append('video', formData[key]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      }
      
    
  
     

      // Appending Gallery Files
      selectedFiles.forEach((file) => {
        formDataToSend.append('images[]', file);
      });

      if (selectedFiles.length === 0) {
        toast.error('Please upload at least one photo.');
        return;
      }

      

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/modelsByUser`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });
  
      setFormData({
        title: '',
        location: '',
        nationality: '',
        dressSize: '',
        age: '',
        price: '',
        weight: '',
        height: '',
        phone_no: '',
        hairColor: ''
      });
      toast.success("Model Created Successfully");
      setShowSuccessModal(true);
      // Reset the form validation state
    setFormSubmitted(false);
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('An error occurred while submitting the form.');
    }
  };
  

  return (
<>

{/* {showSuccessModal && <ModalSuccess onClose={() => setShowSuccessModal(false)} />} */}
{showSuccessModal && <WWSModal onClose={() => setShowSuccessModal(false)} />}
<NewHeader/>
  <main className="main-wrapper innrerPages-waper">
  <div className="container-lg inner-product">
    <div className="row px-lg-5">
      <div className="col-lg-7 mx-auto">
        <div href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" className="product-card">
          <div className="img-wraper">
            <img className="img-fluid" src="images/about.png" />
            {/* <div class="img-bage"><span>new girl</span></div> */}
          </div>
        </div>
        <div className="my-5">
          <h1 className="sub-heading mb-4">WORK WITH US</h1>
          <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,</p>
          <p>Once we accepted you in our big family we’ll do our best to help you in case you need any advice or assistance.</p>
          <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,</p>
          <h4 className="filed-text">Please send in your application by filling in the form below and we will contact you shortly.</h4>
          <form className="custom-form"  encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label">
                    {formSubmitted && formData.title === '' && <span style={iMarkStyle}>!</span>}  Name*</label>
                    <input 
                    type="text"
                    name="title" 
                    className={`form-control  ${formSubmitted && formData.title === '' ? 'border-red' : ''}`}
                    value={formData.title} 
                    onChange={handleChange}  
                    />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label">
                  {formSubmitted && formData.phone_no === '' && <span style={iMarkStyle}>!</span>}   
                    phone number*
                  </label>
                  <input 
                  type="text" 
                  className={` form-control ${formSubmitted && formData.phone_no === '' ? 'border-red' : ''}`} 
                  name="phone_no"
                value={formData.phone_no}
                onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label">
                  {formSubmitted && formData.age === '' && <span style={iMarkStyle}>!</span>}   
                    age*
                  </label>
                  <input 
                  type="number" 
                  className={`form-control ${formSubmitted && formData.age === '' ? 'border-red' : ''}`}
                  name="age" 
                  value={formData.age} 
                  onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label">
                  {formSubmitted && formData.location === '' && <span style={iMarkStyle}>!</span>}  
                    location*
                  </label>
                  <input 
                  type="text" 
                  className={`form-control ${formSubmitted && formData.location === '' ? 'border-red' : ''}`}
                  name="location" 
              value={formData.location} 
              onChange={handleChange}
                   />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label">
                  {formSubmitted && formData.nationality === '' && <span style={iMarkStyle}>!</span>}  
                    nationality*
                  </label>
                  <input 
                  type="text" 
                  className={`form-control ${formSubmitted && formData.nationality === '' ? 'border-red' : ''}`}
                  name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                   />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label">
                  {formSubmitted && formData.dressSize === '' && <span style={iMarkStyle}>!</span>} 
                    dress size*
                  </label>
                  <input 
                  type="text"
                  className={`form-control ${formSubmitted && formData.dressSize === '' ? 'border-red' : ''}`}
                  name="dressSize"
                value={formData.dressSize}
                onChange={handleChange}
                   />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label">
                  {formSubmitted && formData.height === '' && <span style={iMarkStyle}>!</span>} 
                    height*
                    </label>
                  <input 
                  type="text" 
                  className={` form-control ${formSubmitted && formData.height === '' ? 'border-red' : ''}`} 
                  name="height"
                value={formData.height}
                onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label">
                  {formSubmitted && formData.hairColor === '' && <span style={iMarkStyle}>!</span>} 
                    hair colour*
                  </label>
                  <input 
                  type="text" 
                  className={` form-control ${formSubmitted && formData.hairColor === '' ? 'border-red' : ''}`}
                  name="hairColor"
                  value={formData.hairColor}
                  onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="form-label my-4">
                    {formSubmitted && images.length === 0 && (<span style={iMarkStyle}>!</span>)}
                    upload four photos*
                  </label>
                  <div className="upload-photo">
                    <button type="button" className="enter">Uppload</button>
                    <input 
                    type="file" 
                    className=" form-control" 
                    accept="image/*" 
                    multiple 
                    onChange={handleFileChange}  
                    />
                  </div>
                </div>
                <div className="uploaded-picture">
                {images.map((image, index) => (
                  <>
                  <div className="img-wraper">
                    <button className type="button" onClick={() => handleRemoveImage(index)}>
                      {/* <i className="fa fa-times" /> */}
                      <FontAwesomeIcon icon={faTimes}  />
                    </button>
                    <img src={image} />
                  </div>
                  
                  </>
                  ))}
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="enter" data-bs-toggle="modal" data-bs-target="#exampleModal">submit</button>
              </div>
            </div>
          </form>

      

          {formSubmitted && 
            (formData.hairColor === '' || 
            formData.nationality === '' || 
            formData.age === '' || 
            formData.height === '' || 
            formData.title === '' ||  
            formData.phone_no === '' || 
            formData.location === '' ||
            images.length === 0) ? 
            <div className='d-flex align-items-center my-3'>
              <span style={iMarkStyle}>!</span> 
              <p className='text-uppercase text-danger mt-3'>
                  Please fill in all required fields
              </p>
            </div> 
            : null}


          <ul className="my-5">
            <li>By using the form above to upload your details you are confirming the following:</li>
            <li>You are legally able to work in the UK or whatever country you are based in.</li>
            <li>You are of legal age to work in that country.</li>
            <li>You are self-employed and that you are responsible for your own tax and government payments.</li>
          </ul>
          <p>Due to the amount of applicants looking to join our gallery of London escorts that submit to us their details we will only be contacting the successful ones.</p>
          <p>If you do not hear from us within a couple of weeks thenl am afraid that you should look at your application as unsuccessful, if this is the case then please review what
            you have sent us and see where you can make any improvements.</p>
          <p>You do not need a professional portfolio to be able to Submit your details but you will need professional pictures to be able to appear on our websites, if you do not
            have any professional photos then one of the team will gladly recommend to you some gredt photographers who can help you on your way.</p>
          <p>If your application is successtul then you are agreeing that this company can use your photos to promote you on this site or any others in the group, We may even use
            your profile to promote you on other websites or publications that we advertise in/on.</p>
          <p>For our service to you we take a commission this is based on us arranging your dates, anything sexual implied on this or any other of our websites is purely
            entertainment and does not represent what we offer.</p>
        </div>
      </div>
    </div>
  </div>
</main>

<NewFooter/>
      

</>                
          
    
  );
};

export default WorkWithUs;