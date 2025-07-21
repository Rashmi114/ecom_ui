import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/AuthForm.css';
import { login } from "../api/auth";

export default function Login({setAuth}){
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true);
        const credentials = {
            userId,
            password
        }
        try{
            const response = await login(credentials);
            console.log('Login Successful: ', response);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userDetails", JSON.stringify(response.data.user))
            setAuth(true)
            setUserId('')
            setPassword('')
            navigate('/home')
        } catch (err){
            console.error('Login error:', err.message);
            alert(err.message)
            setUserId('')
            setPassword('')
        } finally {
           setLoading(false); 
        }
    }

    return(
        <div className="auth-page">
        <div className="auth-box">
            <h2>Login</h2>
            <input type="text" value={userId} placeholder="User ID" onChange={e=> setUserId(e.target.value)}/>
            <input type="password" value={password} placeholder="Password" onChange={e=> setPassword(e.target.value)} />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? ( <span className="spinner"></span>) : ("Login")}
            </button>
            <p>Don't have an account? <Link to="/register">Register Now</Link></p>
        </div>
        </div>
    )
}