import { Html, Head, Main, NextScript } from 'next/document'
//import Header from './components/Header'
import AuthUser from './components/AuthUser'
import { useRouter } from 'next/router';

export default function Document() {



  return (
    <Html lang="en">
      <Head />
      
      <body >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
