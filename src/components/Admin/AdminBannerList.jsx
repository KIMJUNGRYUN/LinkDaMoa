import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../api';


const AdminBannerList = () => {
  const [banners, setBanners] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true }); 
    } catch (err) {
      console.error("로그아웃 실패", err);
    }
  };


  // API endpoint
  const SPRING_API = "http://localhost:8080/api/banners";

  // 배너 데이터 불러오기
  const fetchBanners = () => {
    fetch(SPRING_API)
      .then(res => res.json())
      .then(data => setBanners(data));
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  

  // 이미지 업로드 + 배너 등록
  const handleUpload = async () => {
    if (!imageFile) {
      alert("이미지를 먼저 선택하세요!");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await fetch(`${SPRING_API}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("파일 업로드 실패");

      const { imageUrl } = await res.json();

      await fetch(SPRING_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          orderIndex: banners.length,
          link: imageLink,
        }),
      });

      setImageFile(null);
      setImagePreviewUrl(null);
      setImageLink("");
      fetchBanners();
    } catch (err) {
      console.error("🚨 업로드 중 오류 발생:", err);
      alert("업로드 실패: " + err.message);
    }
  };

  // 배너 삭제
  const handleDelete = async (id) => {
    await fetch(`${SPRING_API}/${id}`, { method: "DELETE" });
    fetchBanners();
  };

  return (
   <div className="flex min-h-screen bg-gray-100">
      {/* 왼쪽 사이드바 */}
      <aside className="w-64 bg-white shadow-md border-r p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">⚙ 관리자 메뉴</h2>
        <nav className="space-y-3">
          <Link to="/admin" className="block text-gray-700 hover:text-blue-600 transition">
            📂 어드민 페이지
          </Link>
          <Link to="/admin/dashboard" className="block text-gray-700 hover:text-blue-600 transition">
            📊 관리자 대시보드
          </Link>
           <Link to="/admin/changepassword" className="block text-gray-700 hover:text-blue-600 transition">
            🔒 비밀번호 수정
          </Link>
          <Link to="/" className="block text-gray-700 hover:text-blue-600 transition">
            🏠 사용자 홈으로
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left text-red-600 hover:text-red-800 font-medium"
          >
            🚪 로그아웃
          </button>
        </nav>
      </aside>

      {/* 오른쪽 메인 영역 */}
      <div className="flex-1 p-6 max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold">배너 관리</h2>

        {/* 파일 선택 및 업로드 */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="banner-upload"
            className="cursor-pointer bg-gray-200 px-3 py-2 rounded border hover:bg-gray-300"
          >
            파일 선택
          </label>
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              setImageFile(file);
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setImagePreviewUrl(reader.result);
                reader.readAsDataURL(file);
              } else {
                setImagePreviewUrl(null);
              }
            }}
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            사진 추가
          </button>
        </div>

        {/* 이미지 미리보기 & 링크 입력 */}
        {imagePreviewUrl && (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500">선택한 이미지 미리보기:</p>
            <img
              src={imagePreviewUrl}
              alt="미리보기"
              className="w-40 h-auto border rounded shadow"
            />
            
           <input
            type="text"
            placeholder="링크를 입력하세요. ex)http://google.com"
            value={imageLink}
            onFocus={() => {
              if (!imageLink) {
                setImageLink("http://");
              }
            }}
            onChange={(e) => setImageLink(e.target.value)}
            className="border px-3 py-2 rounded w-full max-w-md text-sm"
          />

          </div>
        )}

        {/* 배너 리스트 (6개 이상이면 스크롤) */}
        <div className={`mt-6 ${banners.length > 7 ? "max-h-[500px] overflow-y-auto pr-1" : ""}`}>
          <ul className="space-y-3">
            {banners.map((b) => (
              <li
                key={b.id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:8080${b.imageUrl}`}
                    alt="배너"
                    className="w-24 h-14 object-cover border rounded"
                  />
                  <div className="flex flex-col gap-2">
                    {/* 순서 변경 */}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800">순서:</span>
                      <select
                        value={b.orderIndex}
                        onChange={(e) => {
                          const newOrder = parseInt(e.target.value);
                          fetch(`${SPRING_API}/${b.id}/order?orderIndex=${newOrder}`, {
                            method: "PUT",
                          }).then(fetchBanners);
                        }}
                        className="border rounded px-2 py-1"
                      >
                        {banners.map((_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 링크 수정 */}
                    <div className="flex items-center gap-2">
  <span className="text-gray-800 text-sm">링크:</span>
  <input
    type="text"
    value={b.link || ""}
    onFocus={() => {
      // 값이 비어 있을 때만 자동으로 http:// 채워주기
      if (!b.link) {
        const newLink = "http://";
        fetch(`${SPRING_API}/${b.id}/link?link=${encodeURIComponent(newLink)}`, {
          method: "PUT",
        })
          .then(() => fetchBanners())
          .catch((err) => alert("링크 수정 실패: " + err.message));
      }
    }}
    onChange={(e) => {
      const newLink = e.target.value;
      fetch(`${SPRING_API}/${b.id}/link?link=${encodeURIComponent(newLink)}`, {
        method: "PUT",
      })
        .then(() => fetchBanners())
        .catch((err) => alert("링크 수정 실패: " + err.message));
    }}
    className="border px-2 py-1 text-sm w-64 rounded"
    placeholder="https://example.com"
  />
</div>


                    {/* 이미지 변경 */}
                    <label className="text-sm text-blue-600 cursor-pointer">
                      이미지 변경
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const newFile = e.target.files[0];
                          if (!newFile) return;

                          const formData = new FormData();
                          formData.append("file", newFile);

                          fetch(`${SPRING_API}/${b.id}/image`, {
                            method: "PUT",
                            body: formData,
                          })
                            .then(() => fetchBanners())
                            .catch((err) =>
                              alert("이미지 변경 실패: " + err.message)
                            );
                        }}
                      />
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="text-red-600 hover:underline"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminBannerList;
