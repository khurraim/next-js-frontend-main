// Frontend Template Dependencies

import '@/assets/css/font.css';
import 'bootstrap/dist/css/bootstrap.min.css'
//import '@/styles/globals.css'
//import '@/styles/Header.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import '@/assets/css/fontsIcon.css';
import '@/assets/css/style.css';
import '@/assets/css/modal.css';

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 



export default function App({ Component, pageProps, router }) {
  
  //let router = useRouter();

  // useEffect(() => {
  
  //   if (router.pathname.includes('dashboard')) {
  //     import('@/assets/vendor/bootstrap/css/bootstrap.min.css');
  //     import('@/assets/vendor/fonts/circular-std/style.css');
  //     import('@/assets/libs/css/style.css');
  //     import('@/assets/vendor/fonts/flag-icon-css/flag-icon.min.css');
  //   }

  // }, [router.pathname]);

  //console.log("dashboard returns : ",router.pathname.includes('dashboard'));

  // Determine the route and load the corresponding global styles
  
  const loadGlobalStyles1 = () => {
    if (router.pathname.startsWith('/dashboard')) {
       return import('@/assets/vendor/bootstrap/css/bootstrap.min.css');
    }  else {
      return import ('@/assets/empty.css');
    }
  };

  const loadGlobalStyles2 = () => {
    if (router.pathname.startsWith('/dashboard')) {
        
        return import('@/assets/vendor/fonts/circular-std/style.css');
        
    }   else {
      return import ('@/assets/empty.css');
    }
  };

  const loadGlobalStyles3 = () => {
    if (router.pathname.startsWith('/dashboard')) {
        
        
        return import('@/assets/libs/css/style.css');
        
    }   else {
      return import ('@/assets/empty.css');
    }
  };

  const loadGlobalStyles4 = () => {
    if (router.pathname.startsWith('/dashboard')) {
        
        
        
        return import('@/assets/vendor/fonts/flag-icon-css/flag-icon.min.css');
    }   else {
      return import ('@/assets/empty.css');
    }
  };
 

  // const loadGlobalStyles = () => {
  //   if (router.pathname.startsWith('/dashboard')) {
  //       laod
  //       import('@/assets/vendor/bootstrap/css/bootstrap.min.css');
  //       import('@/assets/vendor/fonts/circular-std/style.css');
  //       import('@/assets/libs/css/style.css');
  //       import('@/assets/vendor/fonts/flag-icon-css/flag-icon.min.css');
  //   }  
  // };

  // if(router.pathname.includes('dashboard')) {
        
  //       import('@/assets/vendor/bootstrap/css/bootstrap.min.css');
  //       import('@/assets/vendor/fonts/circular-std/style.css');
  //       import('@/assets/libs/css/style.css');
  //       import('@/assets/vendor/fonts/flag-icon-css/flag-icon.min.css');
  // }

  return <>
    <Component {...pageProps} />
    <ToastContainer /> 
    {loadGlobalStyles1() && <link rel="stylesheet" href={loadGlobalStyles1()} />}
    {loadGlobalStyles2() && <link rel="stylesheet" href={loadGlobalStyles2()} />}
    {loadGlobalStyles3() && <link rel="stylesheet" href={loadGlobalStyles3()} />}
    {loadGlobalStyles4() && <link rel="stylesheet" href={loadGlobalStyles4()} />}
  </>
}



