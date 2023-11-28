import React, { useState } from 'react';
import Admin from '../layouts/Admin';
import { toast } from 'react-toastify';

const CreateFAQForm = () => {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('FAQ created successfully');
        // You can redirect or perform any other action upon successful creation
        toast.success("FAQ Added Successfully");
        setFormData({
            question: '',
            answer: '',
          });
      } else {
        console.error('Failed to create FAQ');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error("Error Creating FAQ");
    }
  };

  return (
    <Admin>
    <div className='container-fluid my-5'>
      <div className='card card-body'>
          <div className='card-header'>
              <h2>Create FAQ</h2>
          </div>
          <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label  className='form-label'>Question:</label>
          <input
            type="text"
            name="question"
            className='form-control'
            value={formData.question}
            onChange={handleChange}
          />
        </div>
        <div  className='form-group'>
          <label  className='form-label'>Answer:</label>
          <textarea
            name="answer"
            className='form-control'
            value={formData.answer}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button className='btn btn-primary' type="submit">Create FAQ</button>
        </div>
          </form>
      </div>
      
      
    </div>
    </Admin>
  );
};

export default CreateFAQForm;
