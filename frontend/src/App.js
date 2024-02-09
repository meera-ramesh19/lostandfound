import React, { useState } from 'react';
import FeedbackForm from './feedback/FeedbackForm';
import Navbar from './Navbar/Navbar';
import HelpUs from './help-us-find-page/HelpUs';
import AboutUs from './About/AboutUs';
import Home from './home-page/Home';
import GoToTop from './go-to-top/GoToTop';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LostUpload from './lost-details-upload-page/LostUpload';
import FoundUpload from './found-item-details-page/FoundUpload';
import ItemDetails from './item-gallery-details/ItemDetails';
import ItemGallery from './items-gallery/ItemGallery';
import MarkLost from './found-item-details-page/MarkLost';
import CategorySelection from './items-gallery/CategorySelection';
import Login from './login-page/Login';
// import Register from './signUp/Register';
import Faq from './faq/Faq';
import Footer from '../src/Footer/Footer';
import { useAuth } from './context/AuthContext';
import Profile from './Profile';
import UserList from './Admin/UserList';
import Dashboard from './Admin/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';


const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = (theme) => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log(theme);
  };

  const [showConfirmPage, setShowConfirmPage] = useState(false);

  const showConfirm = (value) => {
    setShowConfirmPage(value);
  };
  const { user } = useAuth();
  return (
    <Router>
      <>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route path='/login' element={<Login theme={theme} />} />

          <Route path='/about' element={<AboutUs theme={theme} />} />
          <Route path='/faq' element={<Faq theme={theme} />} />

          <Route path='/feedback' element={<FeedbackForm theme={theme} />} />

          <Route path='/home' element={<Home theme={theme} />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile theme={theme} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/lost'
            element={
              <ProtectedRoute>
                <LostUpload theme={theme} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/found'
            element={
              <ProtectedRoute>
                <FoundUpload theme={theme} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/marklost'
            element={
              <ProtectedRoute>
                <MarkLost theme={theme} />
              </ProtectedRoute>
            }
          />

          <Route
            path='/items'
            element={
              <ProtectedRoute>
                <CategorySelection theme={theme} />
              </ProtectedRoute>
            }
          />

          <Route
            path='/details/:id'
            element={
              <ProtectedRoute>
                <ItemDetails func={showConfirm} theme={theme} />
              </ProtectedRoute>
            }
          />

          <Route
            path='/helpusfind'
            element={
              <ProtectedRoute>
                <HelpUs theme={theme} />
              </ProtectedRoute>
            }
          />

          <Route
            path='/admin'
            element={
              <AdminRoute>
                <Dashboard theme={theme} />
              </AdminRoute>
            }
          />

          <Route
            path='/admin/users'
            element={
              <AdminRoute>
                <UserList theme={theme} />
              </AdminRoute>
            }
          />
        </Routes>
        <GoToTop />
        <Footer />
      </>
    </Router>
  );
};

export default App;
