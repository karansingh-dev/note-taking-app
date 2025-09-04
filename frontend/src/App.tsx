import { Routes, Route } from 'react-router-dom';
import Home from './pages/app/Root/Home';
import SignUp from './pages/auth/SignUp/SignUp';
import SignIn from './pages/auth/SignIn/SignIn';
import Dashboard from './pages/app/Dashboard/Dashboard';
import AuthCallback from './pages/auth/googleSignIn/AuthCallback';
import ProtectedRoutes from './feature/dashboard/components/AuthGuard';
import AuthError from './pages/auth/googleSignIn/AuthError';

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
        <Route path="/auth/error" element={<AuthError />} />

      </Routes>
    </>
  );
};

export default App;