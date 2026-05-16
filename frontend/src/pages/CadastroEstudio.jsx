import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CadastroEstudio() {
    const [NomeEstudioInput, setNomeEstudioInput] = useState('');
    const [CpfCnpjInput, setCpfCnpjInput] = useState(''); 
    const [TelefoneInput, setTelefoneInput] = useState(''); 

    const [UsuarioEstudioInput, setUsuarioEstudioInput] = useState('');
    const [EmailEstudioInput, setEmailEstudioInput] = useState('');
    const [PasswordInputEstudio, setPasswordInputEstudio] = useState('');

    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault(); 
        const dadosFormatados = {
            nome_estudio: NomeEstudioInput,
            cpf_cnpj: CpfCnpjInput,   
            telefone: TelefoneInput,   
            usuario: {                 
                username: UsuarioEstudioInput,
                email: EmailEstudioInput,
                password: PasswordInputEstudio
            }
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/cadastro-estudio/', dadosFormatados);

            if (response.status === 201) {
                alert("Estúdio e Usuário cadastrados com sucesso!");
                navigate('/'); 
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert("Erro no cadastro: " + JSON.stringify(error.response.data));
            } else {
                alert("Erro ao conectar com o servidor.");
            }
        }
    };

    return (
        <div>
            <h2>Cadastro de Estúdio</h2>
            
            <form onSubmit={handleCadastro}>
                <h3>Dados do Estúdio</h3>
                <div>
                    <label>Nome do Estúdio:</label> <br />
                    <input 
                        type="text" 
                        value={NomeEstudioInput} 
                        onChange={(e) => setNomeEstudioInput(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>CPF ou CNPJ:</label> <br />
                    <input 
                        type="text" 
                        value={CpfCnpjInput} 
                        onChange={(e) => setCpfCnpjInput(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>Telefone:</label> <br />
                    <input 
                        type="text" 
                        value={TelefoneInput} 
                        onChange={(e) => setTelefoneInput(e.target.value)} 
                        required 
                    />
                </div>
                <h3>Dados de Acesso do Tatuador</h3>
                <div>
                    <label>Nome de Usuário (Login):</label> <br />
                    <input 
                        type="text" 
                        value={UsuarioEstudioInput} 
                        onChange={(e) => setUsuarioEstudioInput(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>E-mail:</label> <br />
                    <input 
                        type="email" 
                        value={EmailEstudioInput} 
                        onChange={(e) => setEmailEstudioInput(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>Senha:</label> <br />
                    <input 
                        type="password" 
                        value={PasswordInputEstudio} 
                        onChange={(e) => setPasswordInputEstudio(e.target.value)} 
                        required 
                    />
                </div>

                <br />
                <button type="submit">Cadastrar e Criar Conta</button>
            </form>
        </div>
    );
}

export default CadastroEstudio;