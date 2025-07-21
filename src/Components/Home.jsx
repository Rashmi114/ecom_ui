import { useNavigate } from "react-router-dom";
import '../styles/Home.css'
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { getItems, menuGroups, savedItems } from "../api/data";
import Cart from "./Cart";

export default function Home({setAuth}){
    const [item, setItem] = useState([]);
     const [allItems, setAllItems] = useState([]);
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedMenuCode, setSelectedMenuCode] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user] = useState({name: localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')).userName : 'Guest'})

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const [itemsRes, menuRes] = await Promise.all([
                    getItems(),
                    menuGroups()
                ]);
                setItem(itemsRes.data.data);
                setAllItems(itemsRes.data.data);
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

    const handleSearchChange = (searchValue) => {
        const trimmed = searchValue.trim().toLowerCase();
        if(!trimmed) {
            const filtered = item.filter(
                (item)=> item.menuCode === selectedMenuCode
            );
            setFilteredItems(filtered);
            // setFilteredItems(item);
            return;
        }
        const result = allItems.filter ((item) =>
        item.itemName.toLowerCase().includes(trimmed)
    );
    setFilteredItems(result);
    }
    // Cart Functions
    const handleAddToCart = (product) => {
        setCart((prev)=> {
            const exist = prev.find((item)=> item._id == product._id);
            if(exist){
                return prev.map((item) =>
                    item._id == product._id ? {...item, quantity: item.quantity + 1} : item
                );
            }
            return [...prev, {...product, quantity: 1}];
        });
    };

    const updateQuantity = (id, change) => {
        setCart(prev =>
            prev.map(item=>
                item._id == id? {... item, quantity: Math.max(1, item.quantity + change)}
                : item
            )
        );
    };

    const deleteItem = (id) => {
        setCart(prev => prev.filter(item => item._id !== id));
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.amount * item.quantity, 0);
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleClearCart = () => {
        setCart([]);   
    };

    const handleSaveItems = async(e) =>{
        console.log('Saving items:', cart);
                setLoading(true);
                const crartData = {
                    items: cart
                }
                try{
                    const response = await savedItems(crartData);
                    console.log('Saved items response:', response.data);
                    if(response.data.status === 1){
                        alert(response.data.message);
                        setCart([]);
                    }
                } catch (err){
                    console.error('Server Error', err.message);
                    alert(err.message)
                } finally {
                   setLoading(false); 
                }

    }

    if(loading) return <div className="home-page" >Loading...</div>
    if(error) return <div className="home-page" style={{color: 'red'}}>{error}</div>
    return(
        <>
        <Header user={user} setAuth = {setAuth} onSearchChange={handleSearchChange}/>
        <div className="home-layout">
            <Sidebar menu={menu} onSelectCategory={setSelectedMenuCode} />
            <ProductList products={filteredItems} onSelectItem={handleAddToCart} />
            <Cart cartItems={cart}
             onUpdateQunatity= {updateQuantity}
            onDeleteItem = {deleteItem}
            totalAmount = {totalAmount}
            totalQuantity = {totalQuantity}
            saveItems = {handleSaveItems}
            clearCart = {handleClearCart} />
        </div>
        </>
    )
}