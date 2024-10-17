import { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/styles/products.css";
import Modal from "./modal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    code: "",
    description: "",
    price: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://nunes-sports-backend.vercel.app/api/products", newProduct)
      .then((res) => {
        fetchProducts();
        setNewProduct({
          name: "",
          code: "",
          description: "",
          price: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const fetchProducts = () => {
    axios
      .get("https://nunes-sports-backend.vercel.app/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const handleConfirmEdit = (id, product) => {
    axios
      .put(
        `https://nunes-sports-backend.vercel.app/api/products/${id}`,
        product
      )
      .then((res) => {
        fetchProducts();
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleConfirmDelete = (id) => {
    axios
      .delete(`https://nunes-sports-backend.vercel.app/api/products/${id}`)
      .then(() => {
        fetchProducts();
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="content">
      <h1>Produtos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nome do produto"
          autoComplete="name"
          value={newProduct.name}
          onChange={handleInputChange}
        />

        <label htmlFor="code">Código:</label>
        <input
          type="text"
          id="code"
          name="code"
          placeholder="Código do produto"
          autoComplete="off"
          value={newProduct.code}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Descrição do produto"
          autoComplete="off"
          value={newProduct.description}
          onChange={handleInputChange}
        ></textarea>

        <label htmlFor="price">Preço:</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Preço do produto"
          autoComplete="off"
          value={newProduct.price}
          onChange={handleInputChange}
        />

        <button type="submit">Adicionar produto</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Código</th>
            <th>Descrição</th>
            <th>Preço</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.code}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td className="action-buttons">
                  <button onClick={() => handleEdit(product)}>Editar</button>
                  <button
                    className="button-delete"
                    onClick={() => handleDelete(product)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        type={modalType}
        onConfirm={(updatedProduct) =>
          modalType === "edit"
            ? handleConfirmEdit(selectedProduct.id, updatedProduct)
            : handleConfirmDelete(selectedProduct.id)
        }
      />
    </div>
  );
};

export default Products;
