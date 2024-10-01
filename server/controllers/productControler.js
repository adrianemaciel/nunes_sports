const ProductModel = require("../models/productModel");

exports.listProducts = (req, res) => {
  ProductModel.getAllProducts((err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(products);
  });
};

exports.createProduct = (req, res) => {
  const product = req.body;
  ProductModel.createProduct(product, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Produto cadastrado com sucesso." });
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (
    !product.name ||
    !product.code ||
    !product.description ||
    !product.price
  ) {
    return res
      .status(400)
      .json({ message: "Todos os campos devem ser preenchidos!" });
  }

  ProductModel.updateProduct(id, product, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Produto atualizado com sucesso." });
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  ProductModel.deleteProduct(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Produto excluído com sucesso." });
  });
};
