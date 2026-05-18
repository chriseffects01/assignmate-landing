"use client";
import AuthLayout from "@/src/components/authentication/AuthCardWrapper";
import Signup from "@/src/components/authentication/Signup";
import "@/src/styles/auth/authPage.css";

export default function AuthSignUpPage() {
  return (
    <AuthLayout>
      <Signup />
    </AuthLayout>
  );
}
