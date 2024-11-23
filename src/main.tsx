import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';
import { Support } from './components/Support';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { RequireAuth } from './components/RequireAuth';

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
              <Route path="user-profile" element={<h1>User profile</h1>} />
            </Route>
            <Route
              path="login"
              element={<h1>You need to be logined to access this page!</h1>}
            />
          </Route>
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
