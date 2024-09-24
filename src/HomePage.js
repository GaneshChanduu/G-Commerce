import React from "react";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="container1">
      <div className="header">
        <h1>Welcome to My Products</h1>
        <p>To visit Product List, click on the below button</p>
        <div className="header">
          <div style={{ textAlign: "center" }}>
            <Link
              to="/products"
              className="back-button"
              style={{
                borderRadius: "10px",
                color: "white",
                textDecoration: "none",
              }}
            >
              Product List
            </Link>
          </div>
          <Link
            to="/"
            className="back-button"
            style={{
              color: "white",
              textDecoration: "none",
              borderRadius: "10px",
            }}
          >
            Go to Login Page
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
