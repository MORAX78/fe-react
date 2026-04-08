import { use, useEffect, useState } from "react";
import { Container, Table, Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import api from "../utils/api";
import Swal from "sweetalert2";

function DashboardPage(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleClose = () => {
        setShow(false);
        setIsEdit(false);
        setFormData({name: "", email: "", password: ""});
        setErrors({});      
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleShow = () => setShow(true);

    
    const fetchUsers = async() => {
        
        try {
            const res = await api.get("/users");
            setUsers(res.data?.data);
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Failed to fetch users", "error");
        }finally{
            setLoading(false);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors({});
        try {
            if (isEdit) {
                const res = await api.put(`/users/${currentId}`, formData);
                Swal.fire("Success!", res.data.message, "success");
                handleClose();
                fetchUsers();
                setFormData({ name: "", email: "", password: "" });
            } else{
                const res = await api.post("/users", formData);
                Swal.fire("Success!", res.data.message, "success");
                handleClose();
                fetchUsers();
                setFormData({ name: "", email: "", password: "" });
            }
        } catch (error) {
            console.log(error);
            if(error.response && error.response.status === 422){
                setErrors(error.response.data?.errors)
            } else {
                Swal.fire("Error", "Failed create new data", "error");
            }
        }
    };

    const [isEdit, setIsEdit] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    

    const handleDelete = (id) => {
        const confirm = Swal.fire({
            title: "Are you sure?",
            text: "Deleted data cannot be recovered!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: "Yes, Delete!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed){
                try {
                    const res = await api.delete(`/users/${id}`);
                    Swal.fire("Deleted", res.data.message, "success");
                    fetchUsers();
                } catch (error) {
                    console.log(error);
                    Swal.fire("Failed!", "Cannot deleted this data", "error");
                }
            }
        });
    };

    const handleEdit = (user) => {
        setIsEdit(true);
        setCurrentId(user.id);
        setFormData({
            name: user.name,
            email: user.email,
            password: ""
        });
        console.log({user, formData})
        
        handleShow();
    };

    useEffect(() => {
        //1. apa yang mau dilakukan
        fetchUsers();
    }, []); //[]: cukup 1 kali perintah fetchUsers atau users dijalankan


    return(
        <>
        <NavbarComponent/>
        <Container>
            <Row>
                <Col md={12}>
                <Card className="shadow-sm border-0 mt-3">
                    <Card.Body>
                        <div className="d-flex justify-content-between mb-3">
                        <h3>Data User</h3>
                        <Button variant="primary" onClick={handleShow}>Create New User</Button>
                        </div>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                    <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(user)}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button></td>
                                </tr>
                                ))
                                ):(
                                    <tr>
                                        <td colSpan={4} className="text-center">Data Empty</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>{isEdit ? "Edit User" : "Create New User"}</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">Name</Form.Label>
                            <Form.Control value={formData?.name} onChange={handleChange} isInvalid={!!errors?.name} type="name" placeholder="Enter your name" name="name"></Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.name?.[0]}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">Email</Form.Label>
                            <Form.Control value={formData?.email} onChange={handleChange} isInvalid={!!errors?.email} type="email" placeholder="Enter your email" name="email"></Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.email?.[0]}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">Password</Form.Label>
                            <Form.Control onChange={handleChange} isInvalid={!!errors?.password} type="password" placeholder="Enter your Password" name="password"></Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.password?.[0]}</Form.Control.Feedback>
                        </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" type="submit">Save Changes</Button>
                        </Modal.Footer>
                        </Form>
                        </Modal>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default DashboardPage;
