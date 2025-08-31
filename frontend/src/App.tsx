import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Dashboard from './pages/Dashboard';
import AuthCallback from './pages/auth/AuthCallback';

const App = () => {
  return (
    <>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/success" element={<AuthCallback />} />

      </Routes>
    </>
  );
};

export default App;