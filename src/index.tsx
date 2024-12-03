import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { Main } from './components/Main';
import { Support } from './components/Support';
import { RequireAuth } from './components/RequireAuth';
import { RegisterPage } from './components/RegisterPage';
import { PersonalPage } from './components/PersonalPage';
import { Cabinet } from './components/Cabinet';
import { Profile } from './components/Profile';
import { Security } from './components/Security';
import { Address } from './components/Address';
//import { RentPage } from './components/RentPage';
import { DevicePage } from './components/DevicePage';
import { Payment } from './components/Payment/Payment.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path="rent">
              <Route index element={<Payment />} />
              <Route path="device-details" element={<DevicePage />} />
            </Route>
            <Route path="support" element={<Support />} />
            <Route element={<RequireAuth />}>
              <Route path="rent-out" element={<h1>Rent out</h1>} />
              <Route path="personal-page" element={<PersonalPage />}>
                <Route index element={<Navigate to="cabinet" replace />} />
                <Route path="cabinet" element={<Cabinet />}>
                  <Route index element={<Navigate to="profile" replace />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="security" element={<Security />} />
                  <Route path="address" element={<Address />} />
                  <Route path="payment" element={<Payment />} />
                </Route>
                <Route path="my-devices" element={<h1>My devices</h1>} />
              </Route>
            </Route>
            <Route path="login" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
