"use client";
import React, { useState } from "react";

export default function RequestWorkPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // API経由でrequestWorks.jsonに保存する（APIルートは仮）
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setMessage("タイトルと説明を入力してください");
      return;
    }
    try {
      const res = await fetch("/api/requestWorks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        setMessage("リクエストを保存しました");
        setTitle("");
        setDescription("");
      } else {
        setMessage("保存に失敗しました");
      }
    } catch (err) {
      setMessage("エラーが発生しました");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h1>新規リクエストワーク登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="例: 丹生旅行"
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label>説明</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="旅行の詳細を入力してください"
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">登録</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
