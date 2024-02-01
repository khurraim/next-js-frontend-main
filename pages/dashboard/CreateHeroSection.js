import React, { useState, useEffect } from 'react';
import Admin from '../layouts/Admin';
import axios from 'axios';
import {toast} from 'react-toastify'

function CreateHeroSection() {
  const [formGroups, setFormGroups] = useState([
      { 
        title: '', 
        subtitle: '', 
        image: null, 
        previewImage: '' 
      }
    ]);

  const handleAddGroup = () => {
    setFormGroups([...formGroups, { title: '', subtitle: '', image: null, previewImage: '' }]);
  };

  const handleRemoveGroup = (index) => {
    const updatedGroups = [...formGroups];
    updatedGroups.splice(index, 1);
    setFormGroups(updatedGroups);
  };

  const handleImageChange = (index, e) => {
    const updatedGroups = [...formGroups];
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updatedGroups[index].image = file;
        updatedGroups[index].previewImage = e.target.result;
        setFormGroups(updatedGroups);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleInputChange = (index, field, value) => {
  //   const updatedGroups = [...formGroups];
  //   updatedGroups[index][field] = value;
  //   setFormGroups(updatedGroups);
  // };

  const handleInputChange = (index, field, value) => {
    const updatedGroups = [...formGroups];
  
    // Validate link field
    if (field === 'link' && value && !value.startsWith('https://')) {
      // If the link doesn't start with 'https://', prepend it
      updatedGroups[index][field] = `https://${value}`;
    } else {
      // Otherwise, update the value as usual
      updatedGroups[index][field] = value;
    }
  
    setFormGroups(updatedGroups);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an array to store promises for each API request
    //const apiRequests = [];

    // Create an array to store promises for each API request
    const apiRequests = [];

    // Check if any title or subtitle fields are empty
    const isAnyEmpty = formGroups.some(group => !group.title || !group.subtitle || !group.image);

    if (isAnyEmpty) {
      toast.error('Title, Subtitle and Image fields are required.'); 
      return;
    }

    // Send each group to your Laravel backend to save
    for (const group of formGroups) {
      const formData = new FormData();
      
      formData.append('title', group.title);
      formData.append('subtitle', group.subtitle);
      formData.append('link', group.link);

      // Append the image only if it's not null
      if (group.image) {
        formData.append('image', group.image);
      }

      // Push the API request promise into the array
      apiRequests.push(
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/form-groups`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
    }

    try {
      // Wait for all API requests to complete
      await Promise.all(apiRequests);

      // After all groups are saved, you can optionally clear the form
      setFormGroups([{ title: '', subtitle: '', image: null, previewImage: '' }]);

      toast.success("Saved Sucessfully");

    } catch (error) {
      console.error('Error saving group:', error);
    }
  };

  return (
    <Admin>
      <div className='container-fluid my-5'>
        <form onSubmit={handleSubmit}>
          {formGroups.map((group, index) => (
            <div className='card' key={index}>
              <div className='card-body'>
                <div className='form-group'>
                  <label className='form-label'>Enter Title: </label>
                  <input
                    type="text"
                    className='form-control'
                    placeholder="Title"
                    value={group.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label className='form-label'>Enter SubTitle: </label>
                  <input
                    type="text"
                    className='form-control'
                    placeholder="Subtitle"
                    value={group.subtitle}
                    onChange={(e) => handleInputChange(index, 'subtitle', e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label className='form-label'>Enter Link: </label>
                  <input
                    type="text"
                    className='form-control'
                    placeholder="Link"
                    value={group.link}
                    onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                  />
                </div>


                <div className='form-group'>
                  <label className='form-label'>Background Image : </label>
                  <input
                    type="file"
                    name="image"
                    className='form-control'
                    onChange={(e) => handleImageChange(index, e)}
                    accept=".jpeg, .png, .jpg, .gif"
                  />
                  {group.previewImage && (
                    <img
                      src={group.previewImage}
                      alt="Preview"
                      className="img-thumbnail mt-2"
                      style={{ maxWidth: '200px' }}
                    />
                  )}
                </div>

                {index > 0 && (
                  <button className='btn btn-danger' type="button" onClick={() => handleRemoveGroup(index)}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button type="button" className='btn btn-success mr-2' onClick={handleAddGroup}>
            Add Group
          </button>
          <button className='btn btn-primary' type="submit">Submit</button>
        </form>
      </div>
    </Admin>
  );
}

export default CreateHeroSection;

