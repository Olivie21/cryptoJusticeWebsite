import React, { useState } from "react";
import { useSetAtom } from "jotai";
import { checkUser } from "../../lib/createUser";
import { authAtom } from "../../atoms/authAtom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useSetAtom(authAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await checkUser(email, password);
      if (user.length > 0) {
        setAuth(true);
        console.log("User authenticated:", user);
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
