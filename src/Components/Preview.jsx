import React, { useEffect, useState } from "react";
import {getAllKots} from "../api/data";
import { useNavigate } from "react-router-dom";
import '../styles/AuthForm.css';
import '../styles/Home.css';
import '../styles/Preview.css';

const Preview = () => {
    const [previewOrders, setPreviewOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchKOTs = async ()=> {
            try {
                const response = await getAllKots();
                console.log('KOTs fetched successfully:', response.data);
                // Handle the response data as needed       
                if(response.data.status === 1) {
                    setPreviewOrders(response.data.kotDetails);
                }

            } catch (err) {
                console.error('Error fetching KOTs:', err.message);
                alert(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchKOTs();
    }, []);

    const handleOrderDetails = (kotNumber) => {
        console.log('Navigating to order details for KOT:', kotNumber);
        navigate(`/orderDetails`, { state: { kotNumber } });
    }
    const handleClose = () => {
        navigate('/home');
    }

    if(loading) return <div className="home-page" ><span className="spinner"></span></div>
    if(error) return <div className="home-page" style={{color: 'red'}}>{error}</div>
    return (
        <>
        <div className="preview-header">
        <h4> Preview Orders</h4>
        <button onClick={handleClose}>🏠</button>
        </div>
        <div className="preview-content">
            <table className="preview-table">
                <thead>
                    <tr>
                        <th>Srl #</th>
                        <th>Order I'd</th>
                        <th>Date/Time</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {previewOrders.length === 0 ? (
                        <tr>
                            <td colspan="4" className="no-records">No Orders Found!</td>
                        </tr>
                    ) : (
                        previewOrders.map((order, index) => (
                        <tr key={index} onClick={() => handleOrderDetails(order.kotNumber)}>
                            <td>{index + 1}</td>
                            <td>{order.kotNumber}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                            <td>₹{order.totalAmount}</td>
                        </tr>
                    ))
                    )}
                    
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Preview;