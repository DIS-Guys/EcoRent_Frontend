import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main/index.ts';
import { Support } from './components/Support/index.ts';
import { UserProfile } from './components/UserProfile/index.ts';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
          <Route path="rent" element={<h1>Rent</h1>} />
          <Route path="rent-out" element={<h1>Rent out</h1>} />
          <Route path="support" element={<Support />} />
          <Route path="user-profile" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
