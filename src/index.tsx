import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { Main } from './components/Main';
import { Support } from './components/Support';
import { RequireAuth } from './components/RequireAuth';
import { RegisterPage } from './components/RegisterPage';
import { UserProfile } from './components/UserProfile';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path="rent" element={<h1>Rent</h1>} />
            <Route path="support" element={<Support />} />
            <Route element={<RequireAuth />}>
              <Route path="rent-out" element={<h1>Rent out</h1>} />
              <Route path="user-profile" element={<UserProfile />} />
            </Route>
            <Route path="login" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
