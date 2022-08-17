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


//FOR GETTING DATA USE/TRY useSWR
const Dashboard = () => {


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