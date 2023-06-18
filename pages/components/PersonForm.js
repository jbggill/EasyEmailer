import { useState } from "react";
import styles from "../styles/index.module.css";

export default function PersonForm({ setMessage }) {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [contactInfoInput, setContactInfoInput] = useState("");

  async function handleSubmit(event) {
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
    <form onSubmit={handleSubmit}>
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
  );
}
