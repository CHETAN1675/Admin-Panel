import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { login, signup, loading } = useAuth();
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    let res;
    if (isLogin) {
      res = await login(email, password);
    } else {
      res = await signup(email, password);
    }

    if (!res.success) {
      setError(res.message || "Authentication failed");
    } else {
      navigate("/admin", { replace: true });
    }
  };

  return (
    <Card className="p-4" style={{ maxWidth: 420, margin: "20px auto" }}>
      <h3 className="mb-3 text-center">
        {isLogin ? "Admin Login" : "Create Admin Account"}
      </h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" required />
        </Form.Group>

        <Button type="submit" className="w-100" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </Button>
      </Form>

      <div className="text-center mt-3">
        {isLogin ? (
          <p style={{ cursor: "pointer" }} onClick={() => setIsLogin(false)}>
            New user? Create an admin account
          </p>
        ) : (
          <p style={{ cursor: "pointer" }} onClick={() => setIsLogin(true)}>
            Already have an account? Login
          </p>
        )}
      </div>
    </Card>
  );
}
