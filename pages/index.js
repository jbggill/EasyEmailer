import React, { useState } from 'react';
import Head from "next/head";
import PersonForm from "./components/PersonForm";
import Result from "./components/Result";
import styles from "./styles/index.module.css";

export default function Home() {
  const [message, setMessage] = useState(null)
  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/friends.png" className={styles.icon} />
        <h3>Create a person</h3>
        <PersonForm setMessage={setMessage}/>
        <Result message={message}/>
      </main>
    </div>
  );
}
