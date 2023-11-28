import '@/styles/globals.css'
import '@/styles/Header.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';


// Frontend Template Dependencies
import '@/assets/css/style.css';
import '@/assets/css/modal.css';


// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 



export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes('dashboard')) {
      import('@/assets/vendor/bootstrap/css/bootstrap.min.css');
      import('@/assets/vendor/fonts/circular-std/style.css');
      import('@/assets/libs/css/style.css');
      // import('@/assets/vendor/fonts/fontawesome/css/fontawesome-all.css');
      import('@/assets/vendor/charts/chartist-bundle/chartist.css');
      import('@/assets/vendor/charts/morris-bundle/morris.css');
      // import('@/assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css');
      import('@/assets/vendor/charts/c3charts/c3.css');
      import('@/assets/vendor/fonts/flag-icon-css/flag-icon.min.css');
    }

    

  }, [router.pathname]);
  return <><Component {...pageProps} /><ToastContainer /> </>
}



