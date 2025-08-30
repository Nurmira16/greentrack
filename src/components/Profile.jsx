import React from "react";
import { useAuth } from "../context/AuthProvider";
import supabase from "../supabaseClient";
import "../styles/profile.scss";
import logo from '../assets/greentrack logo.png';

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Please log in</p>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const formattedDate = new Date(user.created_at).toLocaleDateString("en-GB"); // DD/MM/YYYY

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={logo} alt="avatar" className="avatar" />
        <h2 className="username">{user.email.split("@")[0]}</h2>
        <p className="email">{user.email}</p>
        <p className="created">Joined: {formattedDate}</p>

        {/* Optional: Fun badge or activity */}
        <div className="badges">
          <span className="badge">🌱 GreenTracker Member</span>
          <span className="badge">🏆 First Login</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
