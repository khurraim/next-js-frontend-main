import React, { useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

import NewHeader from './components/NewHeader';
import NewFooter from './components/NewFooter';
import ModalSuccess from './components/ModalSuccess';

function Contact() {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone_no: '',
    message: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    name: false,
    email: false,
    //phone_no: false,
    message: false,
  });

  const iMarkStyle = {
    color: '#fff',
    background: 'red',
    padding: '0px 10px'
  }

  const [showModal, setShowModal] = useState(false);

  const offModal = () => {
    setShowModal(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validate fields before submitting
    const errors = validateFields(contact);
    if (Object.values(errors).some((error) => error)) {
      setValidationErrors(errors);
      toast.error("please fill all the fields");
      return;
    }

    try {
      // Send a POST request to your Laravel API endpoint to save the contact
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts`,
        contact
      );
      console.log('Contact stored:', response.data);

      // Success Message
      toast.success('Message Sent Successfully');

      setShowModal(true);

      // Reset The Form
      setContact({ name: '', email: '', phone_no: '', message: '' });
      setValidationErrors({
        name: false,
        email: false,
        //phone_no: false,
        message: false,
      });
    } catch (error) {
      console.error('Error storing contact:', error);
      // Optionally, handle errors
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });

    // Clear validation error when user types
    setValidationErrors({ ...validationErrors, [name]: false });
  };

  // const validateFields = (data) => {
  //   const errors = {};
  //   Object.keys(data).forEach((key) => {
  //     if (!data[key]) {
  //       errors[key] = true;
  //     } else {
  //       errors[key] = false;
  //     }
  //   });
  //   return errors;
  // };

  const validateFields = (data) => {
    const errors = {};
    Object.keys(data).forEach((key) => {
      if (key !== 'phone_no' && !data[key]) {
        errors[key] = true;
      } else {
        errors[key] = false;
      }
    });
    return errors;
  };

  return (
<>

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
          <h1 className="sub-heading mb-4">CONTACT US</h1>
          <p>We’re here to help and answer any question you might have.</p>
          <p className="mt-4">*Required field</p>
          <form className="custom-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">

                  <label className="form-label">
                    {validationErrors.name && (<><span style={iMarkStyle}>!</span>&nbsp;&nbsp;</>)}
                    Name*
                  </label>
                  
                  <input
                   type="text" 
                   className={`form-control ${
                    validationErrors.name ? 'border-red' : ''
                  }`}
                    value={contact.name}
                    onChange={handleChange}
                    name='name'
                     />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label className="form-label">
                  {validationErrors.email && (<><span style={iMarkStyle}>!</span>&nbsp;&nbsp;</>)}
                    email*
                  </label>
                  <input 
                  type="email"
                  //  className="form-control" 
                   className={`form-control ${
                    validationErrors.email ? 'border-red' : ''
                  }`}
                    name='email'
                    value={contact.email}
                    onChange={handleChange}
                    
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label className="form-label">phone number</label>
                  <input 
                  type="text" 
                   className="form-control" 
                  
                    name='phone_no'
                    value={contact.phone_no}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="form-label">
                    {validationErrors.message && (<><span style={iMarkStyle}>!</span>&nbsp;&nbsp;</>)}
                    message*
                  </label>
                  <textarea 
                  // className="form-control" 
                  rows={4} 
                  className={`form-control ${
                    validationErrors.message ? 'border-red' : ''
                  }`}
                  type='text'
                  
                  name='message'
                  value={contact.message}
                  onChange={handleChange} 
                  />
                </div>
              </div>
              {Object.values(validationErrors).some((error) => error) && (
                <div className='d-flex align-items-center my-3'>
                <span style={iMarkStyle}>!</span>&nbsp;&nbsp;  
                  Please fill in all the required fields.
                </div>
              )}
              <div className="col-12">
                <button type="submit" className="enter" data-bs-toggle="modal" data-bs-target="#exampleModal">submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </main>
  {showModal && (
    <ModalSuccess onClose={offModal}/>
  )}
  
  <NewFooter/>
</>
  );
}

export default Contact;
