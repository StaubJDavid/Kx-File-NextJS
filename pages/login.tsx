import Layout from "../components/layout";
import { getAllPostIds, getPostData } from "../lib/posts";
import Head from 'next/head';
import Date from "../components/date";
import utilStyles from '../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

type Props = {
    
}

const Login:NextPage<Props> = ({}) => {
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <label>Email</label>
            <input type={"text"} />

            <label>Password</label>
            <input type={"password"} />
        </div>
    );
}

export default Login;