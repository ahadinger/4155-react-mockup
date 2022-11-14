import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import StopSearch from './components/StopSearch';
function Header({stopState}) {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">UNC Charlotte | Bus Force</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
            </Nav>
            <StopSearch className="me-2" stopState={stopState}/>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default Header;