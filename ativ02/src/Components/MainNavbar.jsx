import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

export default function MainNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">CRUD02</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                        <NavDropdown title="Professor" id="prof-nav-dropdown">
                            <LinkContainer to="/createProfessor"><NavDropdown.Item>Create Professor</NavDropdown.Item></LinkContainer>
                            <LinkContainer to="/listProfessor"><NavDropdown.Item>List Professor</NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                        <NavDropdown title="Student" id="student-nav-dropdown">
                            <LinkContainer to="/createStudent"><NavDropdown.Item>Create Student</NavDropdown.Item></LinkContainer>
                            <LinkContainer to="/listStudent"><NavDropdown.Item>List Student</NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
