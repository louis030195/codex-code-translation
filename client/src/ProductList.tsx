import React, { FC, FormEvent, useState } from "react";
import { Product } from "./pb/products_pb";

interface Props {
  products: Product[];
  onCreateProduct: (name: string) => void;
  onDeleteProduct: (id: string) => void;
  error: string;
}

export const ProductList: FC<Props> = ({
  products,
  onCreateProduct,
  onDeleteProduct,
  error,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onCreateProduct(name);
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="column">
            <input
              type="text"
              placeholder="product name"
              value={name}
              className={error ? "error" : ""}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="column">
            <button type="submit" style={{ marginRight: "10px" }}>
              Add product
            </button>
            <span className="error">{error}</span>
          </div>
        </div>
      </form>

      {products.length ? (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>created</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.getId()}>
                <td>{p.getId().substr(0, 4)}</td>
                <td>{p.getName()}</td>
                <td>{p.getCreateTime()?.toDate().toLocaleTimeString()}</td>
                <td>
                  <button
                    onClick={() => onDeleteProduct(p.getId())}
                    className="button button-clear"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4>No products found</h4>
      )}
    </div>
  );
};
