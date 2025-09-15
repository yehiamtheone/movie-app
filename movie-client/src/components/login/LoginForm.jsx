import { useContext, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import moviesApi from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import GlobalAlert from "../alert/AlertBootstrap";
import { useAlert } from "../../alertContext/AlertContext";

const LoginForm = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState('')
  const {showAlert} = useAlert();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    console.log(form);
    try {
      const response = await moviesApi.post("/auth/login", form);
      // console.log(response);

      if (response.status == 200) {
        logIn(response.data);
        navigate("/");
        showAlert("login successful");
        
        
      }
      
    } catch (error) {
      console.log(error.response.data);
      showAlert(JSON.stringify(error.response.data), "danger");
      
      
    }
    
    
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
        {error && <Alert variant="danger">{error}</Alert>}
        {/* {signUpSuccess && <Alert variant="success">Signup successful!</Alert>} */}
        {<GlobalAlert/>}
          <Form onSubmit={handleSubmit} className="text-center">
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label className="w-100 text-center">Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter Your Username"
                value={form.username}
                onChange={handleChange}
                style={{ width: "80%", margin: "0 auto" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label className="w-100 text-center">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={form.password}
                onChange={handleChange}
                style={{ width: "80%", margin: "0 auto" }}
              />
            </Form.Group>
            <Button variant="outline-info" type="submit" className="w-50">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;