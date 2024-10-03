import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

import products from '../assets/products'

function HomeScreen() {
  return (
    <>
      <h1>Latest and Greatest</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} lx={3}>
            <Product product={product} />
          </Col>  
        ))}
      </Row>
    /</>
  )
}

export default HomeScreen