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
const Home = ({allPostsData}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    startClock();
  }, [dispatch]);

  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Examples />
      <Link href={`/show-redux-state`}>
        <a>Check redux store on different page</a>
      </Link>
      <DownloadButton />
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

//For Getting data before Rendering the site as static files
//Dont call FETCH, user server code directly
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default Home; 