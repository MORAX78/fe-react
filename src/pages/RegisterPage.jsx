import {useState} from "react";
import {Form, Button} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import AuthCard from "../components/AuthCard";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleRegister = async(e) => {
        e.preventDefault();
        setErrors([]);

        try {
            const res = await axios.post('http://localhost:8000/api/register', formData);
            const successMsg = res.data.message;
        Swal.fire({
            icon: "success",
            title: "Success Registration",
            text: successMsg,
            timer: 2000,
            showConfirmButton: false
        });
        navigate("/login");
        } catch (error) {
            if(error.response && error.response.status === 422){
                setErrors(error.response.data?.errors);
            }else{
                const errorMsg = error.response?.data?.message || "Internal server error";
            Swal.fire({
            icon: "error",
            title: "Error Registration",
            text: errorMsg,
            timer: 2000,
        });
            }
        }
    };
    return(
        <AuthCard title="Register Form">
            <Form onSubmit={handleRegister}>
    <Form.Group className="mb-3">
        <Form.Label className="form-label">Name</Form.Label>
        <Form.Control isInvalid={!!errors?.name} type="name" placeholder="Enter your name" onChange={handleChange} name="name"></Form.Control>
        <Form.Control.Feedback type="invalid">{errors.name?.[0]}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label className="form-label">Email</Form.Label>
        <Form.Control isInvalid={!!errors?.email} type="email" placeholder="Enter your email" onChange={handleChange} name="email"></Form.Control>
        <Form.Control.Feedback type="invalid">{errors.email?.[0]}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label className="form-label">Password</Form.Label>
        <Form.Control isInvalid={!!errors?.password} type="password" placeholder="Enter your Password" onChange={handleChange} name="password"></Form.Control>
        <Form.Control.Feedback type="invalid">{errors.password?.[0]}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label className="form-label">Confirm Password</Form.Label>
        <Form.Control isInvalid={!!errors?.password_confirmation} type="password" placeholder="Enter your confirm password" onChange={handleChange} name="password_confirmation"></Form.Control>
        <Form.Control.Feedback type="invalid">{errors.password_confirmation?.[0]}</Form.Control.Feedback>
    </Form.Group>
    <Button variant="primary" className="w-100" type="submit">Register</Button>
    <div className="text-center">
            <small>
                Already have an account ? Back to <Link to="/login">Login</Link>
            </small>
        </div>
        </Form>
    </AuthCard>
    );
}
export default RegisterPage;