import { useState } from "react";
import styles from "../styles/index.module.css";

export default function Result({message}) {

  const handleSend = (event) => {
    alert("Button clicked");
  };


  return (
    <>
      {message && (
        <div className={styles.result}>
          {message}
          <button type="submit" onClick={handleSend}>
            Send Message
          </button>
        </div>
      )}
    </>
  );
}
