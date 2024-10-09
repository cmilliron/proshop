import React from "react";
import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../slices/productApiSlice";
// import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

// // import products from "../assets/products";

function HomeScreen() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  //   const [products, setProducts] = useState([]);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const { data } = await axios.get("/api/products");
  //       console.log(data);
  //       setProducts(data);
  //     };
  //     fetchProducts();
  //     console.log(products);
  //   }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error?.data.maessage || error.error}</div>
      ) : (
        <>
          <h1>Latest and Greatest</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} lx={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default HomeScreen;
