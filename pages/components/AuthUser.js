// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// export default function AuthUser() {
    
//   const router = useRouter();
//   const [token, setToken] = useState('');
//   const [user, setUser] = useState('');
  
//   useEffect(() => {
//     // Use `sessionStorage` in `useEffect` to ensure it's on the client side.
//     const getToken = () => {
//       const tokenString = sessionStorage.getItem('token');
//       const userToken = JSON.parse(tokenString);
//       console.log(userToken);
//       return userToken;
//     }
  
//     const getUser = () => {
//       const userString = sessionStorage.getItem('user');
//       if (userString) {
//         try {
//           const userDetail = JSON.parse(userString);
//           return userDetail;
//         } catch (error) {
//           console.error("Error parsing userString:", error);
//           return null;
//         }
//       }
//       return null; // Return null if userString is undefined
//     }
  
//     setToken(getToken());
//     const parsedUser = getUser();
//     console.log("Parsed User:", parsedUser);
//     setUser(parsedUser);
//   }, []); // Empty dependency array means this runs only once after initial render
  

//   const saveToken = (user, token) => {
//     sessionStorage.setItem('token', JSON.stringify(token));
//     sessionStorage.setItem('user', JSON.stringify(user));

//     setToken(token);
//     setUser(user);

//     // Use the router to navigate to '/dashboard'
//     router.push('/dashboard');
//   }

//   const logout = () => {
//     sessionStorage.clear();

//     // Use the router to navigate to '/login'
//     router.push('/login');
//   }

//   const http = axios.create({
//     //baseURL: "http://127.0.0.1:8000/api",
//     baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
//     headers: {
//       "Content-type": "application/json",
//       "Authorization": `Bearer ${token}`
//     }
//   });


//   return [
//     saveToken,
//     token,
//     user,
//     http,
//     logout
//   ];
// }



import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthUser = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const getToken = () => {
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      console.log(userToken);
      return userToken;
    }

    const getUser = () => {
      const userString = sessionStorage.getItem('user');
      if (userString) {
        try {
          const userDetail = JSON.parse(userString);
          return userDetail;
        } catch (error) {
          console.error("Error parsing userString:", error);
          return null;
        }
      }
      return null;
    }

    setToken(getToken());
    const parsedUser = getUser();
    console.log("Parsed User:", parsedUser);
    setUser(parsedUser);
  }, []);

  const saveToken = (user, token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setUser(user);

    router.push('/dashboard');
  }

  const logout = () => {
    sessionStorage.clear();
    router.push('/login');
  }

  const http = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return [saveToken, token, user, http, logout];
}

export default AuthUser;
