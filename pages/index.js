import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();

  function selectObject(response) {
    return response.choices[0].text;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: questionInput }),
    });
    const data = await response.json();
    const selectedObject = selectObject(data.response);
    console.log(selectedObject);
    setResult(selectedObject);
    setQuestionInput("");
  }

  return (
    <div>
      <Head>
        <title>Ask Me Stuff</title>
        <link rel="icon" href="/question-mark.png" />
      </Head>

      <main className={styles.main}>
        <img src="/question-mark.png" className={styles.icon} />
        <h3>Ask Me Stuff.</h3>
        <form onSubmit={onSubmit}>
        <input
            type="text"
            name="question"
            placeholder="Enter a question"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <input type="submit" value="Ask Question" />
          {result && <div>{result}</div>} 
        </form>
      </main>
    </div>
  );
}
