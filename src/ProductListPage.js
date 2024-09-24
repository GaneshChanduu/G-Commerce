import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/");
        const data = await response.json();
        console.log("Fetched data:", data);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const backgroundStyle = {
    padding: "20px",
    textAlign: "center",
  };

  const header1Style = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const productListStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "calc(25% - 20px)",
    backgroundColor: "#white",
    borderRadius: "20px",
    overflow: "hidden",
  };

  const cardImgTopStyle = {
    width: "100%",
    height: "200px",
    objectFit: "contain",
  };

  const cardBodyStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
    flexGrow: 1,
  };

  const cardTitleStyle = {
    fontSize: "1.25rem",
    marginBottom: "10px",
  };

  const cardTextStyle = {
    overflow: "hidden",
    position: "relative",
    maxHeight: "3.6em",
    lineHeight: "1.8em",
    marginBottom: "20px",
  };

  const viewDetailsButtonStyle = {
    alignSelf: "center",
    borderRadius: "10px",
  };

  return (
    <div style={backgroundStyle}>
      <div className="header1" style={header1Style}>
        <h1>Product List</h1>
        <p>To visit each and every product details click on below links</p>
      </div>
      <div className="product-list" style={productListStyle}>
        {products.map((product) => (
          <div key={product.id} style={cardStyle} className="card">
            <img
              src={product.thumbnail}
              className="card-img-top"
              alt={product.title}
              style={cardImgTopStyle}
            />
            <div className="card-body" style={cardBodyStyle}>
              <h5 className="card-title" style={cardTitleStyle}>
                {product.title}
              </h5>
              <p className="card-text" style={cardTextStyle}>
                {product.description}
              </p>
              <button
                style={viewDetailsButtonStyle}
                onClick={() => handleViewDetails(product)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;
