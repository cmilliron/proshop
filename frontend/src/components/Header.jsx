import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser} from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'

import React from 'react'

import logo from "../assets/logo.png"

function Header() {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                {/* <Navbar.Brand href='/'>Proshop</Navbar.Brand> */}
                <LinkContainer to="/">
                <Navbar.Brand>
                    <img src={logo} alt="Proshop" /> Proshop
                </Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer to='/cart'>
                        <Nav.Link className='me-1'>
                            <FaShoppingCart className='me-1'/> Cart
                        </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                        <Nav.Link>
                            <FaUser className='me-1'/> Sign In
                        </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header