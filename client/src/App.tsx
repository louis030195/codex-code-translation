import { Error, Metadata, StatusCode } from "grpc-web";
import React, { useCallback, useEffect, useState } from "react";
import { AuditLog } from "./AuditLog";
import { Auth, loadCurrentUser } from "./Auth";
import {
  CreateProductRequest,
  DeleteProductRequest,
  ListProductsRequest,
  Product,
} from "./pb/products_pb";
import { ProductServiceClient } from "./pb/ProductsServiceClientPb";
import { ProductList } from "./ProductList";

const scheme = process.env.REACT_APP_BACKEND_SCHEME || 'http';
const client = new ProductServiceClient(`${scheme}://localhost:9999`);

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productError, setProductError] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    (async () => {
      let res = await client.listProducts(new ListProductsRequest(), {});
      setProducts(res.getProductsList());
    })();
  }, []);

  const parseError = useCallback((e: Error) => {
    switch (e.code) {
      case StatusCode.UNAUTHENTICATED:
        setAuthError(e.message);
        break;
      case StatusCode.INVALID_ARGUMENT:
        setProductError(e.message);
        break;
      default:
        console.log("unknown error");
    }
  }, []);

  const makeMetadata = useCallback((): Metadata => {
    // TODO: maybe move to Context or set in callback
    let currentUser = loadCurrentUser();

    return currentUser ? { "custom-header-1": currentUser } : {};
  }, []);

  const createProduct = async (name: string) => {
    setProductError("");

    const product = new Product();
    product.setName(name);

    const req = new CreateProductRequest();
    req.setProduct(product);

    try {
      await client.createProduct(req, makeMetadata());
    } catch (e) {
      parseError(e);
    }
  };

  const deleteProduct = async (id: string) => {
    let req = new DeleteProductRequest();
    req.setId(id);

    try {
      await client.deleteProduct(req, makeMetadata());
    } catch (e) {
      parseError(e);
    }
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.getId() !== id));
  };

  return (
    <div className="container">
      <Auth authError={authError} clearError={() => setAuthError("")} />

      <div className="row">
        <div className="column column-60">
          <h3>Inventory</h3>
          <ProductList
            error={productError}
            products={products}
            onCreateProduct={createProduct}
            onDeleteProduct={deleteProduct}
          />
        </div>

        <div
          className="column column-30 column-offset-10"
          style={{ borderLeft: "solid 1px #ddd", paddingLeft: "20px" }}
        >
          <h4>Activity</h4>
          <AuditLog
            onProductCreated={addProduct}
            onProductDeleted={removeProduct}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
