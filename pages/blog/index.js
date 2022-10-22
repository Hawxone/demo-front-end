import React from 'react';
import Head from "next/head";
import Header from "../../components/Header";
import BlogList from "../../components/blogComponents/BlogList";



const Blog = () => {
    return (
        <div>
            <Head>
                <title>Feature Demo</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={"flex bg-gray-200"}>
                <BlogList itemsPerPage={5} />
            </main>

            <footer >
            </footer>
        </div>
    );
};

export default Blog;
