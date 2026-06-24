import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Se não instalou, use: npm install axios
import "./Login.css"; 

function Login() {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/verificar-login/', {
        login: loginInput,
        password: passwordInput
      });

      const temEstudio = response.data.has_studio;

    
      if (temEstudio) {
        navigate('/dashboard'); 
      } else {
        navigate('/cadastro-estudio'); 
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Usuário ou senha incorretos.");
      } else {
        alert("Erro ao conectar com o servidor backend.");
      }
    }
  };

  return (
    <div >
      <h2>Acessar o Sistema</h2>
      
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuário ou E-mail:</label> <br />
          <input 
            type="text" 
            value={loginInput} 
            onChange={(e) => setLoginInput(e.target.value)} 
            required 
          />
        </div>

        <div >
          <label>Senha:</label> <br />
          <input 
            type="password" 
            value={passwordInput} 
            onChange={(e) => setPasswordInput(e.target.value)} 
            required 
          />
        </div>

        <button type="submit">Entrar</button>
      </form>

      <p >
        Não tem conta? <button onClick={() => navigate('/cadastro-estudio')}>Cadastre-se</button>
      </p>
    </div>
  );
}

export default Login;