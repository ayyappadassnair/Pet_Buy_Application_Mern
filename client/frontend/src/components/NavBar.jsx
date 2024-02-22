import React from 'react';
import { Navbar, Container, Nav, NavDropdown,Badge } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";



function NavBar({cart = []}) {
  const [cookies, setCookie] = useCookies(["access_token"]);
 
  const navigate = useNavigate();

  const logout = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("userID");
    navigate('/signin');
  };

  return (
    <Navbar expand="lg"  style={{ backgroundColor: "white",boxShadow:"-5px 5px 20px black",zIndex:"2",height:"15vh"}}>
      <Container>
        <Navbar.Brand href="#home" style={{ color: "rgb(156,36,36)", fontWeight: "700", fontSize: "33px",fontFamily:"sans-serif" }}>myPets.com</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link style={{ color: "black", fontWeight: "600" }}><NavLink to='/' className={({ isActive }) => `${isActive ? "text-danger" : "text-black"}`} style={{ textDecoration: 'none',fontFamily:"sans-serif",fontSize:"17px" }}>Home<IoHomeSharp style={{marginLeft:"3px",marginBottom:"5px"}} /></NavLink></Nav.Link>
            <Nav.Link style={{ color: "black", fontWeight: "600" }}><NavLink to='/about' className={({ isActive }) => `${isActive ? "text-danger" : "text-black"}`} style={{ textDecoration: 'none',fontFamily:"sans-serif",fontSize:"17px" }}>About</NavLink></Nav.Link>
            <Nav.Link style={{ color: "black", fontWeight: "600" }}><NavLink to='/cart' className={({ isActive }) => `${isActive ? "text-danger" : "text-black"}`} style={{ textDecoration: 'none',fontFamily:"sans-serif",fontSize:"17px" }}>
              MyCart<FaShoppingCart style={{marginLeft:"5px"}}/>{cart.length > 0 && <Badge pill bg="danger">{cart.length}</Badge>}</NavLink></Nav.Link>
            {cookies.access_token ? (
             
             <NavDropdown  title={<span style={{ color: "black", fontWeight: "600",fontFamily:"sans-serif",fontSize:"17px" }}>Hey, {cookies.user_name}👋🏻</span>} id="basic-nav-dropdown" style={{ color: "white" ,fontWeight: "600" }}>
             <NavDropdown.Item as={Link} to="/profile" style={{ textDecoration: 'none', color: 'white', backgroundColor:"black" }}>profile</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/myorders" style={{ textDecoration: 'none', color: 'white', backgroundColor:"black" }}>my orders</NavDropdown.Item>
                <NavDropdown.Item onClick={logout} style={{ textDecoration: 'none', color: 'white',backgroundColor:"black" }}>logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link><Link style={{ textDecoration: "none", color:"black", fontWeight: "700",fontFamily:"sans-serif",fontSize:"17px" }} to='/signin'>Login</Link></Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
