import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedPage from './ProtectedPage';

// Ensure the publishable key is correctly set from the environment variables
const PUBLISHABLE_KEY = 'pk_test_ZGVzaXJlZC1zaGVlcGRvZy0wLmNsZXJrLmFjY291bnRzLmRldiQ'

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const ClerkWithRoutes = () => {
  const navigate = useNavigate();
  return (
    <div style={{marginTop:'100px'}} className='d-flex justify-content-center align-items-center'>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        routerPush={(to) => navigate(to)}
      >
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/sign-in/*' element={<SignIn redirectUrl={'/protected'} routing='path' path='/sign-in' />} />
          <Route path='/sign-up/*' element={<SignUp redirectUrl={'/protected'} routing='path' path='/sign-up' />} />
          <Route path='/protected' element={
            <>
              <SignedIn><ProtectedPage /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
            </>
          } />
        </Routes>
      </ClerkProvider>
    </div>

  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
