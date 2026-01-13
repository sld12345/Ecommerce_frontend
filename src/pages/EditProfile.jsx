import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    addresses: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem('customer'));
    if (!storedCustomer) {
      navigate('/');
    } else {
      fetchCustomerProfile(storedCustomer.email);
    }
  }, [navigate]);

  const fetchCustomerProfile = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/${encodeURIComponent(email)}`
      );
      setCustomer(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch customer details.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, e) => {
    const updatedAddresses = [...customer.addresses];
    updatedAddresses[index][e.target.name] = e.target.value;
    setCustomer({ ...customer, addresses: updatedAddresses });
  };

  const handleAddAddress = () => {
    // Prevent adding multiple empty addresses
    const hasEmpty = customer.addresses.some(
      (addr) => addr.name === '' && addr.address === '' && addr.pincode === ''
    );
    if (hasEmpty) {
      alert('⚠️ You already have a new empty address being edited.');
      return;
    }

    setCustomer({
      ...customer,
      addresses: [...customer.addresses, { name: '', address: '', pincode: '' }],
    });
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = customer.addresses.filter((_, i) => i !== index);
    setCustomer({ ...customer, addresses: updatedAddresses });
  };

  const handleSave = async () => {
    // Check for duplicate addresses before saving
    const seen = new Set();
    for (let addr of customer.addresses) {
      const key = `${addr.name.trim().toLowerCase()}-${addr.address.trim().toLowerCase()}-${addr.pincode.trim()}`;
      if (seen.has(key)) {
        alert('⚠️ Duplicate addresses found. Please remove duplicates before saving.');
        return;
      }
      seen.add(key);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/${encodeURIComponent(customer.email)}`,
        customer
      );
      localStorage.setItem('customer', JSON.stringify(customer));
      navigate('/profile');
    } catch (err) {
      console.error('Failed to update profile.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        <h2>Edit Profile</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email (cannot edit)</label>
          <input type="email" value={customer.email} disabled />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
          />
        </div>

        <h3>Addresses</h3>
        <div className="addresses">
          {customer.addresses.map((address, index) => (
            <div key={index} className="address-edit-card">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={address.name}
                onChange={(e) => handleAddressChange(index, e)}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={address.address}
                onChange={(e) => handleAddressChange(index, e)}
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => handleAddressChange(index, e)}
              />
              <button
                className="delete-button"
                onClick={() => handleDeleteAddress(index)}
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>

        <button className="add-address-btn" onClick={handleAddAddress}>
          ➕ Add Address
        </button>

        <div className="actions">
          <button className="save-button" onClick={handleSave}>
            💾 Save Changes
          </button>
          <button className="cancel-button" onClick={() => navigate('/profile')}>
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
