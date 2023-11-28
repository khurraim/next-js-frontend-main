import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../layouts/Admin';
import {toast} from 'react-toastify';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contacts`)
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // Make a DELETE request to delete the model with the specified ID
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}`)
      .then(() => {
        // If the delete request is successful, update the records state
        setContacts((prevRecords) => prevRecords.filter((record) => record.id !== id));
        toast.success('Contact Deleted Successfully');
      })
      .catch((error) => {
        console.error('Error deleting Contact:', error);
        toast.error('Comtact Deleting Model');
      });
  };

  return (
    <Admin>
      <div className='container-fluid my-5'>      {loading ? (
        <p>Loading...</p>
      ) : contacts.length > 0 ? (
        
        <table className='table table-bordered table-responsive'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone_no}</td>
                <td>{contact.message}</td>
                <td>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      ) : (
        <p>No contacts found.</p>
      )}
      </div>
    </Admin>
  );
}

export default ContactList;
