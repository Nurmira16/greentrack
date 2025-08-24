import React, { useState } from "react";
import '../styles/sidebarai.scss';
import mascot from '../assets/loading_mascot.png';

const SidebarAI = () => {
  const HF_TOKEN = process.env.REACT_APP_HF_TOKEN;
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [mode, setMode] = useState("meal");

  const handleAsk = async () => {
    if (!input.trim()) return;

    let prompt = "";
    if (mode === "meal") prompt = `Suggest a healthy meal after: ${input}`;
    if (mode === "workout") prompt = `Suggest a quick workout for: ${input}`;
    if (mode === "explain") prompt = `Explain this in simple terms: ${input}`;

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
    setResponse(data.choices?.[0]?.message?.content.trim() ?? "No reply.");
  };

  return (
    <div className="sidebar-ai">
      <div className="ai-container">
        <h2>AI Helper</h2>

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

        <div className="ai-response">
          {response ? response : (
            <div className="empty-state">
              <p>No AI response yet. Ask a question to get started!</p>
              <img src={mascot} alt="Loading mascot" className="loading-mascot" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarAI;
