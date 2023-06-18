import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [contactInfoInput, setContactInfoInput] = useState("");
  const [message, setMessage] = useState("");
  const tempRes = "Hey Jesse! I hope you're doing well. It's been a while since we last talked and I wanted to check in with you and see how you're doing. I know that school and learning computer science can be tough, but I want you to know that I'm always here for you if you need someone to talk to. On a lighter note, don't forget to show yourself some love and buy a few flowers or something cute for your favorite chihuahas! Love you always, [Your Name]"
  const handleSend = (event) => {
    alert('button clicked')
  }
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const person = {
        name: nameInput,
        description: descriptionInput,
        contactInfo: contactInfoInput,
      };
      console.log(JSON.stringify({ person }));
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ person : ("".concat(nameInput, descriptionInput)) }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setMessage(data.result);
      setNameInput("");
      setDescriptionInput("");
      setContactInfoInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/friends.png" className={styles.icon} />
        <h3>Create a person</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter a name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input
            type="text"
            name="description"
            placeholder="Enter a description"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <input
            type="text"
            name="contactInfo"
            placeholder="Enter contact info"
            value={contactInfoInput}
            onChange={(e) => setContactInfoInput(e.target.value)}
          />
          <input type="submit" value="Generate message" />
        </form>
        <div className={styles.result}>{tempRes}</div>
        <button type = "submit" onClick={handleSend}>Send Message</button>
      </main>
    </div>
  );
}
