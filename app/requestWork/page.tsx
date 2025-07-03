"use client";
import React, { useState } from "react";

export default function RequestWorkPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [departureAddress, setDepartureAddress] = useState("");
  const [departureLat, setDepartureLat] = useState("");
  const [departureLng, setDepartureLng] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [arrivalAddress, setArrivalAddress] = useState("");
  const [arrivalLat, setArrivalLat] = useState("");
  const [arrivalLng, setArrivalLng] = useState("");
  const [gallery, setGallery] = useState("");
  const [status, setStatus] = useState("");
  const [requester, setRequester] = useState("");
  const [cargoDetails, setCargoDetails] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  // API経由でrequestWorks.jsonに保存する（APIルートは仮）
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setMessage("タイトルと説明を入力してください");
      return;
    }
    const work = {
      title,
      description,
      category,
      requestDate,
      departure: {
        city: departureCity,
        address: departureAddress,
        coordinates: {
          latitude: Number(departureLat),
          longitude: Number(departureLng),
        },
      },
      arrival: {
        city: arrivalCity,
        address: arrivalAddress,
        coordinates: {
          latitude: Number(arrivalLat),
          longitude: Number(arrivalLng),
        },
      },
      gallery: gallery.split(",").map((s) => s.trim()).filter(Boolean),
      status,
      requester,
      cargoDetails,
      price: Number(price),
    };
    try {
      const res = await fetch("/api/requestWorks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(work),
      });
      if (res.ok) {
        setMessage("リクエストを保存しました");
        setTitle(""); setDescription(""); setCategory(""); setRequestDate("");
        setDepartureCity(""); setDepartureAddress(""); setDepartureLat(""); setDepartureLng("");
        setArrivalCity(""); setArrivalAddress(""); setArrivalLat(""); setArrivalLng("");
        setGallery(""); setStatus(""); setRequester(""); setCargoDetails(""); setPrice("");
      } else {
        setMessage("保存に失敗しました");
      }
    } catch (err) {
      setMessage("エラーが発生しました");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>新規リクエストワーク登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <label>説明</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <label>カテゴリ</label>
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} style={{ width: "100%" }} placeholder="例: delivery" />
        </div>
        <div>
          <label>依頼日</label>
          <input type="datetime-local" value={requestDate} onChange={e => setRequestDate(e.target.value)} style={{ width: "100%" }} />
        </div>
        <fieldset>
          <legend>出発地</legend>
          <input type="text" value={departureCity} onChange={e => setDepartureCity(e.target.value)} placeholder="都市" />
          <input type="text" value={departureAddress} onChange={e => setDepartureAddress(e.target.value)} placeholder="住所" />
          <input type="number" value={departureLat} onChange={e => setDepartureLat(e.target.value)} placeholder="緯度" step="any" />
          <input type="number" value={departureLng} onChange={e => setDepartureLng(e.target.value)} placeholder="経度" step="any" />
        </fieldset>
        <fieldset>
          <legend>到着地</legend>
          <input type="text" value={arrivalCity} onChange={e => setArrivalCity(e.target.value)} placeholder="都市" />
          <input type="text" value={arrivalAddress} onChange={e => setArrivalAddress(e.target.value)} placeholder="住所" />
          <input type="number" value={arrivalLat} onChange={e => setArrivalLat(e.target.value)} placeholder="緯度" step="any" />
          <input type="number" value={arrivalLng} onChange={e => setArrivalLng(e.target.value)} placeholder="経度" step="any" />
        </fieldset>
        <div>
          <label>画像URL（カンマ区切り）</label>
          <input type="text" value={gallery} onChange={e => setGallery(e.target.value)} style={{ width: "100%" }} placeholder="/images/xxx.jpg, /images/yyy.jpg" />
        </div>
        <div>
          <label>ステータス</label>
          <input type="text" value={status} onChange={e => setStatus(e.target.value)} style={{ width: "100%" }} placeholder="例: pending" />
        </div>
        <div>
          <label>依頼者</label>
          <input type="text" value={requester} onChange={e => setRequester(e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <label>荷物内容</label>
          <input type="text" value={cargoDetails} onChange={e => setCargoDetails(e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <label>料金</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} style={{ width: "100%" }} />
        </div>
        <button type="submit">登録</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
