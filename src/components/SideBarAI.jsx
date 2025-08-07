import React, { useState } from "react";
import '../styles/sidebarai.scss'

const SidebarAI = () => {
  const HF_TOKEN = process.env.REACT_APP_HF_TOKEN;
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [mode, setMode] = useState("meal");

  const handleAsk = async () => {
    let prompt = "";

    if (mode === "meal") {
      prompt = `Suggest a healthy meal after this activity:\n\n${input}\n\nRespond briefly in 1–2 sentences. Do not use markdown or formatting.`;
    } else if (mode === "workout") {
      prompt = `Suggest a quick workout for this input:\n\n${input}\n\nRespond briefly in 1–2 sentences.`;
    } else if (mode === "explain") {
      prompt = `Explain this in simple fitness terms:\n\n${input}\n\nKeep it short. No formatting.`;
    }

    const res = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:novita",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();
    console.log(data)
    setResponse(data.choices?.[0]?.message?.content.trim() ?? "No reply.");
  };

  return (
    <div className="sidebar-ai">
      <div className="ai-title">AI Helper</div>

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="meal">Suggest Meal</option>
        <option value="workout">Suggest Workout</option>
        <option value="explain">Explain Something</option>
      </select>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        placeholder="Enter your activity or question..."
      />

      <button onClick={handleAsk}>Ask AI</button>

      {response && (
        <div className="ai-response">{response}</div>
      )}
    </div>
  );
};
export default SidebarAI;
