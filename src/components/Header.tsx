import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

interface Props {}

export const Header = (props: Props) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Apollo test task</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <NavLink to="/">
          <Nav.Link as="div">Home</Nav.Link>
        </NavLink>
        <NavLink to="/books">
          <Nav.Link as="div">Books</Nav.Link>
        </NavLink>
        <NavLink to="/authors">
          <Nav.Link as="div">Authors</Nav.Link>
        </NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
