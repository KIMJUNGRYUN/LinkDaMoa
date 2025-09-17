import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api";
import AdultList from "../AdultList";
import Adult_Tiktok from "../Adult_Tiktok";
import Foreign from "../Foreign";
import Pleasure from "../Pleasure";
import Animaion from "../Animaion";
import Drama from "../Drama";
import Sports from "../Sports";
import WebToon from "../WebToon"
import BannerList from "../BannerList";


export default function AdminDashboard() {
    const navigate = useNavigate();
    
  const handleLogout = async () => {
      try {
        await logout();
        navigate("/", { replace: true }); 
      } catch (err) {
        console.error("로그아웃 실패", err);
      }
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
            <Link to="/admin/banner" className="block text-gray-700 hover:text-blue-600 transition">
            📝 배너수정
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
      
 <div className="p-6 space-y-6">
  <h2 className="text-2xl font-bold">📊 콘텐츠 현황</h2>

  <div className="flex gap-6">
    {/* 왼쪽: 콘텐츠 그리드 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
      <section><AdultList /></section>
      <section><Foreign /></section>
      <section><Adult_Tiktok /></section>
      <section><Pleasure /></section>
      <section><Animaion /></section>
      <section><Drama /></section>
      <section><Sports /></section>
      <section><WebToon /></section>
    </div>

    {/* 오른쪽: 배너 */}
    <aside className="w-150"> 
         
     <BannerList />
      
    </aside>
  </div>
</div>
</div>
   
  );
}
