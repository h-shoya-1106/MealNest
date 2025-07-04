'use client';

import { useEffect, useState } from 'react';

type Note = {
  id: number;
  date: string;
  content: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const [newDate, setNewDate] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

    const handleAdd = async () => {
    if (!newDate || !newContent.trim()) return;
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: newDate, content: newContent }),
    });
    setNewDate('');
    setNewContent('');
    setIsAdding(false);
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSave = async () => {
    await fetch('/api/notes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, content: editContent }),
    });

    setEditingId(null);
    setEditContent('');
    fetchNotes();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('本当に削除しますか？')) return;
    await fetch('/api/notes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchNotes();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📝 メモ管理ページ</h1>

      {/* 新規追加 */}
      {isAdding ? (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">新しいメモを追加</h2>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="border p-1 mr-2"
          />
          <input
            type="text"
            placeholder="メモ内容"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="border p-1 mr-2 w-1/2"
          />
          <button
            onClick={handleAdd}
            className="px-2 py-1 bg-green-500 text-white rounded"
          >
            追加
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="ml-2 px-2 py-1 bg-gray-300 rounded"
          >
            キャンセル
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded"
        >
          ＋ 新しいメモを追加
        </button>
      )}

      {/* メモ一覧 */}
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="mb-4 border-b pb-2">
            <div>📅 {note.date}</div>
            {editingId === note.id ? (
              <>
                <input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="border p-1 mr-2"
                />
                <button
                  onClick={handleSave}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  保存
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="ml-2 px-2 py-1 bg-gray-300 rounded"
                >
                  キャンセル
                </button>
              </>
            ) : (
              <>
                <div>📝 {note.content}</div>
                <button
                  onClick={() => handleEdit(note)}
                  className="mt-1 px-2 py-1 bg-gray-300 rounded mr-2"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="mt-1 px-2 py-1 bg-red-500 text-white rounded"
                >
                  削除
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
