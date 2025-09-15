import  { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import moviesApi from '../../api/axiosConfig';
import GlobalAlert from '../alert/AlertBootstrap';
import { useAlert } from '../../alertContext/AlertContext';
const SignupForm = ({setSignUpSuccess}) => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('');
    setSignUpSuccess(false);
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    // Simulate successful signup
    const {confirmPassword, ...formDto}  = form;
    console.log(formDto);
    try {
        const response = await moviesApi.post('/auth/signup', formDto);
        console.log(response.status);
        if (response.status !== 201) {
            showAlert(`Couldnt log in Error Code ${response.status}`, "danger");
            // setError(`Couldnt log in Error Code ${response.status}`);
            return;
        }
    } catch (error) {
        console.log(error);

        // setError(JSON.stringify(error.response.data));
        return;
    }
        
    setForm({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
    navigate('/login');
    showAlert("Signup successful!");
    // setSignUpSuccess(true);    
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4">Sign Up</h2>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          {<GlobalAlert/>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupForm;