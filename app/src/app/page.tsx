"use client";

import { useState, useCallback } from "react";

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
};

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function classifyDocument(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("配合") || lower.includes("haigo")) return "配合計画書";
  if (lower.includes("フレッシュ") || lower.includes("fresh")) return "フレッシュ試験";
  if (lower.includes("圧縮") || lower.includes("強度") || lower.includes("strength")) return "圧縮強度試験";
  if (lower.includes("納入") || lower.includes("伝票") || lower.includes("delivery")) return "納入伝票";
  if (lower.includes("打設") || lower.includes("計画") || lower.includes("plan")) return "打設計画書";
  if (lower.match(/\.(jpg|jpeg|png)$/i)) return "受入写真";
  return "未分類";
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  "配合計画書": { bg: "bg-blue-50", text: "text-blue-700" },
  "フレッシュ試験": { bg: "bg-green-50", text: "text-green-700" },
  "圧縮強度試験": { bg: "bg-purple-50", text: "text-purple-700" },
  "納入伝票": { bg: "bg-amber-50", text: "text-amber-700" },
  "打設計画書": { bg: "bg-orange-50", text: "text-orange-700" },
  "受入写真": { bg: "bg-pink-50", text: "text-pink-700" },
  "未分類": { bg: "bg-gray-100", text: "text-gray-500" },
};

const NAV_ITEMS = [
  { label: "生コン書類", icon: "doc", active: true },
  { label: "帳票", icon: "table", active: false },
  { label: "利用料", icon: "yen", active: false },
  { label: "ユーザー", icon: "user", active: false },
  { label: "admin", icon: "admin", active: false },
];

