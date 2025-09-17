// components/NumberBox.jsx
import React from "react";

export default function NumberBox({ index }) {
  const colors = [
    "bg-red-500 text-white",      // 빨
    "bg-orange-500 text-white",   // 주
    "bg-yellow-400 text-black",   // 노
    "bg-green-500 text-white",    // 초
    "bg-blue-500 text-white",     // 파
    "bg-indigo-500 text-white",   // 남
    "bg-purple-500 text-white",   // 보
    "bg-pink-500 text-white",     // 추가 
  ];

 
  const colorClass = colors[index % colors.length];

  return (
    <span
      className={`w-7 h-7 flex items-center justify-center 
                  text-sm font-semibold rounded-md shrink-0 
                  ${colorClass}`}
    >
      {index + 1}
    </span>
  );
}
