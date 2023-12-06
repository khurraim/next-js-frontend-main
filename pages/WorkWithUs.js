import React, { useState, useEffect } from 'react';
import Layout from './layouts/Layout';
import axios from 'axios';
import {toast} from 'react-toastify';
import ModalSuccess from './components/ModalSuccess';


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
  padding: '0px 10px'
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
    <Layout>

{showSuccessModal && <ModalSuccess onClose={() => setShowSuccessModal(false)} />}


      <div className="text-center">
        <div className="top-card">
          <div className="custom-card red">
            <img src="/images/model.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className="about-us-text">

  <h3>WORK WITH US</h3>
  
  <div className="mt-3 text-uppercase">
    contrary to popular belief. lorem ipsum is not ismply a rexr. it has roots in prece of classical latin literature
    from 45bc making it over 2000 years old. richard mcclintock, a latin professor at hampden-sydney college in virginia.
  </div>

  <div className='mt-3 text-uppercase'>
    once we accepted you in our big family we'll do our best to help you in case you need any advice or assistance.
  </div>

  <div className='mt-3 text-uppercase'>
    contrary to popular belief. lorem ipsum is not ismply a rexr. it has roots in prece of classical latin literature
    from 45bc making it over 2000 years old. richard mcclintock, a latin professor at hampden-sydney college in virginia.
  </div>

  <h4 className='my-5'>Please send in your appliation by filling in the form below and we will contact you shortly</h4>

  <div className="filters mt-5">

    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="text-left">
        
        <div className="row">

            <div className="col-md-6">
              <label className='text-uppercase  pb-2 pt-2'> 
                {/* <span style={iMarkStyle}>!</span> Name* */}
                {formSubmitted && formData.title === '' && <span style={iMarkStyle}>!</span>}&nbsp; Name*
              </label>
              <input 
              type="text" 
              name="title" 
              className={`custom-select mt-2 mb-4 form-control ${formSubmitted && formData.title === '' ? 'border-danger' : ''}`}
  
              value={formData.title} 
              onChange={handleChange} 
              />
            </div>

            <div className='col-md-6'>
            <label htmlFor className="text-uppercase pb-2 pt-2">
            {formSubmitted && formData.phone_no === '' && <span style={iMarkStyle}>!</span>}&nbsp;  phone number*
            </label>
              <input
                type="text"
                className={`custom-select mt-2 mb-4 form-control ${formSubmitted && formData.phone_no === '' ? 'border-danger' : ''}`}
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label  className='text-uppercase pb-2 pt-2'>
              {formSubmitted && formData.age === '' && <span style={iMarkStyle}>!</span>}&nbsp;   age*
              </label>
              <input  
                    className={`custom-select  mt-2 mb-4 form-control ${formSubmitted && formData.age === '' ? 'border-danger' : ''}`}
                    type='number' 
              name="age" 
              value={formData.age} 
              onChange={handleChange}
              />
            </div>


            <div className="col-md-6 ">
              <label  className='text-uppercase pb-2 pt-2'>
              {formSubmitted && formData.location === '' && <span style={iMarkStyle}>!</span>}&nbsp;   Location*
              </label>
              <input  
              className={`custom-select  mt-2 mb-4 form-control ${formSubmitted && formData.location === '' ? 'border-danger' : ''}`}
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} />
            </div>
            
            <div className="col-md-6">
              <label htmlFor className="text-uppercase pb-2 pt-2">
              {formSubmitted && formData.nationality === '' && <span style={iMarkStyle}>!</span>}&nbsp;   nationality*
              </label>
              <input
                type="text"
                className={`custom-select  mt-2 mb-4 form-control ${formSubmitted && formData.nationality === '' ? 'border-danger' : ''}`}

                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
          
            
            <div className="col-md-6">
              <label htmlFor className="text-uppercase pb-2 pt-2">
              {formSubmitted && formData.dressSize === '' && <span style={iMarkStyle}>!</span>}&nbsp; dress size*
              </label>
              <input
                type="text"
                className={`custom-select  mt-2 mb-4 form-control ${formSubmitted && formData.dressSize === '' ? 'border-danger' : ''}`}

                name="dressSize"
                value={formData.dressSize}
                onChange={handleChange}
              />
            </div>
            
            
            <div className='col-md-6'>
            <label htmlFor className="text-uppercase pb-2 pt-2">
            {formSubmitted && formData.height === '' && <span style={iMarkStyle}>!</span>}&nbsp; height*
            </label>
              <input
                type="text"
                className={`custom-select  mt-2 mb-4 form-control ${formSubmitted && formData.height === '' ? 'border-danger' : ''}`}
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </div>

            <div className='col-md-6'>
            <label htmlFor className="text-uppercase pb-2 pt-2">
            {formSubmitted && formData.hairColor === '' && <span style={iMarkStyle}>!</span>}&nbsp; hair color*
            </label>
              <input
                type="text"
                className={`custom-select  mt-2 mb-4 form-control ${formSubmitted && formData.hairColor === '' ? 'border-danger' : ''}`}
                name="hairColor"
                value={formData.hairColor}
                onChange={handleChange}
              />
            </div>


            <div className="col-md-6">
              <label htmlFor className="text-uppercase pb-2 pt-2">
              {formSubmitted && images.length === 0 && <span style={iMarkStyle}>!</span>}&nbsp;upload four photos*
              </label>
              {/* <input type="file" className="custom-select form-control" /> */}
              <input 
              type="file" 
              className={`form-control  mb-4 mb-3 ${formSubmitted && selectedFiles.length === 0 ? 'border-danger' : ''}`}
              style={submitButtonStyle}
              accept="image/*" 
              
              multiple 
              onChange={handleFileChange} 
              />
            </div>

            

            <div className="d-flex uploaded-imgs mt-4">
                    {images.map((image, index) => (
                      <div key={index} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <img
                          src={image}
                          alt={`Uploaded ${index}`}
                          style={{ width: '100px', height: '100px', marginRight: '10px', marginLeft: '35px' }}
                        />
                        <button
                          className="btn btn-sm"
                          style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}
                          onClick={() => handleRemoveImage(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
            </div>


        <div>


            <button className=" mt-3" style={submitButtonStyle}>SUBMIT</button>
          </div>
        </div>

      </div>
    </form>

    {formSubmitted && 
  (formData.hairColor === '' || 
   formData.nationality === '' || 
   formData.age === '' || 
   formData.height === '' || 
   formData.title === '' ||  // Corrected field name from formData.name
   formData.phone_no === '' || 
   formData.location === '' ||
   images.length === 0) ? 
  <div className='d-flex my-3'><span style={iMarkStyle}>!</span> <p className='text-uppercase text-danger'>Please fill in all required fields</p></div> : null}


   


    <ul className='mt-5 text-uppercase'>
      <li className='mb-3'>by using the form above to pload your details you are confirmign the following :</li>
      <li className='mb-3'>you are legally able to work in the uk ir whatever country you are based in.</li>
      <li className='mb-3'>you are legal age to work in that country</li>
      <li className='mb-3'>you are self employed and that you are responsible for your own tax and government payments.</li>
    </ul>


    <div className='mt-5 mb-5 text-uppercase'>
        due to the amount of applicants lookign to join our gallery of london escorts that submit to us their details we will only be 
        contacting the successful ones.
    </div>

    <div className=' mb-5 text-uppercase'>
        if you do not hear from us within a couples of weeks then i am afraid that you should look at your application as 
        unsuccessful. i fthis is the case then please review what <br/>
        you have sent us and see where you can make any improvements.
    </div>

    <div className=' mb-5 text-uppercase'>
      you do not need a professional portfolio to be able to submit your detais but you will need prifessional pictures to be able to appear
      on our websites. if you do not <br/>
      have any professional photos then one of the team wil galdly recommed to you sime great photographers who can help you on your
      way.
    </div>

    <div className='mb-3 text-uppercase'>
      if your applciation is successful then you are agrreing that this company can use your photos to promote you on this site or any others
      in the group, we may even use <br/>
      your profile to promote you on other websites or publications that we advertise in/on.
    </div>

    <br/>

    <div className='mb-5 text-uppercase'>
      for our service to you we take a cimmision this is based on us arranging your dtaes, aything sexual implied on this or any other of our
      websites is purely <br/>
      entertainment and does not represent what we offer.
    </div>




  </div>
</div>


            
          
    </Layout>
  );
};

export default WorkWithUs;