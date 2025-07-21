import React, { useState } from "react";
import './Header.css';
import { useNavigate } from "react-router-dom";

const Header = ({ user, onSearchChange, setAuth }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

     const handleLogout=()=>{
        localStorage.clear();
        setAuth(false)
        navigate('/login')
    }

    const handlePreview = () => {
        navigate('/preview');
    }

    return (
        <header className="header">
            <div className="logo">🦋 B-Shop</div>
            <input type="text" className="searchbar" placeholder="Search products...."onChange={(e) => onSearchChange(e.target.value)} />
            <div className="account" onClick={()=>setShowDropdown(!showDropdown) }>
                🌝
                { showDropdown && (
                    <div className="dropdown">
                        <p>{user.name}</p>
                        <button onClick={handlePreview}>Preview</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </header>
    )
}
export default Header;