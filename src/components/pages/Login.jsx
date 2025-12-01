import React from "react";
import { Card, Form, Button } from "react-bootstrap";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
   
    alert("Login function working");
  };

  return (
    <Card className="p-4" style={{ maxWidth: 420 }}>
      <h3 className="mb-3">Admin Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" required />
        </Form.Group>
        <Button type="submit" className="w-100">Login</Button>
      </Form>
    </Card>
  );
}
