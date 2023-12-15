import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import NewHeader from './components/NewHeader';
import NewFooter from './components/NewFooter';

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
    <>
    <NewHeader/>
    
<main className="main-wrapper innrerPages-waper">
  <div className="container-lg inner-product">
    <div className="row px-lg-5">
      <div className="col-lg-7 mx-auto">
        <div href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" className="product-card">
          <div className="img-wraper">
            <img className="img-fluid" src="images/about.png" />
          </div>
        </div>
        <div className="my-5">
          <h1 className="sub-heading mb-4">FAQ</h1>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. 
            It has roots in a piece of classical Latin literature from 45 BC, making it 
            over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words, consectetur, from a
            Lorem Ipsum passage, and going through the cites of the word in classical literature,
            discovered the undoubtable source.
          </p>
          <h1 className="sub-heading mb-3 mt-4">MOST POPULAR QUESTIONS</h1>
          <div className="accordion" id="accordionExample">
          {faqs.map((faq) => (
            <div className="accordion-item">
              <button onClick={() => toggleItem(faq.id)} className={` ${openItem === faq.id ? 'plusIcon collapsed': ''} accordion-button`} id="headingOne" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                
                {faq.question}
              </button>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              {openItem === faq.id && (
                <div className="accordion-body">
                  {faq.answer} 
                </div>
              )}
              </div>
            </div>
          ))}
            
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

	
    <NewFooter />
    </>
  );
};

export default FAQCollapsibleList;