function NavIcon({ type }: { type: string }) {
  switch (type) {
    case "doc":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      );
    case "table":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125" />
        </svg>
      );
    case "yen":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case "user":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      );
    case "admin":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [filterOpen, setFilterOpen] = useState(true);
  const [filterCategory, setFilterCategory] = useState("指定なし");

  const addFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (ACCEPTED_TYPES.includes(file.type)) {
        newFiles.push({
          id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}`,
          name: file.name,
          size: file.size,
          type: file.type,
        });
      }
    }
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
      }
    },
    [addFiles]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const filteredFiles =
    filterCategory === "指定なし"
      ? files
      : files.filter((f) => classifyDocument(f.name) === filterCategory);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[180px] shrink-0 bg-white border-r border-[#e0e0e0] flex flex-col">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-[#e0e0e0]">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-[#1a6fc9]" fill="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="8" height="8" rx="1" />
              <rect x="13" y="3" width="8" height="8" rx="1" opacity="0.6" />
              <rect x="3" y="13" width="8" height="8" rx="1" opacity="0.6" />
              <rect x="13" y="13" width="8" height="8" rx="1" opacity="0.3" />
            </svg>
            <span className="text-base font-bold text-gray-800">Mill-Box</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-colors ${
                item.active
                  ? "text-[#1a6fc9] bg-[#e8f0fe] font-medium border-l-3 border-[#1a6fc9]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <NavIcon type={item.icon} />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Bottom nav */}
        <div className="border-t border-[#e0e0e0] py-2">
          <a href="#" className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            ログアウト
          </a>
        </div>

        {/* User info */}
        <div className="border-t border-[#e0e0e0] px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-[11px] text-white font-bold">
              U
            </div>
            <div className="overflow-hidden">
              <p className="text-[12px] text-gray-700 truncate">user@example.com</p>
              <p className="text-[11px] text-gray-400">demo</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Header */}
        <header className="bg-white border-b border-[#e0e0e0] px-6 py-3 flex items-center justify-between shrink-0">
          <h1 className="text-base font-bold text-gray-800">
            生コン書類一括アップロード
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => document.getElementById("file-input")?.click()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#1a6fc9] text-[#1a6fc9] rounded text-[13px] font-medium hover:bg-blue-50 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              PDFアップロード
            </button>
            <button
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#e0e0e0] text-gray-600 rounded text-[13px] font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={files.length === 0}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
              ロット仕分け
            </button>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="bg-white border-b border-[#e0e0e0] shrink-0">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-1.5 px-6 py-2.5 text-[13px] text-gray-600 hover:text-gray-800 w-full text-left"
          >
            <svg
              className={`w-3 h-3 transition-transform ${filterOpen ? "rotate-90" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                clipRule="evenodd"
              />
            </svg>
            書類を絞り込み
          </button>
          {filterOpen && (
            <div className="px-6 pb-3 flex items-end gap-6">
              <div>
                <label className="block text-[12px] text-gray-500 mb-1">書類分類</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border border-[#e0e0e0] rounded px-2.5 py-1.5 text-[13px] text-gray-700 bg-white min-w-[160px]"
                >
                  <option>指定なし</option>
                  <option>配合計画書</option>
                  <option>フレッシュ試験</option>
                  <option>圧縮強度試験</option>
                  <option>納入伝票</option>
                  <option>打設計画書</option>
                  <option>受入写真</option>
                  <option>未分類</option>
                </select>
              </div>
              <button
                onClick={() => setFilterCategory("指定なし")}
                className="text-[12px] text-gray-400 hover:text-gray-600 pb-1.5"
              >
                条件をクリア
              </button>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileInput}
            className="hidden"
          />

          {files.length === 0 ? (
            /* Empty State: Drop Zone */
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById("file-input")?.click()}
              className={`
                rounded border-2 border-dashed p-16 text-center cursor-pointer transition-colors bg-white
                ${isDragOver ? "border-[#1a6fc9] bg-[#e8f0fe]" : "border-[#d0d0d0] hover:border-[#aaa]"}
              `}
            >
              <div className="flex flex-col items-center gap-3">
                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
                <p className="text-[14px] text-gray-600">
                  ここに生コン関連書類をドラッグ＆ドロップ
                </p>
                <p className="text-[12px] text-gray-400">
                  または クリックしてファイルを選択（PDF / JPG / PNG）
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 mt-2 text-[11px] text-gray-400">
                  {["配合計画書", "打設計画書", "フレッシュ試験", "圧縮強度試験", "納入伝票", "受入写真"].map((label, i) => (
                    <span key={label}>
                      {i > 0 && <span className="mr-1.5">|</span>}
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* File Table */
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {/* Summary row */}
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[13px] text-gray-500">
                  {filteredFiles.length}件
                  {filterCategory !== "指定なし" && ` (${filterCategory})`}
                  {" / 全{files.length}件"}
                </p>
                <button
                  onClick={() => setFiles([])}
                  className="text-[12px] text-gray-400 hover:text-red-500"
                >
                  すべて削除
                </button>
              </div>

              <div className={`rounded border bg-white overflow-hidden ${isDragOver ? "border-[#1a6fc9] ring-2 ring-[#1a6fc9]/20" : "border-[#e0e0e0]"}`}>
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-[#fafafa] border-b border-[#e0e0e0]">
                      <th className="text-left px-4 py-2.5 font-medium text-gray-500 w-8">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium text-gray-500">ファイル名</th>
                      <th className="text-left px-4 py-2.5 font-medium text-gray-500 w-[120px]">分類</th>
                      <th className="text-left px-4 py-2.5 font-medium text-gray-500 w-[100px]">ステータス</th>
                      <th className="text-right px-4 py-2.5 font-medium text-gray-500 w-[90px]">サイズ</th>
                      <th className="text-center px-4 py-2.5 font-medium text-gray-500 w-[60px]">PDF</th>
                      <th className="text-center px-4 py-2.5 font-medium text-gray-500 w-10" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => {
                      const category = classifyDocument(file.name);
                      const style = CATEGORY_STYLES[category] || CATEGORY_STYLES["未分類"];
                      return (
                        <tr key={file.id} className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors">
                          <td className="px-4 py-2.5">
                            <input type="checkbox" className="rounded border-gray-300" />
                          </td>
                          <td className="px-4 py-2.5 text-gray-800">
                            <span className="truncate block max-w-md">{file.name}</span>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className={`inline-block rounded px-2 py-0.5 text-[12px] font-medium ${style.bg} ${style.text}`}>
                              {category}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="inline-flex items-center gap-1 text-[12px] text-green-600">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                              </svg>
                              アップロード済
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-500">
                            {formatFileSize(file.size)}
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            <button className="text-gray-400 hover:text-[#1a6fc9]">
                              <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                              </svg>
                            </button>
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            <button
                              onClick={() => removeFile(file.id)}
                              className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Drop more hint */}
              <div
                className="mt-3 rounded border border-dashed border-[#d0d0d0] p-3 text-center text-[12px] text-gray-400 cursor-pointer hover:border-gray-400 hover:text-gray-500 transition-colors"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                + さらにファイルを追加
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
