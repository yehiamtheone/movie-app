import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { Badge, Button, Dropdown, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { jwtDecode } from "jwt-decode";
const Header = () => {
    const { token, logOut, username } = useAuth();
      let firstLetter = null;

    if (username) { // Check if username exists
        firstLetter = username.charAt(0).toUpperCase();
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{ "color": 'gold' }}>
                    <FontAwesomeIcon icon={faVideoSlash} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
                        <NavLink className="nav-link" to="/profile">Profile</NavLink>
                    </Nav>
                    {token ? (
                <Dropdown>
                    <Dropdown.Toggle as="div" id="profile-dropdown" className="profile-dropdown-toggle">
                        <Badge pill
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            {firstLetter}
                        </Badge>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                        <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>
                        <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                        <>
                            <NavLink to="/login">
                                <Button variant="outline-info" className="me-2">Login</Button>
                            </NavLink>
                            <NavLink to="/signup">
                                <Button variant="outline-info" className="me-2">Register</Button>
                            </NavLink>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default Header;