import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "../../services/productServices";

export default function Products() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    category: ""
  });

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

  const openAddModal = () => {
    setEditingId(null);
    setForm({ title: "", price: "", image: "", category: "" });
    setShow(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category
    });
    setShow(true);
  };

  const handleSubmit = async () => {
    let res;
    if (editingId) {
      res = await updateProduct(editingId, form, token);
    } else {
      res = await addProduct(form, token);
    }

    if (res.success) {
      setShow(false);
      fetchProducts();
      setForm({ title: "", price: "", image: "", category: "" });
      setEditingId(null);
    } else {
      alert(res.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const res = await deleteProduct(id, token);
    if (res.success) {
      fetchProducts();
    } else {
      alert("Failed to delete product");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Products</h3>
        <Button onClick={openAddModal}>Add Product</Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price ($)</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td><img src={p.image} width={60} alt="" /></td>
              <td className="d-flex gap-2">
                <Button size="sm" variant="primary" onClick={() => openEditModal(p)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={form.title} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={form.price} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Control name="category" value={form.category} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="image" value={form.image} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{editingId ? "Update" : "Save"}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
