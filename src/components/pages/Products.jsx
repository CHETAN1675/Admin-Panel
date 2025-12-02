import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { getAllProducts, addProduct } from "../../services/productServices";

export default function Products() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ title: "", price: "", image: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const list = await getAllProducts();
    setProducts(list);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await addProduct(form, token);
    if (res.success) {
      setShow(false);
      fetchProducts();
      setForm({ title: "", price: "", image: "" });
    } else {
      alert(res.message);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Products</h3>
        <Button onClick={() => setShow(true)}>Add Product</Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price ($)</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.price}</td>
              <td><img src={p.image} width={60} /></td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Product Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Add Product</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={form.title} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" type="number" value={form.price} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="image" value={form.image} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
