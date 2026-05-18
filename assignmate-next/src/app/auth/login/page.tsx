"use client";
import AuthLayout from "@/src/components/authentication/AuthCardWrapper";
import Login from "@/src/components/authentication/Login";
import "@/src/styles/auth/authPage.css";

export default function AuthSignUpPage() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}
