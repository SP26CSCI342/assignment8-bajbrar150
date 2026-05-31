import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("User");

    if (!raw) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(raw));
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("User");
    localStorage.removeItem("token");

    toast.success("Logged out");
    navigate("/");
  };

  if (!user) return null;

  return (
    <main className="Profile">
      <h2>Profile</h2>

      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}

export default Profile;