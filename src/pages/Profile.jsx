import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      setError('Failed to fetch customer details.');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Your Profile</h2>
        <div className="profile-details">
          <div className="profile-item">
            <span className="label">Name:</span> {customer.name || 'N/A'}
          </div>
          <div className="profile-item">
            <span className="label">Email:</span> {customer.email || 'N/A'}
          </div>
          <div className="profile-item">
            <span className="label">Phone:</span> {customer.phone || 'N/A'}
          </div>

          <div className="profile-item">
            <span className="label">Addresses:</span>
            <div className="addresses">
              {customer.addresses && customer.addresses.length > 0 ? (
                customer.addresses.map((address, index) => (
                  <div key={index} className="address-card">
                    <p><strong>{address.name}</strong></p>
                    <p>{address.address}</p>
                    <p>Pin: {address.pincode}</p>
                  </div>
                ))
              ) : (
                <p>No addresses added</p>
              )}
            </div>
          </div>
        </div>
        <button
          className="edit-button"
          onClick={() => navigate('/edit-profile')}
        >
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
