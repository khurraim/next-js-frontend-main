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
  
    <div style={{background: 'rgba(0,0,0,0.5)'}} className="modal d-block contact-us-modal show" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" >
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-body">
        <h1>message Sent</h1>
        <button type="button" onClick={onClose} className="enter" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

  
)};

export default ModalSuccess;





