import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Login() {

  const { login, loading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
   setError("")
   const email = e.target.email.value;
   const password = e.target.password.value;

   const res = await login(email,password);
    if (!res.success) {
      setError(res.message || "Login failed");
    } else {
     
      navigate("/admin", { replace: true });
    }
  };

  return (
    <Card className="p-4" style={{ maxWidth: 420, margin: "20px auto" }}>
      <h3 className="mb-3 text-center">Admin Login</h3>
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
        <Button type="submit" className="w-100" disabled={loading}>{loading?"Logging in...":"Login"}</Button>
      </Form>
    </Card>
  );
}
