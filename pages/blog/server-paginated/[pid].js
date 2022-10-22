import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Header from "../../../components/Header";
import BlogListPaginated from "../../../components/blogComponents/BlogListPaginated";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getPaginatedBlogs} from "../../../public/src/features/blogSlice";
import Link from "next/link";
import {getUserDetails} from "../../../public/src/features/UserSlice";


const BlogServerPaginated = () => {
    const router = useRouter();
    const {pid} = router.query

    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);

    useEffect(() => {
     setPage(pid)
    }, [pid]);


    const next = ()=>{
        let size=3;
        let niga = parseInt(+pid)

        dispatch(getPaginatedBlogs({niga,size}));
        setPage(+pid+1)

    }

    const previous = ()=>{
        let size=3;

        let niga = parseInt(+pid)
        dispatch(getPaginatedBlogs({niga,size}));
        setPage(+pid-1)


        router.push("/blog/server-paginated/"+(+pid-1))
    }

    const { userInfo, accessToken } = useSelector((state) => state.users)

    useEffect(() => {
        if (accessToken) {
            dispatch(getUserDetails())
        }
    }, [accessToken, dispatch])



    if (!userInfo) {
        return (
            <div className='unauthorized'>
                <h1>Unauthorized :(</h1>
                <span>
          <Link href={"/auth/login"}>Login</Link> to gain access
        </span>
            </div>
        )
    }


        return (
            <div>
                <Head>
                    <title>Feature Demo</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/public/favicon.ico" />
                </Head>
                <Header />
                <main className={"flex bg-gray-200"}>

                    {

                    }
                    <BlogListPaginated blogUpdate={blogs} previous={previous} next={next} page={pid} size={3} />

                </main>
            </div>
        );




};

export default BlogServerPaginated;
