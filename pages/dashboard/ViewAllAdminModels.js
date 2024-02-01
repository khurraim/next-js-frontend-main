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
      .get(`${process.env.NEXT_PUBLIC_API_URL}/ModelsByAdmin`) // Replace with your API endpoint
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

  const handleActivation = async (id) => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ActivateModel/${id}`)
      .then((response) => {
        console.log(response.data);
        setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === id ? { ...record, status: 'activated' } : record
        )
      );
        toast.success("Model activated successfully");
      })
      .catch((error)=>{
        console.log("Error approving model : ", error);
        toast.error("Error Approving Model");
      });
  };

  const handleDeactivation = async (id) => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeactivateModel/${id}`)
      .then((response) => {
        console.log(response.data);
        setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === id ? { ...record, status: 'deactivated' } : record
        )
      );
        toast.success("Model activated successfully");
      })
      .catch((error)=>{
        console.log("Error approving model : ", error);
        toast.error("Error Approving Model");
      });
  }; 

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
        
        {loading ? (
          <p>Loading records...</p>
        ) : records.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <div className='table '>
          <table className="table table-bordered ">
            <thead>
              <tr>
               
                {/* <th>Video</th> */}
                <th>Title</th>
                
                <th>Nationality</th>
                
                <th>Age</th>
                <th>Phone No </th>
                <th>Status</th>
                <th>Priority</th>
                <th>View Details</th>
                <th>Edit Models</th>
                <th>Delete Model</th>
                <th>Activate/Deactivate</th>

              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  
                 
                  <td>{record.title}</td>
                 
                  <td>{record.nationality}</td>
                  
                  <td>{record.age}</td>

                  <td>{record.phone_no}</td>

                  <td>{record.status}</td>

                  <td>{record.priority}</td>
                
                 <td>
                    <Link href={`/dashboard/ViewDetails/${record.id}`} className="btn btn-success w-100 mb-3">
                        View Details
                    </Link>
                 </td>
                  
                  <td>
                    <Link href={`/dashboard/EditModel/${record.id}`} className="btn btn-primary w-100 mb-3">
                        Edit Model
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger w-100 mb-3"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete Model
                    </button>
                  </td>

                  <td>

                    {record.status === 'activated' && (
                      <button
                    className='btn btn-info w-100 mb-3'
                    onClick={() => handleDeactivation(record.id)}
                    >
                      Deactivate Model
                    </button>
                    )}

                    {record.status === 'deactivated' && (
                      <button
                    className='btn btn-info w-100 mb-3'
                    onClick={() => handleActivation(record.id)}
                    >
                      Activate Model
                    </button>
                    )}
                    
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
