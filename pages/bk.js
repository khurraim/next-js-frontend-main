import React, { useState, useEffect } from 'react';
import Layout from './layouts/Layout';
import axios from 'axios';
import {toast} from 'react-toastify';

const WorkWithUs = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    subLocation: '',
    modelDescription: '',
    nationality: '',
    dressSize: '',
    age: '',
    price: '',
    addRate: [{ duration: '', incall : '', outcall: ''}],
    stats: [{ name: '', value: '' }],
    featuredImage: null,
    video: null,
    services: [{ name: ''}],
    weight: '',
    height: '',
    phone_no: ''
  });

  const [loading, setLoading] = useState(true);
  const [selectedFiles,setSelectedFiles] = useState([]);
  const [images,setImages] = useState([]);

  const [formSubmitted, setFormSubmitted] = useState(false); // New state variable


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

  const handleFeaturedImageChange = (e) => {
    const updatedData = { ...formData };
    updatedData.featuredImage = e.target.files[0];
    setFormData(updatedData);
  };
  
  const handleVideoChange = (e) => {
    const updatedData = { ...formData };
    updatedData.video = e.target.files[0];
    setFormData(updatedData);
  };

  const addSection = (section) => {
    const updatedData = { ...formData };
  
    if (section === 'addRate') {
      updatedData[section].push({ duration: '', incall: '', outcall: '' });
    } else if (section === 'stats') {
      updatedData[section].push({ name: '', value: '' });
    } else if (section === 'services') {
      updatedData[section].push({ name: '' });
    } 
  
    setFormData(updatedData);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    console.log(selectedFiles);

    if (selectedFiles.length > 4) {
      toast.error('You can only upload a maximum of 4 pictures.');
      return;
    }

    // if title is empty
    if(formData.title === '')
    {
        toast.error('Title is empty');
        return;
    }

    // if location is empty
    if(formData.location === '')
    {
        toast.error('location is empty');
        return;
    }

    // if description is empty
    if(formData.modelDescription === '')
    {
        toast.error('Description is empty');
        return;
    }

    if(formData.weight === '')
    {
      toast.error('Weight is empty');
      return;
    }

     // Validate if the Featured Image is empty
    if (!formData.featuredImage) {
      toast.error('Featured Image is empty');
      return;
    }

    // Validate if the Video is empty
    if (!formData.video) {
      toast.error('Video is empty');
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
      
      // Append the featuredImage
      if (formData.featuredImage) {
        formDataToSend.append('featuredImage', formData.featuredImage);
      }
  
      // Append the video
      if (formData.video) {
        formDataToSend.append('video', formData.video);
      }

      // Appending Gallery Files
      selectedFiles.forEach((file) => {
        formDataToSend.append('images[]', file);
      });

      

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/modelsByUser`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });
  
      setFormData({
        title: '',
        location: '',
        subLocation: '',
        modelDescription: '',
        nationality: '',
        dressSize: '',
        age: '',
        price: '',
        addRate: [{ duration: '', incall : '', outcall: ''}],
        stats: [{ name: '', value: '' }],
        featuredImage: null,
        video: null,
        services: [{ name: ''}],
        weight: '',
        height: '',
        phone_no: ''
      });
      toast.success("Model Created Successfully");
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('An error occurred while submitting the form.');
    }
  };
  

  return (
    <Layout>

      <div className="text-center">
        <div className="top-card">
          <div className="custom-card red">
            <img src="/images/model.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className="about-us-text">
  <h4>WORK WITH US</h4>
  <div className="mt-3">We’re here to help and answer any question you might have.</div>
  <div className="mt-3">*required field</div>
  <div className="filters mt-5">
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="text-left">
        <div className="row">
          <div className="col-md-6">
            <label className='text-uppercase  pb-2 pt-2'>Name</label>
            <input 
            type="text" 
            name="title" 
            className={`custom-select form-control ${formSubmitted && formData.title === '' ? 'border-danger' : ''}`}
 
            value={formData.title} 
            onChange={handleChange} 
            />
          </div>
          <div className="col-md-6 ">
            <label  className='text-uppercase pb-2 pt-2'>Location</label>
            <input  
            className={`custom-select form-control ${formSubmitted && formData.location === '' ? 'border-danger' : ''}`}
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label  className='text-uppercase pb-2 pt-2'>Sub Location</label>
            <input  
                  className={`custom-select form-control ${formSubmitted && formData.subLocation === '' ? 'border-danger' : ''}`}
                  type="text" 
            name="subLocation" 
            value={formData.subLocation} 
            onChange={handleChange}/>
          </div>
          <div className="col-md-6">
            <label  className='text-uppercase pb-2 pt-2'>age</label>
            <input  
                  className={`custom-select form-control ${formSubmitted && formData.age === '' ? 'border-danger' : ''}`}
                  type='number' 
            name="age" 
            value={formData.age} 
            onChange={handleChange}
            />
          </div>
          <div className='col-md-12'>
            <label  className='text-uppercase pb-2 pt-2'>description</label>
            <textarea
              name="modelDescription"
              value={formData.modelDescription}
              onChange={handleChange}
              className={`custom-select form-control ${formSubmitted && formData.modelDescription === '' ? 'border-danger' : ''}`}

            />
          </div>
          <div className="col-md-6">
            <label htmlFor className="text-uppercase pb-2 pt-2">weight*</label>
            
            <input
            type="number"
            className={`custom-select form-control ${formSubmitted && formData.weight === '' ? 'border-danger' : ''}`}

            name="weight"  

            value={formData.weight}
            onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor className="text-uppercase pb-2 pt-2">dress size*</label>
            <input
              type="text"
              className={`custom-select form-control ${formSubmitted && formData.dressSize === '' ? 'border-danger' : ''}`}

              name="dressSize"
              value={formData.dressSize}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor className="text-uppercase pb-2 pt-2">nationality*</label>
            <input
              type="text"
              className={`custom-select form-control ${formSubmitted && formData.nationality === '' ? 'border-danger' : ''}`}

              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor className="text-uppercase pb-2 pt-2">price*</label>
            <input
              type="text"
              className={`custom-select form-control ${formSubmitted && formData.price === '' ? 'border-danger' : ''}`}
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className='col-md-6'>
          <label htmlFor className="text-uppercase pb-2 pt-2">height*</label>
            <input
              type="text"
              className={`custom-select form-control ${formSubmitted && formData.height === '' ? 'border-danger' : ''}`}
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>

          <div className='col-md-6'>
          <label htmlFor className="text-uppercase pb-2 pt-2">phone no*</label>
            <input
              type="text"
              className={`custom-select form-control ${formSubmitted && formData.phone_no === '' ? 'border-danger' : ''}`}
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
            />
          </div>

          <div className='col-md-6'>
            <label htmlFor className="text-uppercase pb-2 pt-2">Featured Image*</label>
            <input className='form-control custom-select' type="file" onChange={handleFeaturedImageChange} />
          </div>

          <div className='col-md-6'>
            <label htmlFor className="text-uppercase pb-2 pt-2">video*</label>
            <input className='form-control custom-select' type="file" onChange={handleVideoChange} />
          </div>

          <div className='col-md-12'>
            <div className='d-flex justify-content-between my-3'>
            <label className='mt-2 pb-2 pt-2'>Add Rates</label>
            <button style={{color: "#fff", background: "#333", borderRadius: '0px'}} className='btn  w-10' type='button' onClick={() => addSection('addRate')}>Add Stat</button>
            </div>
            
                      {formData.addRate.map((rate, index) => (
                          <div  key={index}>

                              <div className='form-group'>
                                  <label className='form-label pb-2 pt-2'>Duration</label>
                                  <input
                                      type="text"
                                      placeholder="Name"
                                      className='form-control custom-select'
                                      value={rate.duration}
                                      onChange={(e) => handleChange(e, index, 'addRate', 'duration')}
                                  />
                              </div>
                          
                              <div className='form-group'>
                                  <label className='form-label pb-2 pt-2'>In Call</label>
                                  <input
                                      type="text"
                                      placeholder="Value"
                                      className='form-control custom-select'
                                      value={rate.incall}
                                      onChange={(e) => handleChange(e, index, 'addRate', 'incall')}
                                  />
                              </div>

                              <div className='form-group'>
                                  <label className='form-label pb-2 pt-2'>OutCall</label>
                                  <input
                                      type="text"
                                      placeholder="Value"
                                      className='form-control custom-select'
                                      value={rate.outcall}
                                      onChange={(e) => handleChange(e, index, 'addRate', 'outcall')}
                                  />
                              </div>

                              <hr />
                          </div>
                      ))}
                      
          </div>
          
          <div className='col-md-12'>

              <div className='d-flex justify-content-between my-3'>
              <label className='mt-2 pb-2 pt-2'>Services</label>
              <button className='btn float-right'  style={{color: "#fff", background: "#333", borderRadius: '0px'}} type='button' onClick={() => addSection('services')}>Add Service</button>
              </div>
              
                  {formData.services.map((service, index) => (
                    <div className='form-group' key={index}>
                      <input
                        type="text"
                        placeholder="Title"
                        className='form-control custom-select  pb-2 pt-2'
                        value={service.title}
                        onChange={(e) => handleChange(e, index, 'services', 'name')}
                      />
                    </div>
                  ))}
                {/* <button className='btn btn-success' type='button' onClick={() => addSection('services')}>Add Service</button> */}
          </div>

          <div className="col-md-6">
            <label htmlFor className="text-uppercase pb-2 pt-2">upload four photos*</label>
            {/* <input type="file" className="custom-select form-control" /> */}
            <input 
            type="file" 
            className={`form-control custom-select mb-3 ${formSubmitted && selectedFiles.length === 0 ? 'border-danger' : ''}`}

            accept="image/*" 
            multiple 
            onChange={handleFileChange} 
            />
          </div>
          <div className="row uploaded-imgs mt-4">
          {images.map((image, index) => (
                          <img key={index} src={image} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px' }} />
                        ))}
            
          </div>


          <div>


            <button className="custom-text-input mt-3" style={{paddingRight: 300}}>SUBMIT</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>


            
          
    </Layout>
  );
};

export default WorkWithUs;