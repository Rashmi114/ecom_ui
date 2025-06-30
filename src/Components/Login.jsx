import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/AuthForm.css';
import { login } from "../api/auth";

export default function Login({setAuth}){
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault();
        const credentials = {
            userId,
            password
        }
        try{
            const response = await login(credentials);
            console.log('Login Successful: ', response);
            localStorage.setItem("token", response.data.token);
            setAuth(true)
            setUserId('')
            setPassword('')
            navigate('/home')
        } catch (err){
            console.error('Login error:', err.message);
            alert(err.message)
            setUserId('')
            setPassword('')
        }
    }

    return(
        <div className="auth-page">
        <div className="auth-box">
            <h2>Login</h2>
            <input type="text" value={userId} placeholder="User ID" onChange={e=> setUserId(e.target.value)}/>
            <input type="password" value={password} placeholder="Password" onChange={e=> setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <Link to="/register">Register Now</Link></p>
        </div>
        </div>
    )
}