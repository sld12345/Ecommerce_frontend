import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderForm = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [addressName, setAddressName] = useState("");

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);

  // loading states
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    if (!userData) {
      toast.error("⚠️ You must be logged in.");
      navigate("/cart");
      return;
    }

    setUser(userData);
    setCart(cartData);

    fetchSavedAddresses(userData.email);
  }, [navigate]);

  const fetchSavedAddresses = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${email}`);
      setSavedAddresses(response.data.addresses || []);

      if (response.data.addresses && response.data.addresses.length > 0) {
        const firstAddress = response.data.addresses[0];
        setSelectedAddress(firstAddress._id);
        setAddress(firstAddress.address);
        setPincode(firstAddress.pincode);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      toast.error("❌ Failed to fetch saved addresses.");
    }
  };

  const handleAddressSelect = (addr) => {
    setSelectedAddress(addr._id);
    setAddress(addr.address);
    setPincode(addr.pincode);
    setShowNewAddressForm(false);
  };

  const handleNewAddressToggle = () => {
    setShowNewAddressForm(!showNewAddressForm);
    if (!showNewAddressForm) {
      setAddress("");
      setPincode("");
      setAddressName("");
      setSelectedAddress("");
    }
  };

  const saveNewAddress = async () => {
  if (!address || !pincode || !addressName) {
    toast.warning("⚠️ Please fill all fields for the new address.");
    return;
  }

  // ✅ Check for duplicates
  const duplicate = savedAddresses.find(
    (addr) =>
      addr.address.trim().toLowerCase() === address.trim().toLowerCase() &&
      addr.pincode.trim() === pincode.trim() &&
      addr.name.trim().toLowerCase() === addressName.trim().toLowerCase()
  );

  if (duplicate) {
    toast.warning("⚠️ This address already exists!");
    return;
  }

  setLoadingAddress(true);
  try {
    const response = await axios.post(
      `http://localhost:5000/api/${encodeURIComponent(user.email)}/address`,
      { address, pincode, name: addressName }
    );

    const newAddress = response.data.address;
    setSavedAddresses([...savedAddresses, newAddress]);
    setSelectedAddress(newAddress._id);
    setShowNewAddressForm(false);

    toast.success("✅ Address saved successfully!");
  } catch (err) {
    console.error("❌ Error saving address:", err.response?.data || err.message);
    toast.error("❌ Failed to save address.");
  } finally {
    setLoadingAddress(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address || !pincode || !deliveryDate) {
      toast.warning("⚠️ Please fill all required fields.");
      return;
    }

    const order = {
      email: user.email,
      items: cart,
      address,
      pincode,
      deliveryDate,
      total: cart.reduce((sum, item) => sum + item.totalPrice, 0),
      placedAt: new Date().toISOString(),
      status: "pending_payment",
    };

    setLoadingOrder(true);
    try {
      const response = await axios.post("http://localhost:5000/api/orders", order);

      console.log("✅ Order response:", response.data);
      localStorage.removeItem("cart");

      // 🎉 Success toast
      toast.success("🎉 Order placed successfully! Please check your mail for the payment QR.", {
        position: "top-center",
        autoClose: false, // stays until user closes
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        onClose: () => navigate("/"), // 👈 Redirect only when toast is closed
      });

    } catch (err) {
      console.error("❌ Order placement failed:", err.response?.data || err);
      toast.error("❌ Failed to place order.");
    } finally {
      setLoadingOrder(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <ToastContainer position="top-center" autoClose={3000} />

      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            marginBottom: "1.5rem",
            color: "#5d4037",
            textAlign: "center",
          }}
        >
          Delivery Details
        </h2>

        {/* Saved Addresses */}
        {savedAddresses.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ marginBottom: "1rem", color: "#7f5543" }}>
              Select a saved address
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {savedAddresses.map((addr) => (
                <div
                  key={addr._id}
                  style={{
                    padding: "1rem",
                    border:
                      selectedAddress === addr._id ? "2px solid #f2c94c" : "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor:
                      selectedAddress === addr._id ? "#fffaf0" : "#f9f9f9",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAddressSelect(addr)}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    {addr.name}
                  </div>
                  <div>{addr.address}</div>
                  <div>Pincode: {addr.pincode}</div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", margin: "1rem 0" }}>
              <span style={{ color: "#7f5543" }}>OR</span>
            </div>
          </div>
        )}

        {/* New Address Toggle */}
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <button
            type="button"
            onClick={handleNewAddressToggle}
            style={{
              padding: "0.5rem 1rem",
              background: "transparent",
              border: "1px solid #f2c94c",
              color: "#5d4037",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {showNewAddressForm ? "Cancel New Address" : "Add New Address"}
          </button>
        </div>

        {/* Address Form */}
        <form onSubmit={handleSubmit}>
          {showNewAddressForm && (
            <>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
                >
                  Address Name (e.g., Home, Work)
                </label>
                <input
                  type="text"
                  value={addressName}
                  onChange={(e) => setAddressName(e.target.value)}
                  required={showNewAddressForm}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "1rem",
                  }}
                  placeholder="e.g., Home, Office"
                />
              </div>

              <div style={{ textAlign: "right", marginBottom: "1rem" }}>
                <button
                  type="button"
                  onClick={saveNewAddress}
                  disabled={loadingAddress}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#f2c94c",
                    border: "none",
                    color: "#5d4037",
                    borderRadius: "6px",
                    cursor: loadingAddress ? "not-allowed" : "pointer",
                    fontWeight: "500",
                  }}
                >
                  {loadingAddress ? "Saving..." : "Save This Address"}
                </button>
              </div>
            </>
          )}

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
            >
              Delivery Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={4}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
              }}
              placeholder="Enter your complete delivery address"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
            >
              Pincode
            </label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
              }}
              placeholder="Enter your pincode"
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
            >
              Delivery Date
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
              }}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <button
            type="submit"
            disabled={loadingOrder}
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              width: "100%",
              background: loadingOrder ? "#95a5a6" : "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: loadingOrder ? "not-allowed" : "pointer",
              fontWeight: "500",
            }}
          >
            {loadingOrder ? "Placing Order..." : "Confirm Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
