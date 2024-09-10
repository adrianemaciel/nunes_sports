const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2");
const cors = require("cors");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Developermain",
  database: "nunes_sports",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: "OK" });
});

app.get("/products", (req, res) => {
  connection.query(
    "SELECT * FROM nunes_sports.products",
    function (err, results) {
      console.log(results);
      return res.json(results);
    }
  );
});

app.post("/register", (req, res) => {
  const { name, code, description, price } = req.body;

  let SQL =
    "INSERT INTO products (name, code, description, price) VALUES (?,?,?,?)";

  connection.query(SQL, [name, code, description, price], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send({
        message: "Produto cadastrado com sucesso",
        productId: result.insertId,
      });
    }
  });
});

app.get("/getCards", (req, res) => {
  let SQL = "SELECT * FROM nunes_sports.products";

  connection.query(SQL, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Erro ao consultar o banco de dados" });
    } else {
      res.status(200).send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na endereço http://localhost:${port}`);
});
