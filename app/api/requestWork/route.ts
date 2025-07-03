import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const DATA_PATH = path.join(process.cwd(), 'packaging/public/data/requestWorks.json');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.description) {
      return NextResponse.json({ error: 'タイトルと説明は必須です' }, { status: 400 });
    }

    // 既存データの読み込み
    let data = { works: [] as any[] };
    try {
      const file = await fs.readFile(DATA_PATH, 'utf-8');
      data = JSON.parse(file);
    } catch (e) {
      // ファイルがなければ新規作成
      data = { works: [] };
    }

    // 新しいIDを割り振る
    const newId = (data.works.length > 0 ? Math.max(...data.works.map((w: any) => w.id)) + 1 : 1);
    const newWork = {
      id: newId,
      title: body.title,
      description: body.description,
      category: body.category,
      requestDate: body.requestDate,
      departure: body.departure,
      arrival: body.arrival,
      gallery: body.gallery,
      status: body.status,
      requester: body.requester,
      cargoDetails: body.cargoDetails,
      price: body.price,
      createdAt: new Date().toISOString(),
    };
    data.works.push(newWork);

    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');

    // Firestoreにも保存
    try {
      await addDoc(collection(db, 'works'), newWork);
    } catch (e) {
      // Firestore保存失敗時もJSON保存は維持
      console.error('Firestore保存エラー:', e);
    }

    return NextResponse.json({ message: '保存しました', work: newWork });
  } catch (err) {
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }
} 