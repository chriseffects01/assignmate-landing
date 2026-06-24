"use clent";
import "@/src/styles/auth/authPage.css";
import { useState } from "react";
import { authService } from "@/src/services/auth.load.services";
import { useRouter } from "next/navigation";
import LoadingScreen from "../shared/LoadingScreen";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.login({
        username,
        email,
        password,
      });

      // setTimeout(() => {
      //   setIsLoading(true);
      //   router.replace("/dashboard");
      // }, 1200);

      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));
      // console.log(data);
      router.replace("/dashboard");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <LoadingScreen message="Loading Your dashboard..." />}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="input-form-username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
          className="auth-input"
        />

        <input
          type="email"
          name="input-form-email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="student@gmail.com"
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="input-form-password"
          className="auth-input"
        />

        <button type="submit" className="auth-submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </>
  );
}
