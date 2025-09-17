import React, { useEffect, useState } from "react";
import tiktok from "../assets/tiktok.png";
import NumberBox from "../components/NumberBox";

export default function Adult_Tiktok() {
  const API = "http://localhost:8080/api/adult_Tiktok";
  const [links, setLinks] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setLinks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white min-h-[460px] flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <div className="flex items-center gap-2">
          <img src={tiktok} alt="tiktok" className="w-6 h-6" />
          <h2 className="text-xl font-bold text-gray-800">성인 틱톡</h2>
        </div>
        {links.length > 5 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {expanded ? "－" : "＋"}
          </button>
        )}
      </div>

      {/* 리스트 */}
      <ul
        className={`space-y-3 flex-grow pr-1 transition-all duration-300 ${
          expanded ? "overflow-visible max-h-none" : "overflow-y-auto max-h-[370px]"
        }`}
      >
        {links.map((item, index) => (
          <li key={item.id}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 
                        hover:bg-gray-100 hover:shadow-md transition-all duration-200"
            >
              <NumberBox index={index} />
              <span className="flex-1 text-center text-sm sm:text-base truncate">
                {item.name}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {links.length === 0 && (
        <p className="text-gray-400 text-center py-6 text-sm">
          불러올 콘텐츠가 없습니다.
        </p>
      )}
    </div>
  );
}
