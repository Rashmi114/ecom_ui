import { useNavigate } from "react-router-dom";
import '../styles/Home.css'

export default function Home({setAuth}){
    const navigate = useNavigate()

    const handleLogout=()=>{
        localStorage.clear();
        setAuth(false)
        navigate('/login')
    }

    return(
        <div className="home-page">
            <h2>Welcome to the Home Page</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}