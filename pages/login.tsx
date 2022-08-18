import Layout from "../components/layout";
import { getAllPostIds, getPostData } from "../lib/posts";
import Head from 'next/head';
import Date from "../components/date";
import utilStyles from '../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import axios from 'axios';

type Props = {
    
}

const Login:NextPage<Props> = ({}) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/auth/token`)
        .then(
            res => {
                router.push("dashboard");
            }
        )
        .catch(
            err => {
                console.log(err.response.data);
            }
        )
    },[]);

    const onLoginClick = () => {
        axios.post(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/auth/login`,
        {
            email: email,
            password: password
        }
        ).then(
            res => {
                console.log(res.data);
                setCookie("Auth",res.data.token, {sameSite:"lax", maxAge:900})//15min
                router.push("dashboard");
            }
        ).catch(
            err => {
                console.log(err.response.data);
            }
        )
    }

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <label>Email</label>
            <input
                type={"text"}
                onChange={(e:any) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password</label>
            <input
                type={"password"}
                onChange={(e:any) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={onLoginClick}>Login</button>
        </div>
    );
}

export default Login;