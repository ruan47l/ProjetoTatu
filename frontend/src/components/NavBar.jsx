import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="layout-container">
      {/* Barra do topo */}
      <nav className="navbar-topo">
        
        {/* O Botão Hambúrguer agora é o primeiro item, ficando no canto esquerdo */}
        <button className="menu-hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Menu com os links */}
        <ul className={`menu-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
          <li><Link to="/configuracoes" onClick={toggleMenu}>Configurações</Link></li>
          <li><Link to="/login" onClick={toggleMenu} style={{ color: '#ff4d4d' }}>Sair</Link></li>
        </ul>
      </nav>

      {/* Conteúdo das páginas */}
      <main className="conteudo-principal">
        {children}
      </main>
    </div>
  );
}