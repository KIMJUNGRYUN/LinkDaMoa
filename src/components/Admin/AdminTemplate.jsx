import React, { useEffect, useState } from "react";

export default function AdminTemplate({ title, api }) {
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState({ name: "", url: "" });
  const [editingId, setEditingId] = useState(null);

  const load = () => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setLinks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    load();
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${api}/${editingId}` : api;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("저장 실패");
      await load();
      setForm({ name: "", url: "" });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ name: item.name, url: item.url });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${api}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("삭제 실패");
      setLinks((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold"> {title} 콘텐츠 관리</h2>

      <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-md">
        <div>
          <label className="block text-sm mb-1">이름</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">URL</label>
          <input
            type="text"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            onFocus={() => {
              if (!form.url) {
                setForm((prev) => ({ ...prev, url: "http://" }));
              }
            }}
            placeholder="http://"
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            {editingId ? "수정 저장" : "추가"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", url: "" });
              }}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              취소
            </button>
          )}
        </div>
      </form>

      {/* 목록 (5개 이상이면 스크롤) */}
      <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {links.map((item, index) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
          >
            <div>
              <span className="font-semibold text-gray-600 mr-2">
                {index + 1}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                {item.name}
              </a>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(item)}
                className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
