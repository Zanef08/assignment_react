import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('https://65375d0cbb226bb85dd31d49.mockapi.io/api/pe_test/Users');
            if (response.status === 200) {
                const users = response.data;
                const user = users.find((u) => u.username === username && u.password === password);
                if (user) {
                    onLogin({
                        name: user.name,
                        email: user.username,
                        picture: user.picture,
                    });
                } else {
                    setErrorMessage('Incorrect Username or Password');
                }
            } else {
                setErrorMessage('Fail to connect to API');
            }
        } catch (error) {
            setErrorMessage('Fail to connect to API: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <p style={{ color: 'red' }}>{errorMessage}</p>
        </div>
    );
};

export default Login;
