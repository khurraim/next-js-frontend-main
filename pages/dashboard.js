import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthUser from './components/AuthUser';
import Admin from './layouts/Admin';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
  faSearch,
  faAmbulance,
  faAnchor,
} from "@fortawesome/free-solid-svg-icons";


// import the Facebook icon from the free-brands-svg-icons package
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";

const Dashboard = () => {

  const {token} = AuthUser();
  const router = useRouter();

  // login auth check, also check for
  // changes in token 
  useEffect(()=> {
    if(token === null)
    {
      router.push('/login');
    } 
  }, [token]);

  // logout function
  const logout = () => {
    sessionStorage.clear();
    router.push('/login');
  }

  // Render the dashboard content if authenticated
  return (
    <Admin>
      <div className='container-fluid my-5'>
        <h1 className='text-left'>Welcome to the Dashboard</h1>
        <FontAwesomeIcon
        icon={faSearch}
        style={{ fontSize: 100, color: "blue" }}
      />

      <FontAwesomeIcon
        icon={faAmbulance}
        style={{ fontSize: 100, color: "orange" }}
      />

      <FontAwesomeIcon
        icon={faAnchor}
        style={{ fontSize: 100, color: "green" }}
      />

      <FontAwesomeIcon
        icon={faFacebookF}
        style={{ fontSize: 100, color: "green" }}
      />

      </div> 
    </Admin>
  );
};

export default Dashboard;
