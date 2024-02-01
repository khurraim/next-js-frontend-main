// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Admin from '@/pages/layouts/Admin';
// import { toast } from 'react-toastify';


// const EditFAQ = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [formData, setFormData] = useState({
//     question: '',
//     answer: '',
//   });

//   useEffect(() => {
//     // Fetch FAQ details from the API using the provided ID
//     const fetchFAQDetails = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs/${id}`);
//         const data = await response.json();
//         setFormData(data);
//       } catch (error) {
//         console.error('Error fetching FAQ details:', error);
//       }
//     };

//     if (id) {
//       fetchFAQDetails();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         console.log('FAQ updated successfully');
//         // Redirect or perform any other action upon successful update
//         toast.success('FAQ updated successfully');
//       } else {
//         console.error('Failed to update FAQ');
//       }
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//       toast.error('Error submitting the form');
//     }
//   };

//   return (
//     <Admin>
//     <div className='container-fluid my-5 mx-3'>
//       <div className='card card-body'>
//           <div className='card-header'>
//             <h2>Edit FAQ</h2>
//           </div>
//           <form onSubmit={handleSubmit}>
//         <div className='form-group'>
//           <label>Question:</label>
//           <input
//             type="text"
//             name="question"
//             className='form-control'
//             value={formData.question}
//             onChange={handleChange}
//           />
//         </div>
//         <div className='form-group'>
//           <label>Answer:</label>
//           <textarea
//             name="answer"
//             value={formData.answer}
//             onChange={handleChange}
//             className='form-control'
//           ></textarea>
//         </div>
//         <div>
//           <button className='btn btn-primary' type="submit">Update FAQ</button>
//         </div>
//       </form>
//       </div>
      
      
//     </div>
//     </Admin>
//   );
// };

// export default EditFAQ;


import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Admin from '@/pages/layouts/Admin';
import { toast } from 'react-toastify';

const EditFAQ = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    priority: '', // Include priority in the form data
  });

  useEffect(() => {
    // Fetch FAQ details from the API using the provided ID
    const fetchFAQDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching FAQ details:', error);
      }
    };

    if (id) {
      fetchFAQDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('FAQ updated successfully');
        // Redirect or perform any other action upon successful update
        toast.success('FAQ updated successfully');
      } else {
        console.error('Failed to update FAQ');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('Error submitting the form');
    }
  };

  return (
    <Admin>
      <div className='container-fluid my-5 mx-3'>
        <div className='card card-body'>
          <div className='card-header'>
            <h2>Edit FAQ</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Question:</label>
              <input
                type='text'
                name='question'
                className='form-control'
                value={formData.question}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Answer:</label>
              <textarea
                name='answer'
                value={formData.answer}
                onChange={handleChange}
                className='form-control'
              ></textarea>
            </div>
            <div className='form-group'>
              <label>Priority:</label>
              <select
                className='form-control'
                name='priority'
                value={formData.priority} // Set the selected priority
                onChange={handleChange}
              >
                <option value='Top 1'>Top 1</option>
                <option value='Top 2'>Top 2</option>
                <option value='Top 3'>Top 3</option>
                <option value='Top 4'>Top 4</option>
                <option value='Top 5'>Top 5</option>
                <option value='Normal'>Normal</option>
              </select>
            </div>
            <div>
              <button className='btn btn-primary' type='submit'>
                Update FAQ
              </button>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
};

export default EditFAQ;
