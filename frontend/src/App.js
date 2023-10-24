
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import { AuthProvider } from './context/AuthContext';
import AccomodationsPage from './pages/AccomodationsPage';
import AccomodationPage from './pages/AccomodationPage'
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<HomePage/>}></Route>
          <Route path="/admin" element={<AdminPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="/acount"  element={<AccountPage/>}></Route>
          <Route path="/accomodations/:location/:adults/:rooms/:start_date/:end_date/:id"  element={<AccomodationPage/>}></Route>
          <Route path="/accomodations/:location/:adults/:rooms/:start_date/:end_date" element={<AccomodationsPage/>}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
