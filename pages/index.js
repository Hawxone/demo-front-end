import Head from 'next/head'

import Header from "../components/Header";

import Products from "../components/Products";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Belajar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header />
      <main className={"flex bg-gray-200"}>
          <Products />
      </main>

      <footer >
      </footer>
    </div>
  )
}
