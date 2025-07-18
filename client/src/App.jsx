import {useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CreateFormPage from './pages/CreateFormPage.jsx';
import SubmitFormPage from './pages/SubmitFormPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import FormResponsesPage from './pages/FormResponsesPage.jsx';
import SignUpPage from "./pages/SignUpPage.jsx";
import { useAuthStore } from './store/useAuthStore.js';
import ThankYouPage from './pages/ThankYouPage.jsx';


export default function App() {
  
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {checkAuth()},[checkAuth]);

  if(isCheckingAuth && !checkAuth) {return (<img className='w-10 h-10' src={loaderGif}/>);}

  return ( <>
  <Routes>

      {/* Public routes */}
      <Route path="/form/:publicUrl" element={<SubmitFormPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />

      {/* Admin routes */}

      <Route path="/" element={authUser ? <DashboardPage /> : <Navigate to='/login'/>} />
      <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to='/'/>} />
      <Route path="/login" element={authUser ? <DashboardPage /> : <Navigate to='/login'/>} />
      <Route path="/signup" element={authUser ? <SignUpPage /> : <Navigate to='/login'/>} />
      <Route
        path="/admin/form/:formId/responses"
        element={authUser ? <FormResponsesPage /> : <Navigate to='/login'/>}
      />
      <Route
        path="/create-form"
        element={authUser ? <CreateFormPage /> : <Navigate to='/login'/>}
      />

      {/* Catching else */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>

    <Toaster/>

  </>
    
  );
}