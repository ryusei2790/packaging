import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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
      createdAt: new Date().toISOString(),
    };
    data.works.push(newWork);

    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json({ message: '保存しました', work: newWork });
  } catch (err) {
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }
} 