import React from 'react';
// CRITICAL FIX: Changed BrowserRouter to HashRouter
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './Layout';
import Home from './pages/Home';
import Research from './pages/Research';
import Publications from './pages/Publications';
import Teaching from './pages/Teaching';
import Students from './pages/Students';
import CV from './pages/CV';
import CMS from './pages/CMS';

const queryClient = new QueryClient();

// This wrapper component handles the page title/layout props
function AppContent() {
  const location = useLocation();
  
  const getCurrentPageName = () => {
    const path = location.pathname.toLowerCase().slice(1);
    if (!path || path === 'home') return 'Home';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <Layout currentPageName={getCurrentPageName()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/teaching" element={<Teaching />} />
        <Route path="/students" element={<Students />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/cms" element={<CMS />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}