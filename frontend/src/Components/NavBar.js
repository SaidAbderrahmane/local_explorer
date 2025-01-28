import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // Adjust the path

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              <img src="./logo.png" alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button onClick={logout} className="text-gray-900">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-gray-900">Login</Link>
                <Link to="/signup" className="text-gray-900">Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
