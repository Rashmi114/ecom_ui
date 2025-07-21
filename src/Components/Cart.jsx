import React from "react";
import '../styles/Cart.css'

const Cart = ({ cartItems, onUpdateQunatity, onDeleteItem, totalAmount, totalQuantity, clearCart, saveItems }) => {
    console.log('CartItems:', cartItems)
    // https://ecom-api-2dim.onrender.com/api/orders/getAllKots
    // https://ecom-api-2dim.onrender.com/api/orders/getSavedKot/1
    // https://ecom-api-2dim.onrender.com/api/orders/savedItems
  if(cartItems.length == 0) return <div className="home-page" style={{color: 'red'}}> No Items Added Yet!</div>
    return (
    <div className="cart-list">
      <div className="cartItems">
        <div className="cartHeader">
          <h4>Item Name</h4>
          <h4>Qty</h4>
        </div>
      {cartItems.map((itemList, index) => (
        <div className="cart-container" key={index}>
          <div className="cart-item">
            <h4>{itemList.itemName}</h4>
            <p>₹{itemList.amount}</p>
          </div>
          <div className="item-qty">
            <button
              className="qty-btn"
              onClick={() => onUpdateQunatity(itemList._id, -1)}
            >
              -
            </button>
            <p>{itemList.quantity}</p>
            <button
              className="qty-btn"
              onClick={() => onUpdateQunatity(itemList._id, 1)}
            >
              +
            </button>
          </div>
          <button className="qty-btn" style={{border: 'none'}} onClick={() => onDeleteItem(itemList._id)}>🗑️</button>
        </div>
      ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <strong>Total Quantity:</strong> {totalQuantity}
          <strong>Total Amount:</strong> ₹{totalAmount}
        </div>
        <div className="cart-buttons">
          <button className="qty-btn" onClick={()=> clearCart()}>🗑️</button>
          <button className="qty-btn" onClick={()=> saveItems()}>➕</button>
          <button className="qty-btn">💰</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
