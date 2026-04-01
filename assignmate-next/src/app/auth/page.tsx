"use client";
import { useState } from "react";
import "../../styles/authPage.css";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/src/components/shared/LoadingScreen";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleDisplayDashboard() {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1200);
  }

  return (
    <>
      {isLoading && <LoadingScreen message="Preparing your dashboard..." />}
      <section className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome to AssignMate</h1>
            <p>Your assignment studio</p>
          </div>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
              type="button"
            >
              Sign up
            </button>
            <button
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
              type="button"
            >
              Login
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="auth-form">
            {!isLogin && (
              <input
                type="text"
                name="input-form-name"
                placeholder="Full name"
                className="auth-input"
              />
            )}
            <input
              type="email"
              name="input-form-email"
              placeholder="student@gmail.com"
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Password"
              name="input-form-password"
              className="auth-input"
            />
            <button
              type="submit"
              onClick={handleDisplayDashboard}
              className="auth-submit"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="auth-footer-text">
            {isLogin
              ? "Log in, Start right where you stopped!"
              : "Its about to go down!"}
          </p>
        </div>
      </section>
    </>
  );
}
