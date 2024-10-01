const db = require("../db");

exports.getAllProducts = (callback) => {
  const SQL = "SELECT * FROM products";
  db.query(SQL, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

exports.createProduct = (product, callback) => {
  const { name, code, description, price } = product;
  const SQL =
    "INSERT INTO products (name, code, description, price) VALUES (?,?,?,?)";
  db.query(SQL, [name, code, description, price], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

exports.updateProduct = (id, product, callback) => {
  const { name, code, description, price } = product;
  const SQL = `UPDATE products SET name=?, code=?, description=?, price=? WHERE id=?`;
  db.query(SQL, [name, code, description, price, id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

exports.deleteProduct = (id, callback) => {
  const SQL = `DELETE FROM products WHERE id = ?`;
  db.query(SQL, [id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};
