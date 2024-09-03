import "./products.css";
const Products = () => {
  return (
    <div className="container-products">
      <h1>Produtos</h1>

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
          <tr>
            <td>nome</td>
            <td>codigo</td>
            <td>descrição</td>
            <td>preço</td>
            <td>
              <button>Editar</button>
              <button className="button-delete">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <form>
        <input type="text" name="nome" placeholder="Nome"></input>
        <input type="text" name="codigo" placeholder="Código"></input>
        <textarea name="descricao" placeholder="Descrição"></textarea>
        <input type="number" name="preco" placeholder="Preço"></input>
        <button type="submit">Adicionar produto</button>
      </form>
    </div>
  );
};

export default Products;
