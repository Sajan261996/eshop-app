import React from "react";

const Profile = () => {
  // later we can connect with user API
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main Street, New Delhi",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
    </div>
  );
};

export default Profile;
