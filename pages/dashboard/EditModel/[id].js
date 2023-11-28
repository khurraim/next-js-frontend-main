import React, { useState, useEffect } from 'react';
import Admin from '@/pages/layouts/Admin';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const EditModel = () => {
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '' });
  
  const [rates, setRates] = useState([]);
  const [newRate, setNewRate] = useState({
    duration: '', 
    incall: '', 
    outcall: ''
  });

  const [gallery, setGallery] = useState([]);

  const [images,setImages] = useState([]);
  const [selectedFiles,setSelectedFiles] = useState([]);

  const [videoFile, setVideoFile] = useState(null);

  const router = useRouter();
  const { id } = router.query;

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
  

  const handleServiceChange = (e, index) => {
    const updatedServices = [...services];
    updatedServices[index][e.target.name] = e.target.value;
    setServices(updatedServices);
  };

  // Handle Change for text fields
  const handleChange = (e, field) => {
    setModel({ ...model, [field]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const filesArray = files.map((file) => URL.createObjectURL(file));
    setImages(filesArray);
  };

  const addService = () => {
    // Only add a new service if it has a name
    if (newService.name.trim() !== '') {
      setServices([...services, newService]);
      setNewService({ name: '' });
    }
  };

  // remove service (static)
  const removeService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  

  const addRate = () => {
    if (newRate.duration.trim() != '' || newRate.incall.trim() != '' || newRate.outcall.trim() != '') {
      setRates([...rates, newRate]);
      setNewRate({ 
         duration: '', 
         incall: '', 
         outcall: ''
      });   
    }
  }

  const handleRateChange = (e, index, field) => {
    const updatedRates = [...rates];
    updatedRates[index][field] = e.target.value;
    setRates(updatedRates);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  // Remove rates which are static 
  const removeRates = (index) => {
    const updatedRates = [...rates];
    updatedRates.splice(index,1);
    setRates(updatedRates);
  }

  // Remove rates which are dynamic
  const removeRatesDynamic = (id) => {
    if(id) {
      axios
      //.delete(`http://127.0.0.1:8000/api/rate/${id}`)
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/rate/${id}`)
      .then(() => {
        const updatedRates = rates.filter((rate) => rate.id !== id);
        setRates(updatedRates);
        toast.success("Rate Deleted Successfully");
      })
      .catch((error) => {
        console.error('Error deleting rate:', error);
        toast.error('An error occurred while deleting the rates.');
      });
    }
  }

  // Remove gallery image 
  const handleDeleteImage = (id) => {
    if(id) {
      axios
      //.delete(`http://127.0.0.1:8000/api/gallery/${id}`)
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}`)
      .then(()=>{
        const updatedGallery = gallery.filter((galleryImage) => galleryImage.id !== id);
        setGallery(updatedGallery);
        toast.success("Gallery Image deleted successfully");
      })
      .catch( (error) => {
        console.error('Error deleting rate:', error);
        toast.error('An error occurred while deleting the gallery image.');
      });
    }
  }


  const removeServiceDynamic = (id) => {
    if(id) {
      axios
      //.delete(`http://127.0.0.1:8000/api/service/${id}`)
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/service/${id}`)
      .then(() => {
        // After a successful deletion from the backend, remove it from the state
        const updatedServices = services.filter((service) => service.id !== id);
        setServices(updatedServices);
        toast.success('Service removed successfully.');
      })
      .catch((error) => {
        console.error('Error deleting service:', error);
        toast.error('An error occurred while deleting the service.');
      });
    }
  }

  


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', model.title);
      formData.append('location', model.location);
      formData.append('subLocation', model.subLocation);
      formData.append('description', model.modelDescription);
      formData.append('age', model.age);
      formData.append('nationality', model.nationality);
      formData.append('dressSize', model.dressSize);
      formData.append('price', model.price);
      formData.append('weight', model.weight);
      formData.append('height', model.height);
      formData.append('phone_no', model.phone_no);
      
      // Append featured image only if a new image is selected
      if (imageFile) {
        formData.append('featuredImage', imageFile);
      }

      // Append the video file to the formData, if video is updated
      if (videoFile) {
        formData.append('video', videoFile);
      }
      

      // Append services to the form data
      services.forEach((service, index) => {
        formData.append(`services[${index}][name]`, service.name);
        formData.append(`services[${index}][id]`, service.id);
      });

      
      // Append rates to the form data
      rates.forEach((rate, index) => {
        formData.append(`addRate[${index}][id]`, rate.id);
        formData.append(`addRate[${index}][duration]`, rate.duration);
        formData.append(`addRate[${index}][incall]`, rate.incall);
        formData.append(`addRate[${index}][outcall]`, rate.outcall);
      });

      selectedFiles.forEach((file) => {
        formData.append('images[]', file);
      });

      console.log(formData);

      //await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/models/${id}`)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/models/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Model updated successfully!');
    } catch (error) {
      console.error('Error updating model:', error);
      toast.error('An error occurred while updating the model.');
    }
  };

  

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
        <h2>Your Form</h2>
        <form encType="multipart/form-data">
          {/* ... (other form fields) */}

          <div className='card card-body'>
            <div className='form-group'>
              <label className='form-label'>Title</label>
              <input
                className='form-control'
                type="text"
                name="title"
                value={model.title || ''}
                onChange={(e) => handleChange(e, 'title')}
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Location</label>
              <input
                className='form-control'
                type="text"
                name="location"
                value={model.location || ''}
                onChange={(e) => handleChange(e, 'location')}
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Sub Location</label>
              <input
                className='form-control'
                type="text"
                name="subLocation"
                value={model.subLocation || ''}
                onChange={(e) => handleChange(e, 'subLocation')}
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Model Description</label>
              <textarea
                name="modelDescription"
                type="text"
                value={model.modelDescription || ''}
                className='form-control'
                onChange={(e) => handleChange(e, 'modelDescription')}
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Age</label>
              <input
                name="age"
                value={model.age || ''}
                className='form-control'
                onChange={(e) => handleChange(e, 'age')}
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Weight</label>
              <input
                name="weight"
                value={model.weight || ''}
                className='form-control'
                onChange={(e) => handleChange(e, 'weight')}
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Height</label>
              <input
                name="height"
                value={model.height || ''}
                className='form-control'
                onChange={(e) => handleChange(e, 'height')}
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Phone No</label>
              <input
                name="phone_no"
                value={model.phone_no || ''}
                className='form-control'
                onChange={(e) => handleChange(e, 'phone_no')}
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Nationality</label>
              <input
                name="nationality"
                value={model.nationality || ''}
                className='form-control'
                onChange={(e) => handleChange(e, 'nationality')}
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Dress Size</label>
              <input
                name="dressSize"
                value={model.dressSize || ''}
                className='form-control'
                onChange={(e) => handleChange(e, 'dressSize')}
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Price</label>
              <input
                name="price"
                type='number'
                value={model.price || ''}
                className='form-control'
                onChange={(e) => handleChange(e, 'price')}
              />
            </div>
          </div>

          <div className="card card-body">
            <div className='form-group'>
              <label className='form-label'>Current Image:</label>
              <br />
              <img
                id="featuredImagePreview"
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${model.featuredImage}`}
                alt="Featured Image"
                style={{ width: '100px', height: 'auto' }}
                className="img-fluid"
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Featured Image</label>
              <input
                className='form-control'
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className='card card-body'>
            <div className='form-group'>
              <label className='form-label'>Video</label>
              <input className='form-control' type="file" onChange={handleVideoChange} />
            </div>

            Current Video :
            <video width="320" height="240" controls>
              <source
              src={`http://127.0.0.1:8000/storage/${model.video}`}
              type="video/mp4"
              />
                        Your browser does not support the video tag.
            </video>
          </div>

          <div className='card card-body'>
            <label>Rates</label>
            {rates.map((rate,index)=>(
              <div key={index}>
                 <input
                      type='text'
                      placeholder='Duration'
                      className='form-control mb-3'
                      name='duration'
                      value={rate.duration}
                      onChange={(e) => handleRateChange(e, index, 'duration')}

                  />
                  <input
                      type='text'
                      placeholder='Incall'
                      className='form-control mb-3'
                      name='incall'
                      value={rate.incall}
                      onChange={(e) => handleRateChange(e, index, 'incall')}

                  />
                  <input
                      type='text'
                      placeholder='Outcall'
                      className='form-control mb-3'
                      name='outcall'
                      value={rate.outcall}
                      onChange={(e) => handleRateChange(e, index, 'outcall')}

                  />


                  {rate.id !== undefined ? (
                    <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => removeRatesDynamic(rate.id)}
                    >
                      Remove Rate
                    </button>
                    ) : (
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => removeRates(index)}
                    >
                      Remove Rates Static
                    </button>
                    )}

              </div>


              


            ))}

              <div className='form-group'>
                <label className='form-label'>New Rate Name</label>
                <input
                  type='text'
                  placeholder='Duration'
                  className='form-control'
                  name='duration'
                  value={newRate.duration}
                  onChange={(e) => setNewRate({ 
                      ...newRate, 
                      duration: e.target.value, 
                     
                    })}
                />
                <input
                  type='text'
                  placeholder='Incall'
                  className='form-control'
                  name='incall'
                  value={newRate.incall}
                  onChange={(e) => setNewRate({ 
                      ...newRate, 
                     
                      incall: e.target.value, 
                     
                    })}
                />

                <input
                  type='text'
                  placeholder='Outcall'
                  className='form-control'
                  name='outcall'
                  value={newRate.outcall}
                  onChange={(e) => setNewRate({ 
                      ...newRate, 
                      
                      outcall: e.target.value 
                    })}
                />


              </div>

              <button className='btn btn-success' type='button' onClick={addRate}>
                Add New rate
              </button>


          </div>

          {/* Services Section Starts Here */}
          <div className='card'>
            <div className='card-body'>
              <label>Services</label>
              {services.map((service, index) => (
                <div key={index}>
                  <div className='form-group'>
                    <label className='form-label'>Service Name</label>
                    <input
                      type='text'
                      placeholder='Name'
                      className='form-control'
                      name='name'
                      value={service.name}
                      onChange={(e) => handleServiceChange(e, index)}
                    />
                  </div>

                  {/* <button className='btn btn-danger' onClick={() => removeService(index)}>
                    Remove Service
                  </button> */}
                  {service.id !== undefined ? (
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => removeServiceDynamic(service.id)}
                      >
                        Remove Service
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => removeService(index)}
                      >
                        Remove Service Static
                      </button>
                    )}



                  

                  <hr />
                </div>
              ))}
              <div className='form-group'>
                <label className='form-label'>New Service Name</label>
                <input
                  type='text'
                  placeholder='Name'
                  className='form-control'
                  name='name'
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <button className='btn btn-success' type='button' onClick={addService}>
                Add Service
              </button>
            </div>
          </div>
          {/* Services Section Ends Here */}

          <div className='card card-body'>

            <div className='card-head text-left'>Uplaod New Images : </div>
            
            <input type="file" className='form-control mb-3' accept="image/*" multiple onChange={handleFileChange} />
            <div>
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px' }} />
              ))}
            </div>

            <div className='card-head text-left'>Current Gallery : </div>
            {!loading && (
              <div style={{display: 'block'}}>
                {gallery.length > 0 ? (
                  gallery.map((imageData) => (
                    <div key={imageData.id} >
                      <img
                        src={`http://127.0.0.1:8000/storage/${imageData.image}`}
                        alt={`Image ${imageData.id}`}
                        style={{ width: '200px', height: '200px', margin: '5px' }}
                      />
                      <button className='btn btn-danger' type='button' onClick={() => handleDeleteImage(imageData.id)}>Delete</button>
                    </div>
                  ))
                ) : (
                  <p>No images available in the gallery</p>
                )}
              </div>
            )}
          </div>



          <button className='btn btn-primary w-100' onClick={handleSubmit} type='submit'>
            Submit
          </button>


        </form>
      </div>
      )}
    </Admin>
  );
};

export default EditModel;
