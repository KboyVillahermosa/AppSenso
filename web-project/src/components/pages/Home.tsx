// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <img
        src={user.photoURL || "/vite.svg"}
        alt="User Avatar"
        className="h-32 w-32 rounded-full"
      />

      <h1 className="mt-4 text-2xl font-semibold">{user.displayName}</h1>
      <p className="text-gray-500">{user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-4 rounded bg-red-500 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
