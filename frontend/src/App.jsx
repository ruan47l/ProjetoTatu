import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login'; 
import CadastroEstudio from './pages/CadastroEstudio';
import Dashboard from './pages/Dashboard';
import Configuracoes from './pages/Configuracoes';
import Sidebar from './components/NavBar';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-estudio" element={<CadastroEstudio />} />

        <Route path="/configuracoes" element={<Sidebar><Configuracoes /></Sidebar>} />
        <Route path="/dashboard" element={<Sidebar><Dashboard /></Sidebar>} />      
      </Routes>
    </Router>
  );
}

export default App;