import { LogOut, UserPlus } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleMakeAdmin = async () => {
    navigate('/signup', { replace: true });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="bg-orange-100 border-b border-orange-300 shadow-sm p-2 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/ayna.svg" alt="Logo" className="w-44 h-14 mb-1" />
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleMakeAdmin}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 rounded"
        >
          <UserPlus className="size-5" />
          <span className="hidden sm:inline">Make Another Admin</span>
        </button>

        <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 rounded"
          >
            <LogOut className="size-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
      </div>
    </nav>
  );
};

export default Navbar;
