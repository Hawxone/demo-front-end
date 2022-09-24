import React from 'react';
import Head from "next/head";
import Header from "../../components/Header";
import Products from "../../components/productComponents/Products";


const ProductsIndex = () => {
    return (
        <div>
            <Head>
                <title>Belajar</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={"flex bg-gray-200"}>
                <Products itemsPerPage={5} />
            </main>

            <footer >
            </footer>
        </div>
    );
};

export default ProductsIndex;
