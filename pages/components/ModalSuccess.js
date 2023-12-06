import React from 'react';

// Submit Button Styles 
const ButtonStyle = {
  paddingRight: 300, 
  background: '#333', 
  color: '#fff',
  border: 'none',
  fontSize: '16px',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingRight: '75px',
  paddingLeft: '30px',
  textAlign: 'left',
  width: '30%'
};

const ModalSuccess = ({  onClose }) => { 


  return (
  
    <div className='custom-modal ' >
      
      <div className='modal-content p-5' style={{width: '25%'}}>
      
       

      
        <h1 className='text-uppercase'>Profile Sent</h1>
        <p className='text-uppercase'>
            thanks for submitting your application. we will contact you in a week if you are successful.
        </p>

        <button style={ButtonStyle} onClick={onClose}>Close</button>
          
        
        
          
        

      </div>
    </div>
  
)};

export default ModalSuccess;





