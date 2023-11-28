// import React, { useState, useEffect } from 'react';
// import Layout from './layouts/Layout';

// const FAQCollapsibleList = () => {
//   const [faqs, setFAQs] = useState([]);

//   useEffect(() => {
//     // Fetch FAQs from the API when the component mounts
//     const fetchFAQs = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs`);
//         const data = await response.json();
//         setFAQs(data);
//       } catch (error) {
//         console.error('Error fetching FAQs:', error);
//       }
//     };

//     fetchFAQs();
//   }, []);

//   const [openItem, setOpenItem] = useState(null);

//   const toggleItem = (id) => {
//     setOpenItem((prevOpenItem) => (prevOpenItem === id ? null : id));
//   };

//   return (
//     <Layout>
      
//       <div class="text-center">
//         <div class="top-card">
//           <div class="custom-card red">
//             <img src="/images/model.jpg" alt="" />
//           </div>
//         </div>
//       </div>

//       <div class="about-us-text">
          
//         <h4>FAQs</h4>
//         <div class="mt-3">We’re here to help and answer any question you might have.</div>
          
//         <div className='my-3'>
        
//         {faqs.map((faq) => (
//             <div key={faq.id}>
//             <div
//                 className="faq-question"
//                 onClick={() => toggleItem(faq.id)}
//                 style={{ cursor: 'pointer', borderBottom: '1px solid #ccc', padding: '10px' }}
//             >
//                 <h6>{faq.question}</h6>
//             </div>
//             {openItem === faq.id && (
//                 <div className="faq-answer" style={{ padding: '10px' , fontWeight: '300'}}>
//                 <p>{faq.answer}</p>
//                 </div>
//             )}
//             </div>
//         ))}
//         </div>


//       </div>

//     </Layout>
//   );
// };

// export default FAQCollapsibleList;



import React, { useState, useEffect } from 'react';
import Layout from './layouts/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const FAQCollapsibleList = () => {
  const [faqs, setFAQs] = useState([]);
  const [openItem, setOpenItem] = useState(null);

  useEffect(() => {
    // Fetch FAQs from the API when the component mounts
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

  const toggleItem = (id) => {
    setOpenItem((prevOpenItem) => (prevOpenItem === id ? null : id));
  };

  return (
    <Layout>
      <div class="text-center">
        <div class="top-card">
          <div class="custom-card red">
            <img src="/images/model.jpg" alt="" />
          </div>
        </div>
      </div>

      <div class="about-us-text">
        <h4>FAQs</h4>
        <div class="mt-3">We’re here to help and answer any question you might have.</div>

        <div className='my-3'>
          {faqs.map((faq) => (
            <div key={faq.id}>
              <div
                className="faq-question"
                onClick={() => toggleItem(faq.id)}
                style={{ cursor: 'pointer', borderBottom: '1px solid #ccc', padding: '10px' }}
              >
                <h6>
                  {faq.question}
                  <FontAwesomeIcon icon={openItem === faq.id ? faMinus : faPlus} style={{ marginLeft: '10px', float:'right' }} />
                </h6>
              </div>
              {openItem === faq.id && (
                <div className="faq-answer" style={{ padding: '10px', fontWeight: '300' }}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FAQCollapsibleList;
