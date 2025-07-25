import React from "react";


const ProductList = ({ products, onSelectItem }) =>{
   return(
    <div className="product-list">
        {products.map((itemList, index)=>(
            <div className="product-container" key={index}  onClick={()=> onSelectItem(itemList)}>
                <div className="product-image">
                    <img src={itemList.itemImage} alt={itemList.itemName} />
                </div>
                <div className="product-details">
                    <h4>{itemList.itemName}</h4>
                    <p>Price: ₹{itemList.amount}</p>
                </div>
            </div>
        ))}

    </div>
   )
}

export default ProductList;