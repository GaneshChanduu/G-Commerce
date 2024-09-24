import React, { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "./reducers/actionTypes";

const Layout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const location = useLocation();

  const [isHovered, setIsHovered] = useState(false);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const headerStyle = {
    padding: "10px 20px",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
    paddingRight: "30px",
    fontWeight: "bold",
  };

  const cartContainerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const cartDetailsStyle = {
    display: isHovered ? "block" : "none",
    position: "absolute",
    right: "50%",
    transform: "translateX(50%)",
    top: "170%",
    width: "250px",
    backgroundColor: "white",
    border: "1px solid #dee2e6",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    padding: "10px",
  };

  const cartItemStyle = {
    display: "flex",
    padding: "10px",
    borderBottom: "1px solid #dee2e6",
  };

  const lastCartItemStyle = {
    borderBottom: "none",
  };

  const cartThumbnailStyle = {
    width: "80px",
    height: "100px",
    objectFit: "cover",
    marginRight: "10px",
  };

  const cartInfoStyle = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  };

  const emptyCartMessageStyle = {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  };

  const removeButtonStyle = {
    backgroundColor: "black",
    borderRadius: "5px",
    color: "white",
    padding: "5px 10px",
  };

  return (
    <div>
      <header style={headerStyle}>
        <nav style={navStyle}>
          <Link to="/home" style={linkStyle}>
            HomePage
          </Link>
          {location.pathname !== "/products" && (
            <Link to="/products" style={linkStyle}>
              ProductList
            </Link>
          )}
          <div
            style={cartContainerStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link to="/cart" style={linkStyle}>
              Cart ({cartItems.length})
            </Link>
            <div style={cartDetailsStyle}>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      ...cartItemStyle,
                      ...(index === cartItems.length - 1
                        ? lastCartItemStyle
                        : {}),
                    }}
                  >
                    <Link to={`/cart/`}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={cartThumbnailStyle}
                      />
                    </Link>
                    <div style={cartInfoStyle}>
                      <p>{item.title}</p>
                      <p style={{ fontWeight: "bold" }}>
                        Quantity: {item.quantity}
                      </p>
                      <p>Price: ${item.price}</p>
                      <button
                        style={removeButtonStyle}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p style={emptyCartMessageStyle}>Cart is empty😕</p>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
