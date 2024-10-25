import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productApiSlice";
// import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

// // import products from "../assets/products";

function HomeScreen() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });
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
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data.maessage || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest and Greatest</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} lx={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  );
}

export default HomeScreen;
