import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('username', username);
        navigate('/quiz');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
