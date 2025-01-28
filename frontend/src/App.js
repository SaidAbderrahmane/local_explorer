import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';
import NavBar from './Components/NavBar';

function App() {
  return (
    <Router>
    <div className="min-h-screen bg-gray-100">
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </div>
    </Router>
  );
}

export default App;

