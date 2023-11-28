import React, { useState, useEffect } from 'react';
import Admin from '../layouts/Admin';
import { toast } from 'react-toastify';
import Link from 'next/link';

const FAQList = () => {
  const [faqs, setFAQs] = useState([]);

  useEffect(() => {
    // Fetch FAQs from the Laravel API when the component mounts
    const fetchFAQs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs`);
        const data = await response.json();
        setFAQs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFAQs();
  }, []);

  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log(`Edit FAQ with ID ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted FAQ from the local state
        setFAQs((prevFAQs) => prevFAQs.filter((faq) => faq.id !== id));
        console.log(`FAQ with ID ${id} deleted successfully`);
        toast.success('FAQ Deleted Successfully');
      } else {
        console.error(`Failed to delete FAQ with ID ${id}`);
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  return (
    <Admin>
    <div className='contaier-fluid my-5 mx-3'>
      <h2>FAQ List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.id}</td>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>
                
                <Link href={`/dashboard/EditFAQ/${faq.id}`} className="btn btn-primary mx-3">
                                Edit
                </Link> 
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(faq.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Admin>
  );
};

export default FAQList;
