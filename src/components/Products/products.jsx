import { useState, useEffect } from "react";
import axios from "axios";
import "./products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    code: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", newProduct)
      .then((res) => {
        setProducts([...products, res.data]);
        fetchProducts();
        setNewProduct({
          id: "",
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
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
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

        <button type="submit" onClick={handleSubmit}>
          Adicionar produto
        </button>
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
                <td>
                  <button>Editar</button>
                  <button className="button-delete">Deletar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
