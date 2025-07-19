import React from "react";
import '../styles/Sidebar.css';


const Sidebar = ({ menu, onSelectCategory }) =>{
   return(
    <div className="sidebar">
        {menu.map((menuType, index)=>(
        <button key={index} onClick={()=> onSelectCategory(menuType.menuCode)}>{menuType.menuGroup}</button>
        ))}

    </div>
   )
}

export default Sidebar;