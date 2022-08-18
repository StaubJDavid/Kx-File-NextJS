import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from "../components/date";
import {getSortedPostsData} from '../lib/posts';
import { GetStaticProps } from 'next';
import {startClock} from '../redux/actions/timerActions';
import Examples from '../components/examples';
import DownloadButton from '../components/DownloadButton';
import axios from 'axios';
import { useRouter } from 'next/router';


//FOR GETTING DATA USE/TRY useSWR
const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
      axios.post(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/auth/token`)
      .then(
        res => {
          console.log("Have cookie and good");
        }
      )
      .catch(
        err => {
          router.push("login");
        }
      )
  },[]);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        Dashboard
      </div>
    </div>
  )
}

export default Dashboard; 