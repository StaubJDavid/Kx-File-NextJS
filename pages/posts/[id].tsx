import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from 'next/head';
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

type Props = {
    postData: {
        title:string,
        date:string,
        contentHtml: string
    };
}

const Post:NextPage<Props> = ({postData}) => {
    return (
        <div>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXL}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>
            </article>
        </div>
    );
}

//Statically generate dynamic routes -> Needs an array of possible values for [id]
//Needs an array of objects with a key of params, and the key needs an object as a value with id as a key because of the [id]
//Dont call FETCH, user server code directly
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();

    return {
        paths,
        fallback:false
    }
}

//Dont call FETCH, user server code directly
export const getStaticProps: GetStaticProps = async ({params}) => {
    const postData = await getPostData(params.id as string);

    return {
        props: {
            postData
        }
    };
}

export default Post;