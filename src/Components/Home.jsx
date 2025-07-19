import { useNavigate } from "react-router-dom";
import '../styles/Home.css'
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import axios from "axios";
import { getItems, menuGroups } from "../api/data";


const dummyProducts = [
  { id: 1, name: 'TV', price: 25000, menu: 'Electronics' },
  { id: 2, name: 'Football', price: 1200, menu: 'Sports' },
  { id: 3, name: 'Microwave', price: 8000, menu: 'Appliances' },
];

export default function Home({setAuth}){
    const [item, setItem] = useState([]);
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedMenuCode, setSelectedMenuCode] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user] = useState({name: 'Rashmi'})
    const navigate = useNavigate()

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const [itemsRes, menuRes] = await Promise.all([
                    getItems(),
                    menuGroups()
                ]);
                console.log('Items:', itemsRes.data);
                console.log('Menu Groups:', menuRes.data);
                setItem(itemsRes.data.data);
                setMenu(menuRes.data.data);
                if (menuRes.data.data.length > 0) {
                    setSelectedMenuCode(menuRes.data.data[0].menuCode);
                }
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    useEffect(() => {
        if(!selectedMenuCode) {
            setFilteredItems(item);
        } else {
            const filtered = item.filter(
                (item)=> item.menuCode === selectedMenuCode
            );
            setFilteredItems(filtered);
        }
    }, [selectedMenuCode, item]);

    const handleAddToCart = (product) => {
        setCart((prev)=> {
            const exist = prev.find((item)=> item.id == product.id);
            if(exist){
                return prev.map((item) =>
                    item.id == product.id ? {...item, quantity: item.quantity + 1} : item
                );
            }
            return [...prev, {...product, quantity: 1}];
        });
    };
    const handleLogout=()=>{
        localStorage.clear();
        setAuth(false)
        navigate('/login')
    }

    if(loading) return <div className="home-page" >Loading...</div>
    if(error) return <div className="home-page" style={{color: 'red'}}>{error}</div>
    return(
        <>
        <Header user={user} onLogout={handleLogout} />
        <div className="home-layout">
            <Sidebar menu={menu} onSelectCategory={setSelectedMenuCode} />
            <ProductList products={filteredItems} />
        </div>
        </>
        // <div className="home-page">
        //     <h2>Welcome to the Home Page</h2>
        //     <button onClick={handleLogout}>Logout</button>
        // </div>
    )
}