import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Dashboard from './pages/Dashboard';
import AuthCallback from './pages/auth/AuthCallback';
import ProtectedRoutes from './feature/dashboard/AuthGuard';

const App = () => {
  return (
    <>




      <Routes>



        {/* Protected Route   */}

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Public Routes  */}

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/auth/success" element={<AuthCallback />} />

      </Routes>
    </>
  );
};

export default App;