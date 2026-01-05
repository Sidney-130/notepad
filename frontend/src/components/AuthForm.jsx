import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";

export default function AuthForm() {
  const { login: authLogin } = useAuth();
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const signupMutation = useMutation({
    mutationFn: ({ email, password }) => signup({ email, password }),
    onSuccess: () => {
      alert("Signup successful! Now you can log in");
      setSignupEmail("");
      setSignupPassword("");
    },
    onError: (err) => alert(err.message),
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      authLogin(data.token);
      alert("Successfuul Logged In");
      setLoginEmail("");
      setLoginPassword("");
    },
    onError: (err) => alert(err.message),
  });
  return (
    <div>
      <h1>Auth</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupMutation.mutate({ email: signupEmail, password: signupPassword });
        }}
      >
        <h2>Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />
        <button type="submit">SignUp</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginMutation.mutate({ email: loginEmail, password: loginPassword });
        }}
      >
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
