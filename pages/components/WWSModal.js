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

const WWSModal = ({  onClose }) => { 


  return (
  
    <div style={{background: 'rgba(0,0,0,0.5)'}} class="modal d-block contact-us-modal show" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <h1 class="mb-3">profile sent</h1>
          <h6 class="mb-4">Thanks for submitting your applicati
on. We will contact you in a week if you are successful.</h6>
            <button type="button" class="enter" onClick={onClose} data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  
)};

export default WWSModal;





