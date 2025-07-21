import React, { useEffect, useState } from "react";
import { getOrderDetails } from "../api/data";
import { useLocation, useNavigate } from "react-router-dom";;

const OrderDetails = () => {
    const location = useLocation();
    const kotNumber = location.state?.kotNumber;
    const [orderDetails, setOrderDetails] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if(kotNumber){
        setLoading(true);
        console.log('Fetching order details for:', kotNumber);
        const fetchOrderDetails = async () => {
            try{
                const response = await getOrderDetails(kotNumber);
                console.log('Order Details fetched successfully:', response.data);
                if(response.data.status === 1) {
                    setOrderDetails(response.data.items);
                    setTotalAmount(response.data.totalAmount);
                } else {
                    throw new Error('Failed to fetch order details');
                }
            } catch (err) {
                console.error('Error', err.message);
                setError(err.message);
                alert(err.message)
            } finally {
                setLoading(false);
            }
        }
        fetchOrderDetails()
        }
        
    }, [kotNumber])
    const handleClose = () => {
         navigate('/home');
    }

    if(loading) return <div className="home-page" ><span className="spinner"></span></div>
    if(error) return <div className="home-page" style={{color: 'red'}}>{error}</div>
    return (
        <>
        <div className="preview-header">
            <h4> Order Orders #{kotNumber}</h4>
            <button onClick={handleClose}>🏠</button>
        </div>
        <div className="order-content">
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Srl #</th>
                        <th>Item Name</th>
                        <th>Qty</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.length === 0 ? (
                        <tr>
                            <td colspan="4" className="no-records">No Orders Found!</td>
                        </tr>
                    ) : (
                        orderDetails.map((order, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.itemName}</td>
                            <td>{order.quantity}</td>
                            <td>₹{order.amount}</td>
                        </tr>
                    ))
                    )}
                </tbody>
            </table>
            <table>
                <tfoot>
                    <tr>
                        <td colSpan="3"><strong>Total Amount:</strong></td>
                        <td>₹{totalAmount}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        </>
        
    );
}

export default OrderDetails;