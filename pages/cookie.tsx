import { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import {getSortedPostsData} from '../lib/posts';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';


//FOR GETTING DATA USE/TRY useSWR
const Cookie = () => {

  const [cookieState, setCookieState] = useState("None");

  useEffect(() => {
    const authCookie = getCookie("auth");
    console.log(authCookie);
    if(authCookie && authCookie === "Authenticated yea"){
      setCookieState("Set");
    }
  },[cookieState]);

  const onLoginClick = async () => {
    try {
      const cookieResult = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE}/cookies/servercookie`);
      setCookie("auth",cookieResult.data.auth, {sameSite:"lax", maxAge:30});
      setCookie("other",cookieResult.data.other, {sameSite:"lax", maxAge:30});
      setCookieState("Set");
      console.log(getCookies());
    } catch (error) {
      setCookieState("Error");
    }
  }

  return (
    <div>
      <Head>
        <title>Cookie Test</title>
      </Head>
      <button onClick={() => onLoginClick()}>
        "Login"
      </button>
      <div>
        {cookieState}
      </div>
      
      {cookieState === "Set"?
      <div>
        <a className='btn btn-primary' href={`${process.env.NEXT_PUBLIC_BACKEND_SERVE_FILES}babi/macuin.png`} target = "_self">
          <img src={`${process.env.NEXT_PUBLIC_BACKEND_SERVE_FILES}babi/macuin.png`} />
        </a>
      </div>:<></>}
      <img src={`${process.env.NEXT_PUBLIC_BACKEND_SERVE_FILES}babi/macuin.png`} />
    </div>
  )
}

//For Getting data before Rendering the site as static files
//Dont call FETCH, user server code directly
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  //await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE}/cookies/setcookie`);
  //const allPostsData = getSortedPostsData();
  /*try {
    const cookieResult = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE}/cookies/servercookie`);
    //setCookie("auth",cookieResult.data.auth, {req, res, sameSite:"lax"});
    setCookie("other",cookieResult.data.other, {req, res, sameSite:"lax"});
    console.log(getCookies({req,res}));
    return {
      props: {
        setCookieResult:"Gucci",
      },
    };
  } catch (error) {
    return {
      props: {
        setCookieResult:"Error",
      },
    };
  }*/
  return {
    props: {
      
    },
  };
}

export default Cookie; 