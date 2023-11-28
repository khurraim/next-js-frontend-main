import React, { useState } from 'react';
import axios from 'axios';
import Layout from './layouts/Layout';
import { toast } from 'react-toastify';

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
    phone_no: false,
    message: false,
  });

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

      // Reset The Form
      setContact({ name: '', email: '', phone_no: '', message: '' });
      setValidationErrors({
        name: false,
        email: false,
        phone_no: false,
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

  const validateFields = (data) => {
    const errors = {};
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        errors[key] = true;
      } else {
        errors[key] = false;
      }
    });
    return errors;
  };

  return (
    <Layout>
      {/* Your existing JSX code */}

      <div class="text-center">
        <div class="top-card">
          <div class="custom-card red">
            <img src="/images/model.jpg" alt="" />
          </div>
        </div>
      </div>

      <div class="about-us-text">

          <h4>CONTACT US</h4>
          <div class="mt-3">We’re here to help and answer any question you might have.</div>
          <div class="mt-3">*required field</div>

          <div class="filters mt-5">
            <form onSubmit={handleSubmit}>
              {/* ... existing form fields ... */}
              <div className='row'>
                <div className='col-md-4'>
                  <label htmlFor='name'>NAME*</label>
                  <input
                    value={contact.name}
                    onChange={handleChange}
                    name='name'
                    className={`custom-select ${
                      validationErrors.name ? 'border-red' : ''
                    }`}
                    type='text'
                  />
                </div>
                <div className='col-md-4'>
                  <label htmlFor='email'>Email*</label>
                  <input
                    className={`custom-select ${
                      validationErrors.email ? 'border-red' : ''
                    }`}
                    type='email'
                    name='email'
                    value={contact.email}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-md-4'>
                  <label htmlFor='phone_no'>PHONE NUMBER</label>
                  <input
                    className={`custom-select ${
                      validationErrors.phone_no ? 'border-red' : ''
                    }`}
                    type='text'
                    name='phone_no'
                    value={contact.phone_no}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-md-12 mt-3'>
                  <label htmlFor='message'>MESSAGE*</label>
                  <textarea
                    className={`custom-select w-100 ${
                      validationErrors.message ? 'border-red' : ''
                    }`}
                    type='text'
                    rows='4'
                    name='message'
                    value={contact.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div>
                  <button className='custom-text-input mt-3' style={{ paddingRight: '300px' }}>
                    SEND
                  </button>
                </div>
              </div>
            </form>
          </div>

      </div>


    </Layout>
  );
}

export default Contact;
