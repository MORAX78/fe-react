import { useEffect, useState } from "react";
import { Container, Table, Card, Button, Modal, Form } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import api from "../utils/api";
import Swal from "sweetalert2";

function RolePage() {
    const [roles, setRoles] = useState([]);
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const fetchRoles = async () => {
        try {
            const res = await api.get("/roles");
            setRoles(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (isEdit) {
            const res = await api.put(`/roles/${currentId}`, { name });
            Swal.fire("Success", "Role updated", "success");
        } else {
            const res = await api.post("/roles", { name });
            Swal.fire("Success", "Role updated", "success");
        }

        setShow(false);
        setName("");
        setIsEdit(false);
        fetchRoles();
    } catch (error) {
        Swal.fire("Error", "Failed", "error");
    }
};

const handleEdit = (role) => {
    setIsEdit(true);
    setCurrentId(role.id);
    setName(role.name);
    setShow(true);
};

const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await api.delete(`/roles/${id}`);
                Swal.fire("Deleted", "Role deleted", "success");
                fetchRoles();
            } catch (error) {
                Swal.fire(
                    "Error",
                    error.response?.data?.message || "Gagal delete",
                    "error"
                );
            }
        }
    });
};

    return (
        <>
            <NavbarComponent />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <div className="d-flex justify-content-between mb-3">
                            <h3>Data Role</h3>
                            <Button onClick={() => {setIsEdit(false); setName(""); setShow(true);}}>Tambah Role</Button>
                        </div>

                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Role Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role, i) => (
                                    <tr key={role.id}>
                                        <td>{i + 1}</td>
                                        <td>{role.name}</td>
                                        <td><Button size="sm" variant="warning" className="me-2"onClick={() => handleEdit(role)}>Edit</Button>
                                        <Button size="sm" variant="danger" onClick={() => handleDelete(role.id)}>Delete</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEdit ? "Edit Role" : "Tambah Role"}</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)}>
                                Close
                            </Button>
                            <Button type="submit">Save</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Container>
        </>
    );
}

export default RolePage;