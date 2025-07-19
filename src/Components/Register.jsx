import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/AuthForm.css'
import { register } from "../api/auth";

export default function Register(){
    const [name, setName] = useState('')
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);
        if(!name || !userId || !password){
            alert('Please fill out all fields')
        } else{
            const formData = {
                name,
                userId,
                password
            }
            try{
                const response = await register(formData);
                console.log('Registered: ', response);
                alert(response.data.message)
                setName('')
                setUserId('')
                setPassword('')
                navigate('/login')
            } catch (err) {
                console.error('Registration error:', err.message);
            } finally {
                setLoading(false);
            }
        } 
    }

    return(
        <div className="auth-page">
        <div className="auth-box">
            <h2>Register</h2>
            <input type="text" value={name} placeholder="Username" onChange={e => setName(e.target.value)} />
            <input type="text" value={userId} placeholder="User ID" onChange={e=> setUserId(e.target.value)} />
            <input type="password" value={password} placeholder="Password" onChange={e=> setPassword(e.target.value)} />
            <button onClick={handleRegister} disabled={loading}>{loading ? ( <span className="spinner"></span>) : ("Register")}</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        </div>
    )
}