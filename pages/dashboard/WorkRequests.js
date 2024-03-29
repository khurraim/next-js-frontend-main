import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from '../layouts/Admin';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Pagination from '../pagination';

const YourComponentTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState({}); 
  const [rates, setRates] = useState({});
  const [paginate, setPaginate] = useState([]);
  const [offset, setOffset] = useState(1);

  const pageLimit = 7;

  useEffect(() => {
    //setIsLoading(true);
    //const sortedOrders = orders?.sort((a, b) => b.id - a.id);
    const startIndex = (offset - 1) * pageLimit;
    setPaginate(records?.slice(startIndex , startIndex  + pageLimit));
    //setIsLoading(false);
  }, [offset, records]);


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

  const approveModel = (id) => {
    
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ApproveModel/${id}`)
      .then((response) => {
        console.log(response.data);
        toast.success("Model approved successfully");
      })
      .catch((error)=>{
        console.log("Error approving model : ", error);
        toast.error("Error Approving Model");
      });  
    
    
  }



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
        <h2>Work Requests</h2>
        {loading ? (
          <p>Loading records...</p>
        ) : records.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <div className='table '>
          <table className="table table-bordered ">
            <thead>
              <tr>
                
                
              
                <th>Name</th>
                
                
                <th>Nationality</th>
                
                
                <th>Age</th>

                <th>Phone Number</th>
                
                <th>View Details</th>
                <th>Edit Model</th>
                <th>Delete Model</th>

                <th>Approve Modal</th>
                

              </tr>
            </thead>
            <tbody>
              {paginate.map((record) => (
                <tr key={record.id}>
                  
                  
                  
                  <td>{record.title}</td>
                  <td>{record.nationality}</td>
                  <td>{record.age}</td>
                  <td>{record.phone_no}</td>

                  <td>
                    <Link href={`/dashboard/ViewDetails/${record.id}`} className="btn btn-large btn-success w-100 mt-3 mb-3">
                        View Details
                    </Link>
                  </td>
                 
                  <td>
                    <Link href={`/dashboard/EditModel/${record.id}`} className="btn btn-large btn-primary w-100  mt-3  mb-3">
                        Edit Model
                    </Link>
                  </td>
                  
                  <td>
                    
                    <button
                      className="btn btn-large btn-danger w-100 mb-3 mt-3"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete Model
                    </button>
                  </td>

                  <td>
                    
                    <button 
                     className='btn btn-large btn-info w-100 mb-3 mt-3'
                     onClick={() => approveModel(record.id)}
                     
                    >
                      Approve Model
                    </button>
                    
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
                total={records?.length}
                current={offset}
                pageSize={pageLimit}
                onChange={(val) => setOffset(val)}
                showLessItems
              />
          </div>
        )}
      </div>
    </Admin>
  );
};

export default YourComponentTable;
