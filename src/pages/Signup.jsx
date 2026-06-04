import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log("User created:", userCredential.user);
      alert("Account created successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Create Account</h2>

      <input
        type="email"
        placeholder="test@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="test12345"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;