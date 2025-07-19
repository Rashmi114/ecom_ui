import React, { useState } from "react";
import './Header.css';

const Header = ({ user, onLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className="header">
            <div className="logo">🦋 B-Shop</div>
            <input type="text" className="searchbar" placeholder="Search products...." />
            <div className="account" onClick={()=>setShowDropdown(!showDropdown) }>
                🌝
                { showDropdown && (
                    <div className="dropdown">
                        <p>{user.name}</p>
                        <button onClick={onLogout}>Logout</button>
                    </div>
                )}
            </div>
        </header>
    )
}
export default Header;