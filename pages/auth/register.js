import React from 'react';
import Head from "next/head";
import Header from "../../components/Header";
import LoginComponent from "../../components/authComponents/Login";
import RegisterComponent from "../../components/authComponents/Register";


const Login = () => {
    return (
        <div>
            <Head>
                <title>Belajar</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={"flex bg-gray-200"}>
                <RegisterComponent />
            </main>

            <footer >
            </footer>
        </div>
    );
};

export default Login;