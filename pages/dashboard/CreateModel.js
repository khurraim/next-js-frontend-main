import React, { useState, useEffect } from 'react';
import Admin from '../layouts/Admin';
import axios from 'axios';
import {toast} from 'react-toastify';

const NewComponent = () => {
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
    phone_no: '',
    hairColor: '',
    bookLink: '',
    status: '',
    priority: '',
  });

  const [loading, setLoading] = useState(true);
  const [selectedFiles,setSelectedFiles] = useState([]);
  const [images,setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

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

      

      if(formData.bookLink) {
        formDataToSend.append('bookLink', formData.bookLink);
      }

      formDataToSend.append('status', 'deactivated');
      
      if(formData.priority) {
        formDataToSend.append('priority', formData.priority);
      }

      // Appending Gallery Files
      selectedFiles.forEach((file) => {
        formDataToSend.append('images[]', file);
      });

      

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/models`, formDataToSend, {
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
        phone_no: '',
        hairColor: '',
        bookLink: '',
        priority: ''
      });
      toast.success("Model Created Successfully");
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('An error occurred while submitting the form.');
    }
  };
  

  return (
    <Admin>
            <div className='container-fluid my-5'>
              <h2>Add New Model</h2>
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                
                <div className='card'>
                    <div className='card-body'>

                        <div className='form-group'>
                            <label className='form-label'>Name</label>
                            <input className='form-control' type="text" name="title" value={formData.title} onChange={handleChange} />
                        </div>

                        <div  className='form-group'>
                            <label  className='form-label'>Location</label>
                            <input  className='form-control' type="text" name="location" value={formData.location} onChange={handleChange} />
                        </div>

                        <div  className='form-group'>
                            <label  className='form-label'>Sub Location</label>
                            <input  className='form-control' type="text" name="subLocation" value={formData.subLocation} onChange={handleChange} />
                        </div>

                        <div  className='form-group' >
                            <label className='form-label'>Model Description</label>
                            <textarea
                                name="modelDescription"
                                value={formData.modelDescription}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>

                        <div  className='form-group' >
                            <label className='form-label'>Age</label>
                            <input
                                type="number"
                                className='form-control'
                                name="age"  // Added the name attribute

                                value={formData.age}
                                onChange={handleChange}
                            />
                        </div>

                        <div  className='form-group' >
                            <label className='form-label'>Weight</label>
                            <input
                                type="number"
                                className='form-control'
                                name="weight"  // Added the name attribute

                                value={formData.weight}
                                onChange={handleChange}
                            />
                        </div>

                        <div  className='form-group' >
                            <label className='form-label'>Height</label>
                            <input
                                type="number"
                                className='form-control'
                                name="height"  // Added the name attribute

                                value={formData.height}
                                onChange={handleChange}
                            />
                        </div>

                        <div  className='form-group' >
                            <label className='form-label'>Phone No</label>
                            <input
                                type="text"
                                className='form-control'
                                name="phone_no"  // Added the name attribute

                                value={formData.phone_no}
                                onChange={handleChange}
                            />
                        </div>

                        <div  className='form-group' >
                            <label className='form-label'>Nationality</label>
                            <input
                                type="text"
                                className='form-control'
                                name='nationality'
                                value={formData.nationality}
                                onChange={handleChange}
                            />
                        </div>

                        <div  className='form-group' >
                            <label className='form-label'>Dress Size</label>
                            <input
                                type="text"
                                className='form-control'
                                name="dressSize"
                                value={formData.dressSize}
                                onChange={handleChange}
                            />
                        </div>

                        <div  className='form-group' >
                            <label className='form-label'>Price</label>
                            <input
                                type="number"
                                name="price"
                                className='form-control'
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div  className='form-group' >
                            <label className='form-label'>Hair Color</label>
                            <input
                                type="text"
                                name="hairColor"
                                className='form-control'
                                value={formData.hairColor}
                                onChange={handleChange}
                            />
                        </div> 

                        <div  className='form-group' >
                            <label className='form-label'>Book Link</label>
                            <input
                                type="text"
                                name="bookLink"
                                className='form-control'
                                value={formData.bookLink}
                                onChange={handleChange}
                            />
                        </div>

                        <div  className='form-group' >
                            <label className='form-label'>Priority </label>
                            <select 
                            name="priority"
                            className='form-control'
                            value={formData.priority} // Set the selected priority
                            onChange={handleChange}>
                              <option>Top 1</option>
                              <option>Top 2</option>
                              <option>Top 3</option>
                              <option>Top 4</option>
                              <option>Top 5</option>
                              <option>Normal</option>
                            </select>
                        </div>                        

                    </div>
                </div>

                {/* Add Rate Section Starts Here */}
                <div className='card'>
                  <div className='card-body'> 
                    <label>Add Rates</label>
                    {formData.addRate.map((rate, index) => (
                        <div  key={index}>

                            <div className='form-group'>
                                <label className='form-label'>Duration</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className='form-control'
                                    value={rate.duration}
                                    onChange={(e) => handleChange(e, index, 'addRate', 'duration')}
                                />
                            </div>
                        
                            <div className='form-group'>
                                <label className='form-label'>In Call</label>
                                <input
                                    type="number"
                                    placeholder="Value"
                                    className='form-control'
                                    value={rate.incall}
                                    onChange={(e) => handleChange(e, index, 'addRate', 'incall')}
                                />
                            </div>

                            <div className='form-group'>
                                <label className='form-label'>OutCall</label>
                                <input
                                    type="number"
                                    placeholder="Value"
                                    className='form-control'
                                    value={rate.outcall}
                                    onChange={(e) => handleChange(e, index, 'addRate', 'outcall')}
                                />
                            </div>

                            <hr />
                        </div>
                    ))}
                    <button className='btn btn-success w-10' type='button' onClick={() => addSection('addRate')}>Add Stat</button>
                    </div>
                </div>
                {/* Add Rate Section Ends Here */}

                

                <div className='card'>
                    <div className='card-body'>
                        
                        <div className='form-group'>
                            <label className='form-label'>Featured Image</label>
                            
                            <input className='form-control' type="file" onChange={handleFeaturedImageChange} />
                        </div>

                        <div className='form-group'>
                            <label className='form-label'>Video</label>
                            <input className='form-control' type="file" onChange={handleVideoChange} />

                        </div>

                    </div>
                </div>

                <div className='card'>
                  <div className='card-body'>
                  <label >Services</label>
                  {formData.services.map((service, index) => (
                    <div className='form-group' key={index}>
                      <input
                        type="text"
                        placeholder="Title"
                        className='form-control'
                        value={service.title}
                        onChange={(e) => handleChange(e, index, 'services', 'name')}
                      />
                    </div>
                  ))}
                  <button className='btn btn-success' type='button' onClick={() => addSection('services')}>Add Service</button>
                  </div>



                </div>

                <div className='card card-body'>
                  
                      <input type="file" className='form-control mb-3' accept="image/*" multiple onChange={handleFileChange} />
                      

                      <div>
                        {images.map((image, index) => (
                          <img key={index} src={image} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px' }} />
                        ))}
                      </div>

                      

                    
                </div>
                


                <button className='btn btn-primary w-100' type="submit">Submit</button>
              </form>
            </div>
          
    </Admin>
  );
};

export default NewComponent;