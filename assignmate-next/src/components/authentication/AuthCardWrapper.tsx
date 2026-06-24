"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/src/components/shared/LoadingScreen";
import { usePathname } from "next/navigation";

import "@/src/styles/auth/authPage.css";

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const loginPath = "/auth/login";
  const signUpPath = "/auth/signup";

  const isLogin = pathname === loginPath;
  const isSignup = pathname === signUpPath;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function toggleAuth(path: string) {
    setIsLoading(true);
    setTimeout(() => {
      router.push(path);
    }, 800);
  }

  return (
    <>
      {isLoading && (
        <LoadingScreen
          message={`Loading ${pathname === loginPath ? "signUp" : "Login"} Screen...`}
        />
      )}
      <section className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome to AssignMate</h1>
            <p>Your assignment studio</p>
          </div>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${isSignup ? "active" : ""}`}
              onClick={(e) => {
                if (isSignup) {
                  e.preventDefault();
                  return;
                }
                toggleAuth(signUpPath);
              }}
              type="button"
            >
              Sign up
            </button>
            <button
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={(e) => {
                if (isLogin) {
                  e.preventDefault();
                  return;
                }
                toggleAuth(loginPath);
              }}
              type="button"
            >
              Login
            </button>
          </div>
          <div>{children}</div>

          <p className="auth-footer-text">
            {isLogin
              ? "Log in, Start right where you stopped!"
              : "Assignments everywhere you go."}
          </p>
        </div>
      </section>
    </>
  );
}

// export function handleDisplayDashboard() {
//   setIsLoading(true);
//   setTimeout(() => {
//     router.push("/dashboard");
//   }, 1200);
// }
