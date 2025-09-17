import { useState } from "react";
import { login } from "../../api"
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const redirect = params.get("redirect") || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      navigate(redirect, { replace: true });
    } catch  {
      setError("아이디 또는 비밀번호가 잘못되었습니다.");
   
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h1 className="text-xl font-bold">관리자 로그인</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button className="w-full py-2 bg-black text-white rounded">
          로그인
        </button>
      </form>
    </div>
  );
}
