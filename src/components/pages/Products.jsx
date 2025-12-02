import { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import { getAllProducts } from "../../services/productServices";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    const res = await getAllProducts();

    if (res.error) {
      setError("Failed to fetch products");
    } else {
      setProducts(res);
    }

    setLoading(false);
  };

  return (
    <>
      <h3 className="mb-3">Products</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped borderless hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Preview</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={p.image}
                      alt={p.name}
                      width={45}
                      height={45}
                      style={{ objectFit: "cover", borderRadius: 4 }}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
}
