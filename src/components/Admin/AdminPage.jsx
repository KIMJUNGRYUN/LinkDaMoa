import { Link, Outlet, useNavigate } from 'react-router-dom';
import AdminTemplate from './AdminTemplate';
import { logout } from '../../api';
import { UserIcon } from 'lucide-react';


export default function AdminPage() {
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
            <Link to="/admin/banner" className="block text-gray-700 hover:text-blue-600 transition">
            📝 배너수정
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

      {/* 메인 영역 */}
      <main className="flex-1 p-6 space-y-8">
          <div className="flex items-center gap-2 mb-4">
            <UserIcon className="w-8 h-8 text-gray-700" />
            <h2 className="text-2xl font-bold">Admin Page</h2>
          </div>


        {/* AdminTemplate 카드들 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminTemplate title="성인" api="http://localhost:8080/api/adult" />  
          <AdminTemplate title="해외 성인" api="http://localhost:8080/api/foreign" />
          <AdminTemplate title="성인 틱톡" api="http://localhost:8080/api/adult_Tiktok" />
          <AdminTemplate title="유흥" api="http://localhost:8080/api/pleasure" /> 
          <AdminTemplate title="애니메이션" api="http://localhost:8080/api/animation" />
          <AdminTemplate title="드라마" api="http://localhost:8080/api/drama" /> 
          <AdminTemplate title="스포츠" api="http://localhost:8080/api/sports" />
          <AdminTemplate title="웹툰" api="http://localhost:8080/api/webtoon" />    
        </div>

        {/* 배너 수정 등 중첩 라우팅 영역 */}
        <Outlet />
      </main>
    </div>
  );
}
