import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 사이트 문구 */}
        <p className="text-center text-sm sm:text-base leading-relaxed">
          본 사이트는 게시된 사이트들과 직접적인 연관이 없는 단순 링크 사이트입니다.
        </p>

        {/* 구분선 */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* 카피라이트 */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm">
          <span className="mb-2 sm:mb-0">© {new Date().getFullYear()} MyLinkSite. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="/" className="hover:text-white transition">
              홈
            </a>
            <a href="mailto:contact@example.com" className="hover:text-white transition">
              문의하기
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
