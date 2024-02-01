import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Admin from '@/pages/layouts/Admin';
import { toast } from 'react-toastify';

const EditHeroSection = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: null,
    previewImage: '',
    link: ''
  });

  useEffect(() => {
    // Fetch data for the specific record by ID
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/form-groups/${id}`)
        .then((response) => {
          const { title, subtitle,link, image } = response.data;
          setFormData({
            title,
            subtitle,
            image: null, // Initialize as null because we don't want to show existing image on load
            previewImage: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${image}`,
            link: link || ''
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //setFormData({ ...formData, [name]: value });

    // Validate link field
    if (name === 'link' && value && !value.startsWith('https://')) {
      // If the link doesn't start with 'https://', prepend it
      setFormData({ ...formData, [name]: `https://${value}` });
    } else {
      // Otherwise, update the value as usual
      setFormData({ ...formData, [name]: value });
    }

  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          image: file,
          previewImage: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the updated data
    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('subtitle', formData.subtitle);
    updatedData.append('link', formData.link);

    if (formData.image) {
      updatedData.append('image', formData.image);
    }

    // if(formData.image.type != 'image/png' &&
    //    formData.image.type != 'image/jpeg' && 
    //    formData.image.type != 'image/jpg')
    // {
    //   console.log(formData.image.type);
    //   toast.error("Only PNG, JPG & JPEG Images Allowed");
    // }

    if (formData.image && 
      (formData.image.type !== 'image/png' &&
       formData.image.type !== 'image/jpeg' && 
       formData.image.type !== 'image/jpg')) {
      console.log(formData.image.type);
      toast.error("Only PNG, JPG & JPEG Images Allowed");
    }
  

    try {
      // Send a PUT request to update the record
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/form-groups/${id}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Record Updated Successfully');
      } else {
        toast.error('Failed to update record. Please try again.');
      }
    } catch (error) {
      console.error('Error updating record:', error);
      toast.error('An error occurred while updating the record.');
    }
  };

  return (
    <Admin>
      <div className="container-fluid my-5">
        <h2>Edit Form Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subtitle">Subtitle</label>
            <input
              type="text"
              className="form-control"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <input
              type="text"
              className="form-control"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control-file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept=".jpeg, .png, .jpg, .gif"
            />
            {formData.previewImage && (
              <img
                src={formData.previewImage}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxWidth: '200px' }}
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Update
          </button>
        </form>
      </div>
    </Admin>
  );
};

export default EditHeroSection;
