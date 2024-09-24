import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>Welcome to My Products</h1>
        <p>To visit Product List, click on the below button</p>
        <div style={{ textAlign: "center" }}>
          <Link
            to="/products"
            className="product-list-link"
            style={{
              borderRadius: "10px",
              color: "white",
              textDecoration: "none",
              backgroundColor: "blue",
            }}
          >
            Product List
          </Link>
        </div>
      </div>
    </div>
  );
};

/**
 * Exports the `HomePage` component, which renders the home page of the application.
 */
/**
 * Exports the `HomePage` component, which renders the home page of the application.
 */
/**
 * Exports the `HomePage` component, which renders the home page of the application.
 */
export default HomePage;
