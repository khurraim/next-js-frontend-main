// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import Admin from '../layouts/Admin';
// import { toast } from 'react-toastify';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
// import * as BrandIcons from '@fortawesome/free-brands-svg-icons';




// function ViewSocialIcons() {

//   const solidIcons = Object.keys(SolidIcons).map((icon) => ({ name: icon, icon: SolidIcons[icon] }));
//   const brandIcons = Object.keys(BrandIcons).map((icon) => ({ name: icon, icon: BrandIcons[icon] }));

//   const [socialIcons, setSocialIcons] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`${process.env.NEXT_PUBLIC_API_URL}/social-icons`)
//       .then((response) => {
//         setSocialIcons(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching social icons:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/social-icons/${id}`)
//       .then(() => {
//         setSocialIcons((prevIcons) => prevIcons.filter((icon) => icon.id !== id));
//         toast.success("Icon Deleted Successfully");
//       })
//       .catch((error) => {
//         console.error('Error deleting icon:', error);
//         toast.error("Error Deleting Icon");
//       });
//   };

//   return (
//     <Admin>
//       <div className="container-fluid my-5">
//         {loading ? (
//           // Show loading spinner while waiting for data
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <div>
//               <img src="https://cdn-icons-png.flaticon.com/512/7560/7560658.png" alt="Loading..." style={{ animation: 'spin 3s linear infinite', width: '50px' }} />
//               <p style={{ textAlign: 'center' }}>Loading....</p>
//             </div>
//           </div>
//         ) : socialIcons.length > 0 ? (
//           // Display the table if records are found
//           <table className="table table-bordered">
//             <thead className="thead-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Icon</th>
//                 <th>Link</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {socialIcons.map((icon) => (
//                 <tr key={icon.id}>
//                   <td>{icon.id}</td>
      
                  
//                   <td>            
//                   {icon.name}
//                   </td>

//                   <td>
//                     {icon.icon_class}
//                     {[...solidIcons, ...brandIcons].map((icon, index) => (
//                   <FontAwesomeIcon icon={icon.icon_class} size="3x" className="selected-icon" />
//                     ))}
//                   </td>

//                   <td>{icon.link}</td>

//                   <td>
//                     <Link href={`/dashboard/EditSocialIcons/${icon.id}`} className="btn btn-primary mx-3">
//                       Edit
//                     </Link>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleDelete(icon.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           // Display a message when no records are found
//           <p>No records found.</p>
//         )}
//       </div>
//     </Admin>
//   );
// }

// export default ViewSocialIcons;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import Admin from '../layouts/Admin';
// import { toast } from 'react-toastify';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
// import * as BrandIcons from '@fortawesome/free-brands-svg-icons';

// function ViewSocialIcons() {
//   const solidIcons = Object.keys(SolidIcons).map((icon) => ({ name: icon, icon: SolidIcons[icon] }));
//   const brandIcons = Object.keys(BrandIcons).map((icon) => ({ name: icon, icon: BrandIcons[icon] }));

//   const [socialIcons, setSocialIcons] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`${process.env.NEXT_PUBLIC_API_URL}/social-icons`)
//       .then((response) => {
//         setSocialIcons(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching social icons:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/social-icons/${id}`)
//       .then(() => {
//         setSocialIcons((prevIcons) => prevIcons.filter((icon) => icon.id !== id));
//         toast.success("Icon Deleted Successfully");
//       })
//       .catch((error) => {
//         console.error('Error deleting icon:', error);
//         toast.error("Error Deleting Icon");
//       });
//   };

//   return (
//     <Admin>
//       <div className="container-fluid my-5">
//         {loading ? (
//           // Show loading spinner while waiting for data
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <div>
//               <img src="https://cdn-icons-png.flaticon.com/512/7560/7560658.png" alt="Loading..." style={{ animation: 'spin 3s linear infinite', width: '50px' }} />
//               <p style={{ textAlign: 'center' }}>Loading....</p>
//             </div>
//           </div>
//         ) : socialIcons.length > 0 ? (
//           // Display the table if records are found
//           <table className="table table-bordered">
//             <thead className="thead-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Icon</th>
//                 <th>Link</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
            
//               {socialIcons.map((icon) => (
//                 <tr key={icon.id}>
//                   <td>{icon.id}</td>
//                   <td>{icon.name}</td>
//                   <td>
//                     {icon.icon_class}
//                   </td>
//                   <td>{icon.link}</td>
//                   <td>
//                     <Link href={`/dashboard/EditSocialIcons/${icon.id}`} className="btn btn-primary mx-3">
//                       Edit
//                     </Link>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleDelete(icon.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           // Display a message when no records are found
//           <p>No records found.</p>
//         )}
//       </div>
//     </Admin>
//   );
// }

// export default ViewSocialIcons;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Admin from '../layouts/Admin';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';

function ViewSocialIcons() {
  const solidIcons = Object.keys(SolidIcons).map((icon) => ({ name: icon, icon: SolidIcons[icon] }));
  const brandIcons = Object.keys(BrandIcons).map((icon) => ({ name: icon, icon: BrandIcons[icon] }));

  const [socialIcons, setSocialIcons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/social-icons`)
      .then((response) => {
        setSocialIcons(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching social icons:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/social-icons/${id}`)
      .then(() => {
        setSocialIcons((prevIcons) => prevIcons.filter((icon) => icon.id !== id));
        toast.success("Icon Deleted Successfully");
      })
      .catch((error) => {
        console.error('Error deleting icon:', error);
        toast.error("Error Deleting Icon");
      });
  };

  const renderIcon = (iconClass) => (
    <div dangerouslySetInnerHTML={{ __html: iconClass }} />
  );

  return (
    <Admin>
      
      <div className="container-fluid my-5">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <img src="https://cdn-icons-png.flaticon.com/512/7560/7560658.png" alt="Loading..." style={{ animation: 'spin 3s linear infinite', width: '50px' }} />
              <p style={{ textAlign: 'center' }}>Loading....</p>
            </div>
          </div>
        ) : socialIcons.length > 0 ? (
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Icon</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {socialIcons.map((icon) => (
                <tr key={icon.id}>
                  <td>{icon.id}</td>
                  <td>{icon.name}</td>
                  <td>
                  
                  {[...solidIcons, ...brandIcons].map((item, index) => (
                    icon.icon_class === item.name && ( 
                      <FontAwesomeIcon key={index} icon={item.icon} size="4x" className="icon m-2" />
                    )
                  ))}
                  </td>
                  <td>{icon.link}</td>
                  <td>
                    <Link href={`/dashboard/EditSocialIcons/${icon.id}`} className="btn btn-primary mx-3">
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(icon.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </Admin>
  );
}

export default ViewSocialIcons;
