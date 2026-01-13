import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  // Delivery Details State
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  // Cake message editing
  const [editingMessageIndex, setEditingMessageIndex] = useState(null);
  const [tempMessage, setTempMessage] = useState("");

  // Login modal & OTP
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  // New customer info
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Get Today's Date in YYYY-MM-DD format for the 'min' attribute
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    
    const storedCustomer = JSON.parse(localStorage.getItem("customer"));
    if (storedCustomer) {
      setCustomer(storedCustomer);
    }
  }, []);

  useEffect(() => {
    const handleLoginEvent = () => {
      const storedCustomer = JSON.parse(localStorage.getItem("customer"));
      setCustomer(storedCustomer);
    };
    window.addEventListener("customer-login", handleLoginEvent);
    return () => window.removeEventListener("customer-login", handleLoginEvent);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const changeQuantity = (index, diff) => {
    const updatedCart = [...cart];
    let newQty = updatedCart[index].quantity + diff;
    if (newQty < 1) newQty = 1;
    updatedCart[index].quantity = newQty;
    updatedCart[index].totalPrice = newQty * updatedCart[index].pricePerUnit;
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const saveMessage = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].message = tempMessage;
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
    setEditingMessageIndex(null);
    setTempMessage("");
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);

  // --- PLACE ORDER LOGIC ---
  const handlePlaceOrder = async () => {
    const storedCustomer = JSON.parse(localStorage.getItem("customer"));
    
    if (!storedCustomer) {
      toast.info("Please login to place your order.");
      setShowModal(true);
      return;
    }

    if (!address || !pincode || !deliveryDate) {
      toast.error("Please fill in Address, Pincode, and Delivery Date.");
      return;
    }

    const orderData = {
      customer: {
        name: storedCustomer.name,
        email: storedCustomer.email,
        phone: storedCustomer.phone
      },
      deliveryDetails: {
        address,
        pincode,
        deliveryDate
      },
      items: cart,
      totalAmount: getTotal()
    };

    try {
      const response = await axios.post("https://ecommerce-backend-afg3.onrender.com/api/place-order", orderData);
      
      if (response.status === 200) {
        toast.success("Order Placed Successfully! Confirmation Email Sent.");
        clearCart();
        setTimeout(() => navigate("/"), 2000); 
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  // OTP Logic
  const sendOtp = async () => {
    try {
      const response = await axios.post("https://ecommerce-backend-afg3.onrender.com/api/send-otp", { email });
      setGeneratedOtp(response.data.otp);
      setOtpSent(true);
      toast.success(`OTP sent to ${email}`);
    } catch (err) { toast.error("Failed to send OTP. Try again."); }
  };

  const verifyOtpAndCheckCustomer = async () => {
    if (enteredOtp !== generatedOtp) { toast.error("Invalid OTP. Try again."); return; }
    try {
      const res = await axios.post("https://ecommerce-backend-afg3.onrender.com/api/check-customer", { email });
      if (res.data.exists) {
        const customerData = res.data.customer;
        localStorage.setItem("customer", JSON.stringify(customerData));
        setCustomer(customerData);
        setShowModal(false);
        window.dispatchEvent(new Event("customer-login"));
      } else { setIsNewCustomer(true); }
    } catch (err) { toast.error("Error checking customer."); }
  };

  const saveNewCustomer = async () => {
    if (!name || !phone) { toast.error("Please enter name and phone."); return; }
    try {
      const res = await axios.post("https://ecommerce-backend-afg3.onrender.com/api/add-customer", { name, phone, email });
      const customerData = res.data.customer;
      localStorage.setItem("customer", JSON.stringify(customerData));
      setCustomer(customerData);
      setShowModal(false);
      window.dispatchEvent(new Event("customer-login"));
    } catch (err) { toast.error("Error saving new customer."); }
  };

  return (
    <div className="cart-page">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="cart-header-section">
        <h2 className="cart-title">Your Shopping Cart</h2>
        <div className="cart-divider"></div>
      </div>

      <div className="cart-wrapper">
        {/* LEFT: CART ITEMS */}
        <div className="cart-left">
          {cart.length === 0 ? (
            <div className="empty-cart-container">
              <p>Your cart is currently empty.</p>
              <button className="continue-shopping-btn" onClick={() => navigate("/")}>Browse Menu</button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-card">
                <div className="cart-img-wrapper">
                  <img
                    src={item.image ? `https://ecommerce-backend-afg3.onrender.com/images/${item.image}` : "https://via.placeholder.com/150"}
                    alt={item.name}
                  />
                </div>
                
                <div className="cart-info">
                  <div className="cart-info-header">
                    <h4>{item.name}</h4>
                    <span className="item-price">₹{item.pricePerUnit}</span>
                  </div>
                  
                  <p className="variant-text">Variant: {item.variant}</p>

                  <div className="cart-actions-row">
                    <div className="qty-control">
                      <button onClick={() => changeQuantity(index, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQuantity(index, 1)}>+</button>
                    </div>
                    <button className="remove-link" onClick={() => removeItem(index)}>Remove</button>
                  </div>

                  {item.name.toLowerCase().includes("cake") && (
                    <div className="cake-message-section">
                      {editingMessageIndex === index ? (
                        <div className="msg-input-group">
                          <input
                            type="text"
                            maxLength="25"
                            placeholder="Message on cake..."
                            value={tempMessage}
                            onChange={(e) => setTempMessage(e.target.value)}
                          />
                          <button onClick={() => saveMessage(index)}>Save</button>
                        </div>
                      ) : (
                        <div className="msg-display">
                          <span className="msg-label">Message: </span>
                          {item.message ? (
                            <>
                              <span className="msg-content">"{item.message}"</span>
                              <span className="edit-link" onClick={() => { setEditingMessageIndex(index); setTempMessage(item.message); }}>Edit</span>
                            </>
                          ) : (
                            <span className="add-msg-link" onClick={() => { setEditingMessageIndex(index); setTempMessage(""); }}>+ Add Message</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="item-total-price">
                  ₹{item.totalPrice}
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: ORDER SUMMARY & DELIVERY DETAILS */}
        {cart.length > 0 && (
          <div className="cart-right">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{getTotal()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-text">Free</span>
              </div>
              <div className="divider-line"></div>
              <div className="summary-row grand-total">
                <span>Total</span>
                <span>₹{getTotal()}</span>
              </div>

              {/* --- NEW DELIVERY INPUTS --- */}
              <div className="delivery-inputs">
                <h4 className="delivery-title">Delivery Details</h4>
                <textarea 
                  className="cart-input-area" 
                  placeholder="Full Delivery Address" 
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="input-row">
                  <input 
                    type="text" 
                    className="cart-input" 
                    placeholder="Pincode" 
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  {/* --- UPDATED DATE INPUT: DISABLE PREVIOUS DATES --- */}
                  <input 
                    type="date" 
                    className="cart-input" 
                    min={today} 
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </div>
              </div>

              <button className="checkout-btn" onClick={handlePlaceOrder}>
                {customer ? "Confirm & Place Order" : "Login to Order"}
              </button>
              
              <button className="continue-link" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
              
              <button className="clear-cart-link" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* LOGIN MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2 className="modal-title">Secure Checkout</h2>
            {!otpSent ? (
              <>
                <p>Enter your email to login or signup</p>
                <input type="email" className="modal-input" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className="modal-btn primary" onClick={sendOtp}>Send OTP</button>
              </>
            ) : !isNewCustomer ? (
              <>
                <p>Enter the OTP sent to {email}</p>
                <input type="text" className="modal-input" placeholder="OTP" value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} />
                <button className="modal-btn primary" onClick={verifyOtpAndCheckCustomer}>Verify</button>
              </>
            ) : (
              <>
                <p>Complete your profile</p>
                <input type="text" className="modal-input" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" className="modal-input" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <button className="modal-btn primary" onClick={saveNewCustomer}>Save & Continue</button>
              </>
            )}
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;