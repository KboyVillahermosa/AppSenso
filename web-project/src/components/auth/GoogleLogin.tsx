import React, { useState, FormEvent } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "../../firebaseConfig";
import "./GoogleLogin.css";
import CreateAccount from './CreateAccount'
interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md shadow-md text-center relative">
        <span
          className="absolute top-2 right-2 cursor-pointer text-xl text-pink-500"
          onClick={onClose}
        >
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

interface GoogleLoginProps {
  onLogin: (user: any) => void;
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const GoogleLogin: React.FC<GoogleLoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Add user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        loginType: "Google",
      });

      onLogin(user);
    } catch (error) {
      setErrorMessage("An error occurred while logging in with Google.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      onLogin(result.user);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage("This account is not registered.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Wrong email or password.");
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
          {isRegistering ? (
            <CreateAccount onRegister={onLogin} />
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <h1 className="mb-5 text-4xl text-pink-500 font-bold justify-center flex">Login</h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                disabled={loading}
                className={`p-2 text-white rounded-md w-full ${
                  loading ? "bg-pink-300 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p
                onClick={() => setIsRegistering(true)}
                className="text-center text-pink-500 cursor-pointer"
              >
                Don't have an account? Register
              </p>
            </form>
          )}
          <div
            className="mt-4 justify-center text-center flex cursor-pointer"
            onClick={handleLogin}
          >
            <img src="/google.png" alt="Google logo" className="w-6 h-6 mr-2" />
            <h1 className="text-pink-500 text-xl">Continue with Google</h1>
          </div>
        </div>
        <div className="login-image shadow-lg bg-pink-100"></div>
      </div>
    </>
  );
};

export default GoogleLogin;
