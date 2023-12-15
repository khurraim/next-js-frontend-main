
    import React from 'react';
    import NewHeader from './components/NewHeader';
    import NewFooter from './components/NewFooter';
    // Define your React component here
    function Commodity() {
      return (
        <>
          <NewHeader />
          <div className="container my-5 py-5">
          <h1>Commodity</h1>
          <div id="paragraph"><p>This is new page</p></div>
          </div>
          <NewFooter />
        </>
      );
    }

    export default Commodity;
  