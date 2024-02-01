import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import Admin from '../layouts/Admin';
import { toast } from 'react-toastify';

const YourComponentTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Fetch records when the component mounts
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/ModelsByUsers`)
      .then((response) => {
        if (isMounted) {
          setRecords(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching records:', error);
        if (isMounted) {
          setLoading(false);
        }
      });

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  const columns = [
    {
      Header: 'Name',
      accessor: 'title',
    },
    {
      Header: 'Nationality',
      accessor: 'nationality',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Phone Number',
      accessor: 'phone_no',
    },
    {
      Header: 'View Details',
      Cell: ({ row }) => (
        <a href={`/dashboard/ViewDetails/${row.original.id}`} className="btn btn-success w-100 mt-3 mb-3">
          View Details
        </a>
      ),
    },
    {
      Header: 'Edit Model',
      Cell: ({ row }) => (
        <a href={`/dashboard/EditModel/${row.original.id}`} className="btn btn-primary w-100 mt-3 mb-3">
          Edit Model
        </a>
      ),
    },
    {
      Header: 'Delete Model',
      Cell: ({ row }) => (
        <button
          className="btn btn-danger w-100 mb-3 mt-3"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete Model
        </button>
      ),
    },
    {
      Header: 'Approve Model',
      Cell: ({ row }) => (
        <button
          className="btn btn-info w-100 mb-3 mt-3"
          onClick={() => approveModel(row.original.id)}
        >
          Approve Model
        </button>
      ),
    },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: records });

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
          <table {...getTableProps()} className="table table-bordered">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Admin>
  );
};

export default YourComponentTable;
