import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from '../layouts/Admin';
import { toast } from 'react-toastify';
import Link from 'next/link';

const YourComponentTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState({}); 
  const [rates, setRates] = useState({});
  //const [stats, setStats] = useState({});

  useEffect(() => {
    // Fetch records when the component mounts
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/ModelsByUsers`) // Replace with your API endpoint
      .then((response) => {
        setRecords(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching records:', error);
        setLoading(false);
      });
  }, []);

 
  // Fetching Service
  useEffect(() => {
    // Fetch services for each model
    const fetchServices = async () => {
      const servicesData = {};

      for (const record of records) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/models/services/${record.id}`
          ); // Replace with your service API endpoint
          servicesData[record.id] = response.data.services;
        } catch (error) {
          console.error('Error fetching services:', error);
          servicesData[record.id] = [];
        }
      }
      setServices(servicesData);
    };

    if (records.length > 0) {
      fetchServices();
    }
  }, [records]);

  // Fetching Rates
  useEffect(()=>{
    // Fetch services for each model
    const fetchRates = async () => {
      const ratesData = {};

      for (const record of records) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/models/rates/${record.id}`
          ); // Replace with your service API endpoint
          ratesData[record.id] = response.data.rates;
        } catch (error) {
          console.error('Error fetching services:', error);
          ratesData[record.id] = [];
        }
      }
      setRates(ratesData);
    };

    if (records.length > 0) {
      fetchRates();
    }
  },[records]);



  const handleDelete = (id) => {
    // Make a DELETE request to delete the model with the specified ID
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/models/${id}`)
      .then(() => {
        // If the delete request is successful, update the records state
        setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
        toast.success('Model Deleted Successfully');
      })
      .catch((error) => {
        console.error('Error deleting Model:', error);
        toast.error('Error Deleting Model');
      });
  };

  return (
    <Admin>
      <div className="container-fluid my-5">
        <h2>Records Table</h2>
        {loading ? (
          <p>Loading records...</p>
        ) : records.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <div className='table table-responsive'>
          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                {/* <th>Video</th> */}
                <th>Title</th>
                <th>Location</th>
                <th>Suburb</th>
                <th>Nationality</th>
                <th>Dress Size</th>
                <th>Model Description</th>
                <th>Age</th>
                <th>Service</th>
                <th>Rates</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>
                    <img
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${record.featuredImage}`}
                      alt="Featured Image"
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </td>
                  {/* <td>
                    <video width="320" height="240" controls>
                      <source
                        src={`http://127.0.0.1:8000/storage/${record.video}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </td> */}
                  <td>{record.title}</td>
                  <td>{record.location}</td>
                  <td>{record.subLocation}</td>
                  <td>{record.nationality}</td>
                  <td>{record.dressSize}</td>
                  <td>{record.modelDescription}</td>
                  <td>{record.age}</td>
                  <td>
                    {services[record.id] && services[record.id].length > 0 ? (
                      <ul>
                        {services[record.id].map((service) => (
                          <li key={service.id}>{service.name}</li>
                        ))}
                      </ul>
                    ) : (
                      //'Loading Services.....'
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <img 
                          src="https://cdn-icons-png.flaticon.com/512/7560/7560658.png" 
                          alt="Loading..." 
                          style={{ animation: 'spin 3s linear infinite', width: '50px' }} />
                          
                        </div>
                        <p style={{textAlign: 'center'}}>Loading Services....</p>
                      </div>
                    )}
                  </td>
                  <td>
                    
                    {rates[record.id] && rates[record.id].length > 0 ? (
                      <ul>
                        {rates[record.id].map((rate) => (
                          <li key={rate.id}>
                            <b>Duration : </b>{rate.duration}
                            <br/>
                            <b>Incall : </b>{rate.incall}
                            <br/>
                            <b>Outcall :</b>{rate.outcall}
                            <br/>
                          </li>
                          
                        ))}
                      </ul>
                    ) : (
                      //'Loading Rates.....'
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <img 
                          src="https://cdn-icons-png.flaticon.com/512/7560/7560658.png" 
                          alt="Loading..." 
                          style={{ animation: 'spin 3s linear infinite', width: '50px' }} />
                          
                        </div>
                        <p style={{textAlign: 'center'}}>Loading....</p>
                      </div>
                    )}
                  </td>
                  
                  <td>
                    <Link href={`/dashboard/EditModel/${record.id}`} className="btn btn-primary w-100 mb-3">
                        Edit
                    </Link>
                    
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </Admin>
  );
};

export default YourComponentTable;
