import Layout from "../components/layout";
import { getAllPostIds, getPostData } from "../lib/posts";
import Head from 'next/head';
import Date from "../components/date";
import utilStyles from '../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useEffect, useState } from "react";
import axios from 'axios';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import {useRouter} from "next/router";

type Props = {
    
}

const Register:NextPage<Props> = ({}) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
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

    const onRegisterClick = () => {
        axios.post(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/auth/register`,
        {
            email: email,
            username: username,
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
                <title>Register</title>
            </Head>
            <label>Email</label>
            <input
                type={"text"}
                onChange={(e:any) => setEmail(e.target.value)}
                value={email}
            />

            <label>Username</label>
            <input
                type={"text"}
                onChange={(e:any) => setUsername(e.target.value)}
                value={username}
            />

            <label>Password</label>
            <input
                type={"password"}
                onChange={(e:any) => setPassword(e.target.value)}
                value={password}
            />

            <button onClick={onRegisterClick}>Register</button>
        </div>
    );
}

export default Register;