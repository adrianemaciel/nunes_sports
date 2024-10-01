import { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, product = {}, onConfirm, type }) => {
  const [editTableProduct, setEditTableProduct] = useState({
    name: "",
    code: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTableProduct({ ...editTableProduct, [name]: value });
  };

  const handleConfirmChange = () => {
    onConfirm(editTableProduct);
  };

  const initializeEditTableProduct = (product) => {
    return {
      name: product?.name || "",
      code: product?.code || "",
      description: product?.description || "",
      price: product?.price || "",
    };
  };

  useEffect(() => {
    if (product) {
      const initializeProduct = initializeEditTableProduct(product);
      setEditTableProduct(initializeProduct);
    }
  }, [product]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{type === "edit" ? "Editar Produto" : "Excluir Produto"}</h2>
        {type === "edit" ? (
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              value={editTableProduct.name}
              onChange={handleInputChange}
            />

            <label htmlFor="code">Código:</label>
            <input
              type="text"
              id="code"
              name="code"
              autoComplete="off"
              value={editTableProduct.code}
              onChange={handleInputChange}
            />

            <label htmlFor="description">Descrição:</label>
            <input
              type="text"
              id="description"
              name="description"
              autoComplete="off"
              value={editTableProduct.description}
              onChange={handleInputChange}
            />

            <label htmlFor="price">Preço:</label>
            <input
              type="number"
              id="price"
              name="price"
              autoComplete="off"
              value={editTableProduct.price}
              onChange={handleInputChange}
            />

            <div className="modal-buttons-container">
              <button
                className="modal-button-save"
                onClick={handleConfirmChange}
              >
                Salvar
              </button>
              <button className="modal-button-cancel" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>Tem certeza que deseja deletar o produto "{product.name}"?</p>
            <div className="modal-buttons-container">
              <button
                className="modal-button-delete"
                onClick={() => onConfirm(product.id)}
              >
                Deletar
              </button>
              <button className="modal-button-cancel" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
