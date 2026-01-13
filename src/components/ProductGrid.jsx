import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductGrid.css';

const ProductGrid = () => {
  const [categories, setCategories] = useState(null); // null = loading
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ecommerce-backend-afg3.onrender.com/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }, []);

  // Handler for navigation
  const handleCategoryClick = (id) => {
    // 1. Scroll to top of the window
    window.scrollTo(0, 0);
    // 2. Navigate to the new route
    navigate(`/products/${id}`);
  };

  return (
    <section className="category-section" id='shop'>
      {/* Optional Section Header */}
      <div className="section-header">
        <span className="section-subtitle">Browse Our Menu</span>
        <h2 className="section-title">Our Products</h2>
        <div className="title-divider"></div>
      </div>

      <div className="bakery-grid">
        {/* ⏳ Skeleton Loading */}
        {categories === null ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="bakery-card skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
            </div>
          ))
        ) : categories.length === 0 ? (
          <p className="no-data">No categories found.</p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="bakery-card"
              // ✅ Updated onClick to handle scroll reset
              onClick={() => handleCategoryClick(cat._id)}
            >
              <div className="image-wrapper">
                <img
                  src={
                    cat.image
                      ? `https://ecommerce-backend-afg3.onrender.com/images/${cat.image}`
                      : "https://via.placeholder.com/300"
                  }
                  alt={cat.name}
                  loading="lazy"
                />
              </div>
              
              <div className="card-content">
                <h3>{cat.name}</h3>
                <span className="shop-link">View Collection</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductGrid;