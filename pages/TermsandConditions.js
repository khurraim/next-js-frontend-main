
    import React from 'react';
    import NewHeader from './components/NewHeader';
    import NewFooter from './components/NewFooter';
    // Define your React component here
    function TermsandConditions() {
      return (
        <>
          <NewHeader />
          <div className="container my-5 py-5">
          <h1>Terms and Conditions</h1>
          <div id="paragraph"><p>This is terms and conditions page</p></div>
          </div>
          <NewFooter />
        </>
      );
    }

    export default TermsandConditions;
  