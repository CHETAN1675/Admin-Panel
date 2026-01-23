import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productServices";

export default function Products() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
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
    setForm({ title: "", price: "", image: "", category: "", description: "" });
    setShow(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
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
      setForm({ title: "", price: "", image: "", category: "", description: "" });
      setEditingId(null);
    } else {
      alert(res.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const res = await deleteProduct(id, token);
    if (res.success) fetchProducts();
    else alert("Failed to delete product");
  };

  //  Delete entire category function
  const deleteCategory = async () => {
    if (categoryFilter === "all") {
      alert("Select a specific category first.");
      return;
    }

    if (!window.confirm(`Delete ALL products in "${categoryFilter}" category?`)) return;

    const selected = products.filter(p => p.category === categoryFilter);

    for (let product of selected) {
      await deleteProduct(product.id, token);
    }

    alert(`All products in "${categoryFilter}" have been deleted.`);
    setCategoryFilter("all");
    fetchProducts();
  };

  // search + category filtering feature 
  const filtered = products.filter(
    (p) =>
      (categoryFilter === "all" || p.category === categoryFilter) &&
      (p.title ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h3>Products</h3>

      <div className="text-center mb-3">
        <Button onClick={openAddModal}>Add Product</Button>
      </div>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {[...new Set(products.map(p => p.category).filter(Boolean))].map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <Button
            variant="danger"
            className="w-100"
            disabled={categoryFilter === "all"}
            onClick={deleteCategory}
          >
            Delete Category
          </Button>
        </Col>
      </Row>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>
                <img
                  src={p.image}
                  width={55}
                  height={55}
                  alt=""
                  style={{ objectFit: "contain" }}
                />
              </td>
              <td>{p.title}</td>
              <td style={{ maxWidth: "280px" }}>
                {p.description?.slice(0, 80)}
                {p.description?.length > 80 ? "..." : ""}
              </td>
              <td>{p.price}</td>
              <td>{p.category}</td>

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

      {/* Modal */}
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

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{editingId ? "Update" : "Save"}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
