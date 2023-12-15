
    import React from 'react';
    import NewHeader from './components/NewHeader';
    import NewFooter from './components/NewFooter';
    // Define your React component here
    function Page3() {
      return (
        <>
          <NewHeader />
          <div className="container my-5">
          <h1>Page3</h1>
          <div id="paragraph"><p>This is page 3</p></div>
          </div>
          <NewFooter />
        </>
      );
    }

    export default Page3;
  