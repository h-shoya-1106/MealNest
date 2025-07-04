'use client';

import Link from 'next/link';
import { useState } from 'react';
// noteという型を読み込む
// /types/note.tsというファイルから読み込む
// つまり/types/note.ts内にあるNoteを使用する
import { Note } from '../types/note';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([
    { date: '2025-07-01', content: '卵を買う' },
    { date: '2025-07-02', content: '味噌汁の作り方調べる' },
  ]);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">メモ一覧</h1>
      <ul className="list-disc pl-6 space-y-2">
        {notes.map((note) => (
          <li key={note.date}>
            <Link href={`/note/${note.date}`} className="text-blue-500 underline">
              {note.date}：{note.content}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
