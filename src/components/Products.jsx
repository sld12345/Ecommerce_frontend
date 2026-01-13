import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [selectedVariants, setSelectedVariants] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch Products for the category
    fetch(`https://ecommerce-backend-afg3.onrender.com/products?category=${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const initialVariants = {};
        data.forEach((prod) => {
          // Set the first available variant (e.g., 500g or 1kg) as default
          initialVariants[prod._id] = prod.priceVariants?.[0] || null;
        });
        setSelectedVariants(initialVariants);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));

    // Fetch Category Name
    fetch(`https://ecommerce-backend-afg3.onrender.com/categories`)
      .then((res) => res.json())
      .then((data) => {
        const cat = data.find((c) => c._id === categoryId);
        if (cat) setCategoryName(cat.name);
      })
      .catch((err) => console.error("Error fetching category:", err));
  }, [categoryId]);

  const handleVariantChange = (productId, variantLabel) => {
    const prod = products.find((p) => p._id === productId);
    const variant = prod.priceVariants.find(v => v.quantityLabel === variantLabel);
    setSelectedVariants((prev) => ({ ...prev, [productId]: variant }));
  };

  return (
    <section className="products-container">
      <div className="products-header">
        <span className="products-subtitle">Menu Selection</span>
        <h2 className="products-title">{categoryName || 'Our Products'}</h2>
        <div className="header-divider"></div>
      </div>

      {loading ? (
        <div className="loading-container" style={{ textAlign: 'center', padding: '50px' }}>
           <div className="spinner"></div>
           <p>Loading delicious items...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="no-products-container">
           <p className="no-products">No products found in this category.</p>
           <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((prod) => (
            <div key={prod._id} className="product-card">
              
              <div className="card-image">
                <img
                  src={prod.image ? `https://ecommerce-backend-afg3.onrender.com/images/${prod.image}` : "https://via.placeholder.com/300"}
                  alt={prod.name}
                  loading="lazy"
                />
              </div>

              <div className="card-details">
                <div className="card-text">
                  <h3>{prod.name}</h3>
                  <p className="description">{prod.description || "Freshly baked goodness."}</p>
                </div>

                <div className="card-controls">
                  {/* Price and Variant selection only */}
                  <div className="control-row display-only">
                    <div className="variant-info">
                      <span className="price-display">
                        {selectedVariants[prod._id] ? `₹${selectedVariants[prod._id].price}` : '---'}
                      </span>
                      
                      {prod.priceVariants && prod.priceVariants.length > 0 && (
                        <select
                          value={selectedVariants[prod._id]?.quantityLabel || ''}
                          onChange={(e) => handleVariantChange(prod._id, e.target.value)}
                          className="variant-select"
                        >
                          {prod.priceVariants.map((v) => (
                            <option key={v.quantityLabel} value={v.quantityLabel}>
                              {v.quantityLabel}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;