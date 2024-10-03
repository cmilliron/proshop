import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser} from 'react-icons/fa'

import React from 'react'

import logo from "../assets/logo.png"

function Header() {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                {/* <Navbar.Brand href='/'>Proshop</Navbar.Brand> */}
                <Navbar.Brand>
                    <img src={logo} alt="Proshop" /> Proshop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <Nav.Link className='me-1' href='/cart'>
                            <FaShoppingCart className='me-1'/> Cart
                        </Nav.Link>
                        <Nav.Link href='/login'>
                            <FaUser className='me-1'/> Sign In
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header