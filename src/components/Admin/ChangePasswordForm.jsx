import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api";

function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");   
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  if (!user) return <p className="text-center mt-20">⏳ 불러오는 중...</p>;
  if (!user.authenticated) return <p className="text-center mt-20">⚠ 로그인하지 않은 상태입니다.</p>;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true }); 
    } catch (err) {
      console.error("로그아웃 실패", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await res.json();
    if (data.ok) {
      setMessage("비밀번호가 성공적으로 변경되었습니다.");
      setOldPassword("");
      setNewPassword("");
    } else {
      setMessage("❌ 실패: " + (data.error || "알 수 없는 오류"));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md border-r p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">⚙ 관리자 메뉴</h2>
        <nav className="space-y-3">
          <Link to="/admin" className="block text-gray-700 hover:text-blue-600 transition">
            📂 어드민 페이지
          </Link>
           <Link to="/admin/banner" className="block text-gray-700 hover:text-blue-600 transition">
            📝 배너수정
          </Link>
          <Link to="/admin/dashboard" className="block text-gray-700 hover:text-blue-600 transition">
            📊 관리자 대시보드
          </Link>
          <Link to="/" className="block text-blue-700 hover:text-blue-900 transition">
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

      {/* 오른쪽 메인 */}
      <main className="flex-1 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">👤 나의 계정</h2>
        {/* 유저 정보 카드 */}
        <div className="p-6 bg-white rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">👤 내 정보</h3>
          <p><strong>아이디:</strong> {user.username}</p>
          <p><strong>권한:</strong> {user.roles.map(r => r.authority).join(", ")}</p>
        </div>

        {/* 비밀번호 변경 카드 */}
        <div className="p-6 bg-white rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🔑 비밀번호 변경</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="현재 비밀번호"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border rounded p-3 text-sm focus:ring focus:ring-blue-200"
              required
            />
            <input
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded p-3 text-sm focus:ring focus:ring-blue-200"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
            >
              저장
            </button>
            {message && <p className="text-sm mt-2">{message}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}

export default ChangePasswordForm;
