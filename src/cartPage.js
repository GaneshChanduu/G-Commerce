import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "./reducers/actionTypes";
import { Link } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, Math.min(30, prevQuantities[id] + change)),
    }));
  };

  const handleUpdateQuantity = (id) => {
    dispatch(updateCartQuantity(id, quantities[id]));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p
          style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Your cart is empty.
          <Link
            className="back-button"
            to="/products"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            Go shopping!
          </Link>
        </p>
      ) : (
        <div>
          <div className="cart-container">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <Link
                  to={`/product/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    style={{ width: "100px", height: "100px" }}
                  />
                </Link>
                <div className="cart-item-details">
                  <h3>
                    <Link
                      to={`/product/${item.id}`}
                      state={{ product: item }}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p>{item.description}</p>
                  <p>Price: ${item.price}</p>
                  <p style={{ fontWeight: "bold" }}>
                    Quantity:{" "}
                    <div className="quantity-controls">
                      <button
                        style={{
                          backgroundColor: "#f9f9f9",
                          width: "30px",
                          color: "black",
                        }}
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span>{quantities[item.id]}</span>
                      <button
                        style={{
                          backgroundColor: "#f9f9f9",
                          width: "30px",
                          color: "black",
                        }}
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    Total: ${item.price * quantities[item.id]}
                  </p>
                  <button
                    style={{ backgroundColor: "black" }}
                    onClick={() => handleUpdateQuantity(item.id)}
                  >
                    Update
                  </button>
                  <button
                    style={{ backgroundColor: "black" }}
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            style={{ backgroundColor: "black", margin: "10px" }}
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <div style={{ paddingLeft: "10px" }}></div>
          <h1 style={{ textAlign: "center", color: "green" }}>
            Thank you for your purchase :)🥳
          </h1>
        </div>
      )}
    </div>
  );
}

export default CartPage;
